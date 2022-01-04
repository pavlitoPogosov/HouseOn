import React from 'react';
import ContentLoader from 'react-content-loader';

import s from './SubmitBtn.module.scss';

export interface SubmitBtnSkeletonProps {}

export const SubmitBtnSkeleton: React.FC<SubmitBtnSkeletonProps> = () => {
  return (
    <ContentLoader
      speed={2}
      width={112}
      height={32}
      viewBox="0 0 112 32"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={s.SubmitBtn__skeleton}>
      <rect x="0" y="0" rx="4" ry="4" width="112" height="32" />
    </ContentLoader>
  );
};
