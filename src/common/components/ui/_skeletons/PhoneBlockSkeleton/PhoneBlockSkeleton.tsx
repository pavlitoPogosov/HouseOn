import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

import clsx from 'clsx';

import s from './PhoneBlockSkeleton.module.scss';

type OwnProps = {
  containerClassName?: string;
};

export type ReactPhoneSkeletonProps = OwnProps & IContentLoaderProps;

export const ReactPhoneSkeleton: React.FC<ReactPhoneSkeletonProps> = ({ containerClassName, ...otherProps }) => {
  return (
    <div className={clsx(s.ReactPhoneSkeleton__container, containerClassName)}>
      <ContentLoader
        speed={2}
        width="100%"
        height={38}
        viewBox={`0 0 100 38`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className={containerClassName}
        preserveAspectRatio="none"
        {...otherProps}>
        <rect x="0" y="0" rx="0" ry="0" width="192" height="18" />
        <rect x="0" y="22" rx="0" ry="0" width="142" height="14" />
      </ContentLoader>

      <ContentLoader
        speed={2}
        width={36}
        height={36}
        viewBox="0 0 36 36"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ marginLeft: 12 }}
        className={s.ReactPhoneSkeleton__circle}>
        <circle cx="18" cy="18" r="18" />
      </ContentLoader>
    </div>
  );
};
