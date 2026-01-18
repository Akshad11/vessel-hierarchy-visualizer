import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TREE_CONFIG } from '../constants';

interface Transform {
  x: number;
  y: number;
  scale: number;
}

export const useZoomPan = () => {
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: TREE_CONFIG.initialZoom });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Zoom logic
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(transform.scale * (1 + scaleAmount), TREE_CONFIG.minZoom), TREE_CONFIG.maxZoom);

    setTransform(prev => ({
      ...prev,
      scale: newScale
    }));
  }, [transform.scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;

    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    setTransform(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  // Global mouse up
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const zoomIn = () => setTransform(p => ({ ...p, scale: Math.min(p.scale * 1.2, TREE_CONFIG.maxZoom) }));
  const zoomOut = () => setTransform(p => ({ ...p, scale: Math.max(p.scale / 1.2, TREE_CONFIG.minZoom) }));
  const resetZoom = () => setTransform({ x: 50, y: 300, scale: 1 });

  // Custom setter for external control
  const setPosition = (x: number, y: number, scale: number) => setTransform({ x, y, scale });

  return {
    transform,
    containerRef,
    handlers: {
      onWheel: handleWheel,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    },
    controls: {
      zoomIn,
      zoomOut,
      resetZoom,
      setPosition
    }
  };
};