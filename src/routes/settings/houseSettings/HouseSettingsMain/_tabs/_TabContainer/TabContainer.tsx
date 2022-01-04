import React from 'react';

import { Spinner } from 'common/components/ui/Spinner/Spinner';

import s from './TabContainer.module.scss';

export interface TabContainerProps {
  isLoading?: boolean;
}

export const TabContainer: React.FC<TabContainerProps> = ({ children, isLoading }) => {
  return (
    <div className={s.TabContainer__container}>
      {isLoading ? (
        <Spinner size="xl" color="text-brand" className={s.TabContainer__spinner} strokeWidth={5.5} />
      ) : (
        children
      )}
    </div>
  );
};
