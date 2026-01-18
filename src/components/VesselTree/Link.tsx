import React from 'react';
import * as d3 from 'd3';
import type { TreeLayoutLink } from '../../types';
import { NODE_WIDTH_PX } from '../../constants';

interface LinkProps {
  link: TreeLayoutLink;
}

const Link: React.FC<LinkProps> = ({ link }) => {
  // Offset start and end points to connect to the edges of the node cards.
  const halfWidth = NODE_WIDTH_PX / 2;

  // Source (Parent): Start at parent's right edge
  const sourcePoint = {
    x: link.source.x,
    y: link.source.y + halfWidth
  };

  // Target (Child): End at child's left edge
  const targetPoint = {
    x: link.target.x,
    y: link.target.y - halfWidth
  };

  const linkGenerator = d3.linkHorizontal<any, any>()
    .x(d => d.y)
    .y(d => d.x);

  const pathData = linkGenerator({ source: sourcePoint, target: targetPoint });

  return (
    <path
      d={pathData || ''}
      fill="none"
      stroke="#94a3b8"
      strokeWidth="1.5"
      strokeOpacity="0.5"
      className="transition-all duration-300 ease-in-out"
    />
  );
};

export default React.memo(Link);
