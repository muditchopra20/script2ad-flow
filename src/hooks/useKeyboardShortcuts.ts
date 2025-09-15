import { useEffect } from 'react';

interface KeyboardShortcuts {
  onSelectAll?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onSpace?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isCtrlOrCmd = ctrlKey || metaKey;

      // Prevent shortcuts when typing in inputs
      const activeElement = document.activeElement;
      const isTyping = activeElement?.tagName === 'INPUT' || 
                      activeElement?.tagName === 'TEXTAREA' || 
                      (activeElement as HTMLElement)?.contentEditable === 'true';

      if (isTyping && !isCtrlOrCmd) return;

      switch (key) {
        case 'a':
        case 'A':
          if (isCtrlOrCmd) {
            event.preventDefault();
            shortcuts.onSelectAll?.();
          }
          break;
        
        case 'Delete':
        case 'Backspace':
          if (!isTyping) {
            event.preventDefault();
            shortcuts.onDelete?.();
          }
          break;
        
        case 'd':
        case 'D':
          if (isCtrlOrCmd) {
            event.preventDefault();
            shortcuts.onDuplicate?.();
          }
          break;
        
        case 'z':
        case 'Z':
          if (isCtrlOrCmd) {
            event.preventDefault();
            if (shiftKey) {
              shortcuts.onRedo?.();
            } else {
              shortcuts.onUndo?.();
            }
          }
          break;
        
        case '=':
        case '+':
          if (isCtrlOrCmd) {
            event.preventDefault();
            shortcuts.onZoomIn?.();
          }
          break;
        
        case '-':
        case '_':
          if (isCtrlOrCmd) {
            event.preventDefault();
            shortcuts.onZoomOut?.();
          }
          break;
        
        case 'Escape':
          shortcuts.onEscape?.();
          break;
        
        case 'ArrowLeft':
          if (!isTyping) {
            event.preventDefault();
            shortcuts.onArrowLeft?.();
          }
          break;
        
        case 'ArrowRight':
          if (!isTyping) {
            event.preventDefault();
            shortcuts.onArrowRight?.();
          }
          break;
        
        case ' ':
          if (!isTyping) {
            event.preventDefault();
            shortcuts.onSpace?.();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};