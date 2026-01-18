import React, { useState } from 'react';
import type { TreeLayoutNode } from '../../types';
import { Plus, Minus } from 'lucide-react';
import { DRAFT_OPACITY, NODE_STYLES, NODE_WIDTH_PX } from '../../constants';

interface TreeNodeProps {
  node: TreeLayoutNode;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onDropNode: (draggedId: string, targetId: string) => void;
  isExpanded: boolean;
  isSelected: boolean;
  hasChildren: boolean;
  isMatch: boolean;
  variant: 'filled' | 'light';
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onToggle,
  onSelect,
  onDropNode,
  isExpanded,
  isSelected,
  hasChildren,
  isMatch,
  variant
}) => {
  const { data, x, y } = node;
  const baseStyle = NODE_STYLES[data.type];
  const [isDragOver, setIsDragOver] = useState(false);

  // NOTE: Swapping x and y for horizontal layout.
  const transform = `translate(${y}px, ${x}px)`;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(data.id);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(data.id);
  };

  // --- Drag & Drop Handlers ---

  const handleDragStart = (e: React.DragEvent) => {
    // Set the ID of the dragged node
    e.dataTransfer.setData('nodeId', data.id);
    e.dataTransfer.effectAllowed = 'move';

    // Optional: Add a class or style to the drag ghost if needed
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (_e: React.DragEvent) => {
    // Basic check to ensure we are actually leaving the node container
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop bubbling
    setIsDragOver(false);

    const draggedId = e.dataTransfer.getData('nodeId');
    if (draggedId && draggedId !== data.id) {
      onDropNode(draggedId, data.id);
    }
  };

  // Stop propagation on MouseDown to prevent the Canvas Pan handler from taking over
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Determine styles based on variant
  let bgClass, textClass, borderClass, iconBgClass, iconColorClass;

  if (variant === 'filled') {
    bgClass = baseStyle.bg;
    textClass = baseStyle.text;
    borderClass = baseStyle.border;
    iconBgClass = baseStyle.iconBg;
    iconColorClass = baseStyle.iconColor;
  } else {
    // Light/Pastel variant logic - handling inactive states for new colors
    switch (data.type) {
      case 'system':
        // Inactive Blue
        bgClass = 'bg-[#5583F7] opacity-50';
        textClass = 'text-white';
        borderClass = 'border-[#5583F7]';
        iconBgClass = 'bg-white';
        iconColorClass = 'text-black';
        break;
      case 'equipment_type':
        // Inactive Red
        bgClass = 'bg-[#EA5050] opacity-50';
        textClass = 'text-white';
        borderClass = 'border-[#EA5050]';
        iconBgClass = 'bg-white';
        iconColorClass = 'text-red-800';
        break;
      case 'equipment':

        // Inactive Purple
        bgClass = 'bg-[#003366] opacity-50';
        textClass = 'text-white';
        borderClass = 'border-[#003366]';
        iconBgClass = 'bg-white';
        iconColorClass = 'text-black';
        break;
      case 'assembly':
        // Inactive Black (Dark Grey) - using neutral-300 to ensure it doesn't look white
        bgClass = 'bg-[#929090] opacity-50';
        textClass = 'text-white';
        borderClass = 'border-[#929090]';
        iconBgClass = 'bg-white';
        iconColorClass = 'text-black';
        break;
      case 'component':
        // Inactive Green
        bgClass = 'bg-[#34882D] opacity-50';
        textClass = 'text-white';
        borderClass = 'border-[#34882D]';
        iconBgClass = 'bg-white';
        iconColorClass = 'text-black';
        break;
    }
  }

  // Add highlight for drag over
  const dragOverClass = isDragOver ? 'ring-4 ring-yellow-400 ring-offset-2 z-30 scale-105' : '';

  return (
    <div
      className="absolute top-0 left-0 transition-transform duration-300 ease-in-out origin-center"
      style={{ transform }}
    >
      <div
        draggable={true} // Enable Dragging
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown} // Block Zoom/Pan on node click
        onClick={handleSelect}
        className={`
          relative flex items-center justify-between pl-4 pr-2 py-2.5 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200
          ${bgClass} ${textClass} border ${borderClass}
          ${data.isDraft ? DRAFT_OPACITY : ''}
          ${isSelected ? 'shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)] z-20 scale-105 ring-1 ring-black/20' : 'shadow-sm hover:shadow-md hover:scale-102'}
          ${isMatch ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
          ${dragOverClass}
        `}
        style={{
          width: `${NODE_WIDTH_PX}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Label Content */}
        <div className="flex flex-col overflow-hidden mr-2 flex-grow text-left pointer-events-none">
          <span className={`text-sm font-semibold truncate leading-snug ${variant === 'filled' ? 'drop-shadow-md' : ''}`}>
            {data.name}
          </span>
          {data.isDraft && (
            <span className="text-[10px] uppercase opacity-80 font-medium tracking-wide">
              Draft
            </span>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <div className="flex-shrink-0 w-5 h-5" onMouseDown={(e) => e.stopPropagation()}>
          {hasChildren && (
            <button
              onClick={handleToggle}
              className={`
                flex items-center justify-center w-5 h-5 rounded-full
                ${iconBgClass} ${iconColorClass}
                hover:scale-110 transition-all focus:outline-none cursor-pointer
              `}
            >
              {isExpanded ? (
                <Minus size={12} strokeWidth={3} />
              ) : (
                <Plus size={12} strokeWidth={3} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TreeNode);