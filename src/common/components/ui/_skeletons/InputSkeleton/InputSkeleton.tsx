import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

type OwnProps = {
  containerClassName?: string;
  disableLabel?: boolean;
};

export type InputSkeletonProps = OwnProps & IContentLoaderProps;

export const InputSkeleton: React.FC<InputSkeletonProps> = ({ containerClassName, disableLabel, ...otherProps }) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={disableLabel ? 34 : 48}
      viewBox={`0 0 100 ${disableLabel ? '30' : '48'}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={containerClassName}
      preserveAspectRatio="none"
      {...otherProps}>
      {!disableLabel && <rect x="0" y="0" rx="4" ry="4" width="92" height="14" />}
      <rect x="0" y={disableLabel ? '0' : '18'} rx="4" ry="4" width="300" height="30" />
    </ContentLoader>
  );
};
