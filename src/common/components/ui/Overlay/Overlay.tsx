import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import clsx from 'clsx';

import { useDisableOverflow } from 'common/hooks/useDisableOverflow';

import s from './Overlay.module.scss';

export interface OverlayProps {
  isOpen: boolean;

  contentClassName?: string;
  childrenWrapperClassName?: string;
  childrenStyles?: React.CSSProperties;
  disableEscClose?: boolean;
  sameLevelCmp?: JSX.Element;
  disableOverflowControl?: boolean;
  blackoutClassName?: string;
  disableClose?: boolean;

  onClose: () => void;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

export const MODAL_OVERLAY_CHILDREN_ID = 'modal-overlay-children';

export const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  contentClassName,
  children,
  disableEscClose,
  sameLevelCmp,
  childrenStyles,
  childrenWrapperClassName,
  disableOverflowControl,
  blackoutClassName,
  disableClose,
  onClose,
  onScroll
}) => {
  useDisableOverflow(isOpen, disableOverflowControl);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscClose && !disableClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [isOpen, disableEscClose, disableClose, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={clsx(s.Overlay__blackout, blackoutClassName)} />

      <div onMouseDown={!disableClose ? onClose : undefined} className={clsx(s.Overlay__content, contentClassName)}>
        <div
          className={clsx(s.Overlay__childrenWrapper, childrenWrapperClassName)}
          onMouseDown={(e) => e.stopPropagation()}
          style={childrenStyles}
          id={MODAL_OVERLAY_CHILDREN_ID}
          onScroll={onScroll}>
          {children}
        </div>
      </div>

      {sameLevelCmp}
    </>,
    document.body
  );
};
