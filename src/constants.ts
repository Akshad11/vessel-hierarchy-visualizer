import type { NodeType } from './types';

export const NODE_WIDTH_PX = 240;

// Visual configuration for the tree layout
export const TREE_CONFIG = {
  nodeWidth: 320,  // Horizontal space per node level
  nodeHeight: 90,  // Vertical space between nodes (Increased for better separation)
  initialZoom: 0.8,
  minZoom: 0.1,
  maxZoom: 2,
};

// Color mappings for node types matching the design requirements:
// equipment_type -> Blue
// equipment -> Red
// assembly -> Black
// component -> Green
export const NODE_STYLES: Record<NodeType, { bg: string; text: string; border: string; iconBg: string; iconColor: string }> = {
  system: {
    // Blue
    bg: 'bg-[#5583F7]',
    text: 'text-white',
    border: 'border-[#5583F7]',
    iconBg: 'bg-white',
    iconColor: 'text-black'
  },
  equipment_type: {
    // Red
    bg: 'bg-[#EA5050]',
    text: 'text-white',
    border: 'border-[#EA5050]',
    iconBg: 'bg-white',
    iconColor: 'text-black'
  },
  equipment: {
    // Purple
    bg: 'bg-[#003366]',
    text: 'text-white',
    border: 'border-[#003366]',
    iconBg: 'bg-white',
    iconColor: 'text-black'
  },
  assembly: {
    // Black
    bg: 'bg-[#929090]',
    text: 'text-white',
    border: 'border-[#929090]',
    iconBg: 'bg-white',
    iconColor: 'text-black'
  },
  component: {
    // Green
    bg: 'bg-[#34882D]',
    text: 'text-white',
    border: 'border-[#34882D]',
    iconBg: 'bg-white',
    iconColor: 'text-black'
  },
};

export const DRAFT_OPACITY = 'opacity-70';
