import React from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { HouseStatusType } from 'graphql/types';

import { EmptyStatus } from './EmptyStatus/EmptyStatus';
import { StatusCard } from './StatusCard/StatusCard';
import { StatusInput, StatusInputSaveValues } from './StatusInput/StatusInput';
import { StatusScroll } from './StatusScroll/StatusScroll';

import s from './HomeStatus.module.scss';

export interface HomeStatusProps {
  className?: string;
  isEdit?: boolean;
  isErrorStatusInput?: boolean;
  isInitiallyLoading?: boolean;
  isLoadingStatusInput?: boolean;
  onRemoveStatus: () => void;
  onStatusChange: (values: StatusInputSaveValues) => void;
  onStatusIndexChange: (direction: number) => void;
  queryOverflowScroll?: string;
  setIsEdit: (isEdit: boolean) => void;
  setShownStatusIndex: React.Dispatch<React.SetStateAction<number>>;
  shownStatusIndex: number;
  statusInputToggler: ReturnType<typeof useToggle>;
  statuses: Pick<HouseStatusType, 'text' | 'title'>[];
}

export const HomeStatus: React.FC<HomeStatusProps> = ({
  className,
  isEdit,
  isErrorStatusInput,
  isInitiallyLoading,
  isLoadingStatusInput,
  onRemoveStatus,
  onStatusChange,
  onStatusIndexChange,
  queryOverflowScroll = '(max-width: 768px)',
  setIsEdit,
  setShownStatusIndex,
  shownStatusIndex,
  statusInputToggler,
  statuses
}) => {
  const isStatusScrollShown = useMediaQuery(queryOverflowScroll);
  const currentStatus = statuses[shownStatusIndex] ?? statuses[0];

  const handleStatusEdit = () => {
    setIsEdit(true);
    statusInputToggler.set();
  };

  const handleStatusDiscard = () => {
    statusInputToggler.unset();
    setIsEdit(false);
  };

  const renderContent = () => {
    if (statusInputToggler.value) {
      return (
        <div className={clsx(s.HomeStatus__usualContainer, className)}>
          <StatusInput
            initialText={isEdit ? currentStatus.text : undefined}
            isError={isErrorStatusInput}
            isLoading={isLoadingStatusInput}
            onDiscard={handleStatusDiscard}
            onSave={onStatusChange}
          />
        </div>
      );
    }

    if (!statuses.length || isInitiallyLoading) {
      return (
        <div className={clsx(s.HomeStatus__usualContainer, className)}>
          <EmptyStatus isLoading={isInitiallyLoading} onClick={statusInputToggler.set} />
        </div>
      );
    }

    if (isStatusScrollShown) {
      return (
        <div className={clsx(s.HomeStatus__scrollContainer, className)}>
          <StatusScroll
            onAddNew={statusInputToggler.set}
            onEdit={handleStatusEdit}
            onRemove={onRemoveStatus}
            setShownStatusIndex={setShownStatusIndex}
            statuses={statuses}
          />
        </div>
      );
    }

    return (
      <div className={clsx(s.HomeStatus__usualContainer, className)}>
        <StatusCard
          onAddNew={statusInputToggler.set}
          onEdit={handleStatusEdit}
          onRemove={onRemoveStatus}
          onStatusIndexChange={onStatusIndexChange}
          status={currentStatus}
          statusIndex={shownStatusIndex}
          totalStatuses={statuses.length}
        />
      </div>
    );
  };

  return renderContent();
};
