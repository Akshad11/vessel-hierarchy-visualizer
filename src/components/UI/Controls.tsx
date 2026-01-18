import React from 'react';
import { Search, Plus, Minus, Maximize, X, Layers, List, Database } from 'lucide-react';

interface ControlsProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  isAccordionMode: boolean;
  onToggleAccordion: () => void;
  datasetOptions: { label: string; value: string }[];
  currentDataset: string;
  onDatasetChange: (value: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  searchQuery,
  onSearchChange,
  onZoomIn,
  onZoomOut,
  onReset,
  isAccordionMode,
  onToggleAccordion,
  datasetOptions,
  currentDataset,
  onDatasetChange
}) => {
  return (
    <>
      {/* Top Left: Search & View Mode */}
      <div className="absolute top-20 left-6 z-20 flex flex-col space-y-3">
        {/* Search */}
        <div className="w-80">
          <div className="relative group shadow-lg rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-3 border-0 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all font-medium text-slate-700"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                  <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center">
            <button
                onClick={onToggleAccordion}
                className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all
                    ${isAccordionMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }
                `}
            >
                {isAccordionMode ? (
                    <>
                        <Layers size={16} />
                        <span>Accordion Mode</span>
                    </>
                ) : (
                    <>
                        <List size={16} />
                        <span>Multi-View Mode</span>
                    </>
                )}
            </button>
        </div>
      </div>

      {/* Top Right: Dataset Selector */}
      <div className="absolute top-20 right-6 z-20">
        <div className="relative inline-block text-left shadow-lg rounded-lg bg-white">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Database size={16} className="text-slate-400" />
            </div>
            <select
              value={currentDataset}
              onChange={(e) => onDatasetChange(e.target.value)}
              className="block w-64 pl-10 pr-10 py-3 border-0 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {datasetOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
        </div>
      </div>

      {/* Zoom Controls - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
        <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-1 flex items-center space-x-1">
          <button onClick={onZoomOut} className="p-2 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-700 transition-colors" title="Zoom Out">
            <Minus size={20} />
          </button>
          <button onClick={onReset} className="p-2 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-700 transition-colors border-l border-r border-slate-100" title="Reset View">
            <Maximize size={18} />
          </button>
          <button onClick={onZoomIn} className="p-2 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-700 transition-colors" title="Zoom In">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Controls;