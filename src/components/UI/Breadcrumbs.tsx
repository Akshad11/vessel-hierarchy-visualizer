import React from 'react';
import type { BreadcrumbItem } from '../../types';
import { ChevronRight, Anchor } from 'lucide-react';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (id: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  if (items.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 px-6 py-3 z-20 shadow-sm flex items-center space-x-2 overflow-x-auto">
      <div className="flex-shrink-0 text-slate-400 mr-2">
        <Anchor size={18} />
      </div>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`
                whitespace-nowrap text-sm font-medium transition-colors
                ${isLast ? 'text-slate-900 pointer-events-none' : 'text-slate-500 hover:text-blue-600 hover:underline'}
              `}
            >
              {item.name}
            </button>
            {!isLast && <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
