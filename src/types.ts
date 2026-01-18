export type NodeType = 'system' | 'equipment_type' | 'equipment' | 'assembly' | 'component';

export interface TreeNodeData {
  id: string;
  name: string;
  type: NodeType;
  isDraft?: boolean;
  children?: TreeNodeData[];
}

export interface TreeLayoutNode {
  data: TreeNodeData;
  x: number;
  y: number;
  depth: number;
  height: number;
  parent: TreeLayoutNode | null;
  children?: TreeLayoutNode[];
}

export interface TreeLayoutLink {
  source: TreeLayoutNode;
  target: TreeLayoutNode;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  type: NodeType;
}

export interface TreeContextState {
  expandedIds: Set<string>;
  toggleNode: (id: string, forceState?: boolean) => void;
  expandPathToNode: (nodeId: string) => void;
  collapseAll: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  breadcrumbs: BreadcrumbItem[];
}
