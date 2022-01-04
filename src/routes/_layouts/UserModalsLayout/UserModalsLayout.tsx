import React from 'react';

import { ErrorBoundary } from 'common/components/utils/ErrorBoundary';

import { ModalManager } from './ModalManager/ModalManager';

export const UserModalsLayout: React.FC<{}> = ({ children }) => (
  <ErrorBoundary>
    <ModalManager>{children}</ModalManager>
  </ErrorBoundary>
);
