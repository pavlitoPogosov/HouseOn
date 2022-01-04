import React from 'react';
import ContentLoader from 'react-content-loader';

import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';

import { ReactComponent as InfoIcon } from './icons/info.svg';

import s from './EmptyStatus.module.scss';

export interface EmptyStatusProps {
  isLoading?: boolean;
  onClick: () => void;
}

export const EmptyStatus: React.FC<EmptyStatusProps> = ({ isLoading, onClick }) => {
  if (isLoading) {
    return (
      <ContentLoader
        speed={2}
        width="100%"
        height={40}
        viewBox={`0 0 100 40`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        preserveAspectRatio="none">
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="40" />
      </ContentLoader>
    );
  }

  return (
    <div onClick={onClick} className={s.EmptyStatus__container}>
      <div className={s.EmptyStatus__text}>
        <CommentIcon />
        Add a house status
      </div>

      <InfoIcon className={s.EmptyStatus__infoIcon} />
    </div>
  );
};
