import React from 'react';
import ContentLoader from 'react-content-loader';

export interface TextAreaSkeletonProps {
  containerClassName?: string;
}

export const TextAreaSkeleton: React.FC<TextAreaSkeletonProps> = ({ containerClassName }) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={98}
      viewBox="0 0 100 98"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={containerClassName}
      preserveAspectRatio="none">
      <rect x="0" y="0" rx="4" ry="4" width="92" height="14" />
      <rect x="0" y="18" rx="4" ry="4" width="300" height="80" />
    </ContentLoader>
  );
};
