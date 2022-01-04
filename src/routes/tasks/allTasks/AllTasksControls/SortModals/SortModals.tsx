import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { isNull } from 'lodash';

import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Button } from 'common/components/ui/Button/Button';
import { Checkbox } from 'common/components/ui/Checkbox/Checkbox';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { AMPLUA_SELECT_OPTIONS, CREATED_BY_SELECT_OPTIONS, SHOW_SELECT_OPTIONS } from '../../sortPopupsData';

import s from './SortModals.module.scss';

export interface SortModalsProps {
  isOpen: boolean;

  handleShowChange: () => void;
  handleHouseTeamChange: () => void;
  handleCreatedByChange: () => void;
  onClose: () => void;
}

enum SortModalsFilters {
  SHOW = 0,
  HOUSE_TEAM = 1,
  CREATE_BY = 2
}

export const SortModals: React.FC<SortModalsProps> = ({
  isOpen,
  handleShowChange,
  handleHouseTeamChange,
  handleCreatedByChange,
  onClose
}) => {
  const [activeFilter, setActiveFilter] = useState<null | SortModalsFilters>(null);

  const intl = useIntl();

  const handleFilterChange = (newFilter: null | SortModalsFilters) => {
    return () => setActiveFilter(newFilter);
  };

  const handleCheckboxChange = () => {
    onClose();
  };

  const renderSortModalsChoice = () => (
    <>
      <div className={s.SortModals__sortOption}>
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'tasks.modal.sort.states.title',
            defaultMessage: 'States'
          })}
        />
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          color="textSecondary"
          className={s.SortModals__chooseText}
          onClick={handleFilterChange(SortModalsFilters.SHOW)}>
          {intl.formatMessage({
            id: 'tasks.modal.sort.states.value',
            defaultMessage: 'All'
          })}
          <ChevronRightIcon />
        </Text>
      </div>

      <div className={s.SortModals__sortOption}>
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'tasks.modal.sort.houseTeam.title',
            defaultMessage: 'HouseTeam'
          })}
        />
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          color="textSecondary"
          className={s.SortModals__chooseText}
          onClick={handleFilterChange(SortModalsFilters.HOUSE_TEAM)}>
          {intl.formatMessage({
            id: 'tasks.modal.sort.houseTeam.value',
            defaultMessage: 'No matter'
          })}
          <ChevronRightIcon />
        </Text>
      </div>

      <div className={s.SortModals__sortOption}>
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'tasks.modal.sort.createdBy.title',
            defaultMessage: 'Created by'
          })}
        />
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          color="textSecondary"
          className={s.SortModals__chooseText}
          onClick={handleFilterChange(SortModalsFilters.CREATE_BY)}>
          {intl.formatMessage({
            id: 'tasks.modal.sort.createBy.value',
            defaultMessage: 'No matter'
          })}
          <ChevronRightIcon />
        </Text>
      </div>
    </>
  );

  const renderSortModalPopups = (filter: SortModalsFilters) => {
    const optionsToMap =
      filter === SortModalsFilters.HOUSE_TEAM
        ? AMPLUA_SELECT_OPTIONS
        : filter === SortModalsFilters.SHOW
        ? SHOW_SELECT_OPTIONS
        : CREATED_BY_SELECT_OPTIONS;

    return (
      <>
        {optionsToMap.map((opt, i) => (
          <div key={i} className={s.SortModals__sortOption}>
            <Checkbox
              text={opt.text}
              containerClassName={s.SortModals__cbxContainer}
              textClassName={s.SortModals__cbxText}
              onChange={handleCheckboxChange}
              checked={i === 0}
            />
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveFilter(null);
    }
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} animation="bottom" containerClassName={s.SortModals__container}>
      <div className={s.SortModals__header}>
        <Text
          text={intl.formatMessage({
            id: 'tasks.modal.sort.filters',
            defaultMessage: 'Filters'
          })}
          variant={TextPropsVariantsEnum.H3}
          as="div"
        />

        <IconCircle
          shadow="l"
          icon={<CloseIcon className={s.SortModals__closeIcon} />}
          width={32}
          height={32}
          onClick={onClose}
        />
      </div>

      <div className={s.SortModals__content}>
        {isNull(activeFilter) ? renderSortModalsChoice() : renderSortModalPopups(activeFilter)}
      </div>

      <div className={s.SortModals__footer}>
        <Button
          onClick={isNull(activeFilter) ? onClose : handleFilterChange(null)}
          color="orange"
          variant="secondary"
          leftIcon={
            isNull(activeFilter) ? (
              <CloseIcon className={s.SortModals__closeIcon} />
            ) : (
              <ChevronLeft className={s.SortModals__chevronIcon} />
            )
          }>
          {isNull(activeFilter)
            ? intl.formatMessage({ id: 'app.button.clear', defaultMessage: 'Clear' })
            : intl.formatMessage({ id: 'app.button.back', defaultMessage: 'Back' })}
        </Button>

        <Button
          onClick={onClose}
          color="orange"
          leftIcon={!isNull(activeFilter) ? <CheckIcon className={s.SortModals__checkIcon} /> : undefined}>
          {isNull(activeFilter)
            ? intl.formatMessage(
                { id: 'tasks.modal.sort.countFiltered', defaultMessage: 'Show {count} tasks' },
                { count: 12 }
              )
            : intl.formatMessage({ id: 'app.button.apply', defaultMessage: 'Apply' })}
        </Button>
      </div>
    </Drawer>
  );
};
