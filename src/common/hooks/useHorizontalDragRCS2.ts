import React, { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

let isDown = false;
let startX: number;
let scrollLeft: number;

const mouseDownListener = (node: HTMLDivElement, e: MouseEvent) => {
  isDown = true;
  node.classList.add('active');
  startX = e.pageX - node.offsetLeft;
  scrollLeft = node.scrollLeft;
};

const mouseLeaveListener = (node: HTMLDivElement) => {
  isDown = false;
  node.classList.remove('active');
};

const mouseUpListener = (node: HTMLDivElement) => {
  isDown = false;
  node.classList.remove('active');
};

const mouseMoveListener = (node: HTMLDivElement, e: MouseEvent) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - node.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  node.scrollLeft = scrollLeft - walk;
};

export const addDragListeners = (node: HTMLDivElement) => {
  node.addEventListener('mousedown', (e) => mouseDownListener(node, e));
  node.addEventListener('mouseleave', () => mouseLeaveListener(node));
  node.addEventListener('mouseup', () => mouseUpListener(node));
  node.addEventListener('mousemove', (e) => mouseMoveListener(node, e));
};

export const removeDragListeners = (node: HTMLDivElement) => {
  node.removeEventListener('mousedown', (e) => mouseDownListener(node, e));
  node.removeEventListener('mouseleave', () => mouseLeaveListener(node));
  node.removeEventListener('mouseup', () => mouseUpListener(node));
  node.removeEventListener('mousemove', (e) => mouseMoveListener(node, e));
};

export const useHorizontalDragRCS2 = (ref: React.RefObject<Scrollbars>) => {
  useEffect(() => {
    const node = ref?.current?.container?.children?.[0] as HTMLDivElement;
    if (node) {
      addDragListeners(node);
    }

    return () => {
      if (node) {
        removeDragListeners(node);
      }
    };
  }, [ref]);
};
