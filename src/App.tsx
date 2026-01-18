import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { datasets, datasetOptions } from './data/mockData';
import { computeTreeLayout, buildNodeMap, findMatches, getBreadcrumbs, moveNodeInTree } from './utils/treeUtils';
import { useZoomPan } from './hooks/useZoomPan';
import Link from './components/VesselTree/Link';
import TreeNode from './components/VesselTree/TreeNode';
import Breadcrumbs from './components/UI/Breadcrumbs';
import Controls from './components/UI/Controls';
import type { TreeNodeData } from './types';

function App() {
  // --- State ---
  const [currentDatasetKey, setCurrentDatasetKey] = useState<string>('complex');

  // We strictly manage tree data in local state to allow mutations (Drag & Drop)
  // Initialize with the complex dataset
  const [treeData, setTreeData] = useState<TreeNodeData>(datasets['complex']);

  // Initialize expand set with the ID of the current root.
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([datasets['complex'].id]));
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccordionMode, setIsAccordionMode] = useState(true); // Default to Accordion mode
  const initializedRef = useRef(false);

  // --- Hooks ---
  const { transform, containerRef, handlers, controls } = useZoomPan();

  // --- Derived Data ---

  // 1. Flatten map for O(1) lookups - Depends on treeData now
  const nodeMap = useMemo(() => buildNodeMap(treeData), [treeData]);

  // 2. Handle Search Logic
  const { matches, pathsToMatches } = useMemo(() =>
    findMatches(treeData, searchQuery),
    [treeData, searchQuery]);

  // 3. Determine actually expanded nodes
  const visibleExpandedIds = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return pathsToMatches;
    }
    return expandedIds;
  }, [searchQuery, pathsToMatches, expandedIds]);

  // 4. Compute Layout & Min X (Vertical Top)
  const { nodes, links, minX } = useMemo(() => {
    const layout = computeTreeLayout(
      treeData,
      visibleExpandedIds,
      searchQuery ? matches : null
    );

    // Calculate min X to align top
    let min = Infinity;
    if (layout.nodes.length > 0) {
      layout.nodes.forEach(n => {
        if (n.x < min) min = n.x;
      });
    } else {
      min = 0;
    }

    return { ...layout, minX: min };
  }, [treeData, visibleExpandedIds, searchQuery, matches]);

  // 5. Breadcrumbs
  const breadcrumbs = useMemo(() => {
    return selectedNodeId ? getBreadcrumbs(nodeMap, selectedNodeId) : [];
  }, [selectedNodeId, nodeMap]);

  // 6. Focused Path Logic
  const focusedNodeIds = useMemo(() => {
    if (!selectedNodeId) return null;
    const ids = new Set<string>();
    let curr: string | null = selectedNodeId;
    while (curr) {
      ids.add(curr);
      const node = nodeMap.get(curr);
      curr = node?.parentId || null;
    }
    return ids;
  }, [selectedNodeId, nodeMap]);

  // --- Effects ---

  // Handle Dataset Change: Reset view and state
  const handleDatasetChange = (key: string) => {
    const newData = datasets[key];
    setCurrentDatasetKey(key);
    setTreeData(newData); // Reset tree structure
    setExpandedIds(new Set([newData.id]));
    setSelectedNodeId(null);
    setSearchQuery('');

    // Reset zoom to top
    const initialScale = 1;
    controls.setPosition(80, 120, initialScale);
  };

  // Initial Alignment: Position the tree so the top-most node is visible near the top
  useEffect(() => {
    // Only run if we have nodes and haven't fully initialized the view for *this* load
    // Note: We might want to re-run this logic if dataset changes, handled by handleDatasetChange manual reset.
    // This effect ensures the very first load or subsequent reliable updates catch layout readiness.
    if (!initializedRef.current && nodes.length > 0 && minX !== Infinity) {
      const initialScale = 1;
      const targetY = 120 - (minX * initialScale);
      controls.setPosition(80, targetY, initialScale);
      initializedRef.current = true;
    }
  }, [nodes, minX, controls]);

  // --- Handlers ---

  const handleToggleNode = useCallback((id: string) => {
    if (searchQuery) return;

    setExpandedIds(prev => {
      const next = new Set(prev);
      const isExpanding = !next.has(id);

      if (isExpanding) {
        // Accordion Logic: If expanding, collapse siblings
        if (isAccordionMode) {
          const node = nodeMap.get(id);
          if (node && node.parentId) {
            const parent = nodeMap.get(node.parentId);
            if (parent && parent.children) {
              parent.children.forEach(child => {
                if (child.id !== id) {
                  next.delete(child.id);
                }
              });
            }
          }
        }
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, [searchQuery, isAccordionMode, nodeMap]);

  const handleSelectNode = useCallback((id: string) => {
    setSelectedNodeId(id);
  }, []);

  const handleBreadcrumbNavigate = (id: string) => {
    setSelectedNodeId(id);
  };

  // Drag and Drop Handler
  const handleDropNode = useCallback((draggedId: string, targetId: string) => {
    // Perform the move logic
    setTreeData(prevData => {
      const newData = moveNodeInTree(prevData, draggedId, targetId);
      return newData;
    });

    // Ensure target is expanded so we can see what we dropped
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.add(targetId);
      return next;
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* UI Overlays */}
      <Breadcrumbs items={breadcrumbs} onNavigate={handleBreadcrumbNavigate} />
      <Controls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onZoomIn={controls.zoomIn}
        onZoomOut={controls.zoomOut}
        onReset={() => {
          const targetY = 120 - (minX * 1);
          controls.setPosition(80, targetY, 1);
        }}
        isAccordionMode={isAccordionMode}
        onToggleAccordion={() => setIsAccordionMode(p => !p)}
        datasetOptions={datasetOptions}
        currentDataset={currentDatasetKey}
        onDatasetChange={handleDatasetChange}
      />

      {/* Main Canvas */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full cursor-grab active:cursor-grabbing"
        {...handlers}
      >
        <div
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            width: '100%',
            height: '100%',
          }}
          className="relative transition-transform duration-75 will-change-transform"
        >
          <svg className="absolute top-0 left-0 overflow-visible" style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
            {links.map((link) => {
              return (
                <Link
                  key={`${link.source.data.id}-${link.target.data.id}`}
                  link={link}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const isFocused = focusedNodeIds ? focusedNodeIds.has(node.data.id) : true;
            // If something is selected, and this node is NOT focused, it is 'light'.
            // If nothing is selected, everything is 'filled'.
            // If focused, it is 'filled'.
            const variant = (selectedNodeId && !isFocused) ? 'light' : 'filled';

            return (
              <TreeNode
                key={node.data.id}
                node={node}
                isExpanded={visibleExpandedIds.has(node.data.id)}
                isSelected={selectedNodeId === node.data.id}
                hasChildren={!!node.data.children && node.data.children.length > 0}
                isMatch={matches.has(node.data.id)}
                onToggle={handleToggleNode}
                onSelect={handleSelectNode}
                onDropNode={handleDropNode}
                variant={variant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;