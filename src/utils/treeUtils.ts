import * as d3 from 'd3';
import type { TreeNodeData, TreeLayoutNode, BreadcrumbItem } from '../types';
import { TREE_CONFIG } from '../constants';

// --- Hierarchy & Layout ---

/**
 * Transforms the raw data into a D3 hierarchy and computes the layout.
 * It respects the `expandedIds` set to determine which children are visible.
 * 
 * Uses a custom "Waterfall" layout where a parent aligns vertically with its first child,
 * mimicking a folder structure or the specific design requested.
 */
export const computeTreeLayout = (
  rootData: TreeNodeData,
  expandedIds: Set<string>,
  filteredIds: Set<string> | null // If present, we are in search mode
): { root: d3.HierarchyNode<TreeNodeData>; nodes: TreeLayoutNode[]; links: d3.HierarchyPointLink<TreeNodeData>[] } => {

  // 1. Create Hierarchy
  // We use standard d3.hierarchy to handle the data structure and filtering
  const hierarchy = d3.hierarchy(rootData, (d) => {
    // Search Mode Logic
    if (filteredIds) {
      if (expandedIds.has(d.id)) {
        return d.children;
      }
      return null;
    }

    // Normal Mode Logic
    if (expandedIds.has(d.id)) {
      return d.children;
    }
    return null;
  });

  // 2. Custom Waterfall Layout Algorithm
  // We traverse the tree and assign x, y coordinates manually.
  // x = vertical position (row), y = horizontal position (depth/column).

  let currentX = 0;
  const nodeHeight = TREE_CONFIG.nodeHeight;
  const nodeWidth = TREE_CONFIG.nodeWidth;

  // We define a recursive traverse function to assign coordinates
  const layoutNode = (node: any) => {
    // Horizontal position based on depth
    node.y = node.depth * nodeWidth;

    // Vertical position:
    // Every node starts at the current global vertical cursor (currentX).
    node.x = currentX;

    if (node.children && node.children.length > 0) {
      // If node has children, the First Child will also start at currentX (Top Alignment).
      // We traverse children.
      node.children.forEach((child: any) => {
        layoutNode(child);
      });
      // Note: We do NOT increment currentX for the parent itself, 
      // because the vertical space is consumed by the children (specifically the leaves of the subtree).
    } else {
      // Leaf Node (or collapsed node)
      // This node consumes one "row" of vertical space.
      // We increment the global cursor for the NEXT node.
      currentX += nodeHeight;
    }
  };

  // Run the layout
  layoutNode(hierarchy);

  // 3. Extract nodes and links
  const nodes = hierarchy.descendants() as unknown as TreeLayoutNode[];
  const links = hierarchy.links() as unknown as d3.HierarchyPointLink<TreeNodeData>[];

  return { root: hierarchy, nodes, links };
};

// --- Search & Path Finding ---

/**
 * Flatten the tree to a map for easy lookup
 */
export const buildNodeMap = (root: TreeNodeData): Map<string, TreeNodeData & { parentId: string | null }> => {
  const map = new Map<string, TreeNodeData & { parentId: string | null }>();

  const traverse = (node: TreeNodeData, parentId: string | null) => {
    map.set(node.id, { ...node, parentId });
    if (node.children) {
      node.children.forEach(child => traverse(child, node.id));
    }
  };

  traverse(root, null);
  return map;
};

/**
 * Search logic: Returns a Set of IDs that match the query, AND their parents (to ensure visibility).
 */
export const findMatches = (root: TreeNodeData, query: string): { matches: Set<string>; pathsToMatches: Set<string> } => {
  const normalizedQuery = query.toLowerCase().trim();
  const matches = new Set<string>();
  const pathsToMatches = new Set<string>();

  if (!normalizedQuery) return { matches, pathsToMatches };

  const traverse = (node: TreeNodeData, path: string[]): boolean => {
    const isMatch = node.name.toLowerCase().includes(normalizedQuery);
    let childMatched = false;

    if (node.children) {
      for (const child of node.children) {
        const childResult = traverse(child, [...path, node.id]);
        if (childResult) childMatched = true;
      }
    }

    if (isMatch || childMatched) {
      if (isMatch) matches.add(node.id);
      // Add this node and all ancestors to pathsToMatches to ensure they are expanded
      pathsToMatches.add(node.id);
      path.forEach(pId => pathsToMatches.add(pId));
      return true;
    }

    return false;
  };

  traverse(root, []);
  return { matches, pathsToMatches };
};

/**
 * Generate breadcrumbs for a given node ID
 */
export const getBreadcrumbs = (nodeMap: Map<string, TreeNodeData & { parentId: string | null }>, targetId: string): BreadcrumbItem[] => {
  const crumbs: BreadcrumbItem[] = [];
  let currentId: string | null = targetId;

  while (currentId) {
    const node = nodeMap.get(currentId);
    if (node) {
      crumbs.unshift({ id: node.id, name: node.name, type: node.type });
      currentId = node.parentId;
    } else {
      currentId = null;
    }
  }
  return crumbs;
};

// --- Drag and Drop Logic ---

/**
 * Recursive check to see if targetId is a descendant of node
 */
export const isDescendant = (node: TreeNodeData, targetId: string): boolean => {
  if (!node.children) return false;
  for (const child of node.children) {
    if (child.id === targetId) return true;
    if (isDescendant(child, targetId)) return true;
  }
  return false;
};

/**
 * Moves a node from its current position to be a child of targetId.
 * Returns a new tree object (immutable update).
 */
export const moveNodeInTree = (root: TreeNodeData, draggedId: string, targetId: string): TreeNodeData => {
  // 1. Deep clone to treat data immutably
  const newRoot = JSON.parse(JSON.stringify(root));

  // Constraints
  if (draggedId === newRoot.id) return root; // Cannot move root
  if (draggedId === targetId) return root; // Cannot move to self

  // Helper to find node in the new tree
  const findNode = (n: TreeNodeData, id: string): TreeNodeData | null => {
    if (n.id === id) return n;
    if (n.children) {
      for (const c of n.children) {
        const res = findNode(c, id);
        if (res) return res;
      }
    }
    return null;
  };

  const draggedNodeInstance = findNode(newRoot, draggedId);
  if (!draggedNodeInstance) return root; // Error: Dragged node not found

  // Cycle Check: Cannot drop a parent into its own child
  if (isDescendant(draggedNodeInstance, targetId)) {
    console.warn('Cannot drop a node into its own descendant.');
    return root;
  }

  // 2. Remove draggedNode from its old parent
  let draggedNodeData: TreeNodeData | null = null;

  const removeFromParent = (parent: TreeNodeData): boolean => {
    if (!parent.children) return false;

    const idx = parent.children.findIndex(c => c.id === draggedId);
    if (idx !== -1) {
      draggedNodeData = parent.children[idx];
      parent.children.splice(idx, 1);
      return true;
    }

    for (const child of parent.children) {
      if (removeFromParent(child)) return true;
    }
    return false;
  };

  if (!removeFromParent(newRoot)) return root; // Failed to remove

  // 3. Add to target
  const targetNode = findNode(newRoot, targetId);
  if (targetNode && draggedNodeData) {
    if (!targetNode.children) targetNode.children = [];
    targetNode.children.push(draggedNodeData);
  }

  return newRoot;
};