import React, { useState } from 'react';

export interface UseToggleableProps {
  isInitialOpen?: boolean;
}

const initialStyles = {
  overflow: 'hidden',
  // scss token
  transition: 'max-height 0.2s ease-out'
};

export const useToggleable = (props?: UseToggleableProps) => {
  const [isOpen, setIsOpen] = useState(!!props?.isInitialOpen);
  const [styles, setStyles] = useState<React.CSSProperties>(initialStyles);

  const onToggle = () => setIsOpen((prev) => !prev);

  const refCallback = (node: HTMLDivElement | null) => {
    if (node) {
      if (isOpen) {
        node.style.maxHeight = (node.scrollHeight || 0) + 'px';
      } else {
        node.style.maxHeight = '0px';
        setStyles(initialStyles);
      }
    }
  };

  return {
    isOpen,
    styles,
    onToggle,
    refCallback,
    setStyles,
    setIsOpen
  };
};
