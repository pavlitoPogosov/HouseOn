import React from 'react';
import ContentLoader from 'react-content-loader';

export interface UsualMapSkeletonProps {
  containerClassName?: string;
}

export const UsualMapSkeleton: React.FC<UsualMapSkeletonProps> = ({ containerClassName }) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={containerClassName}
      preserveAspectRatio="none">
      <rect x="0" y="0" rx="12" ry="12" width="100%" height="100%" />
    </ContentLoader>
  );
};
