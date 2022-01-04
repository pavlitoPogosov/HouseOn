import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

// eslint-disable-next-line
import { useToggle } from '@proscom/ui-react';

import { ReactComponent as FiltersIcon } from 'assets/icons/filters.svg';
import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { DatepickerInput } from 'common/components/ui/DatepickerInput/DatepickerInput';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SortByPopup } from 'common/components/ui/SortByPopup/SortByPopup';
import { UsualTabs, IUsualTab } from 'common/components/ui/Tabs';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { AMPLUA_SELECT_OPTIONS, CREATED_BY_SELECT_OPTIONS, SHOW_SELECT_OPTIONS } from '../sortPopupsData';

import { SortModals } from './SortModals/SortModals';

import s from './AllTasksControls.module.scss';

export interface AllTasksControlsProps {}

enum TabsVariants {
  MONTH = 'month',
  TODAY = 'today',
  WEEK = 'week'
}

export const AllTasksControls: React.FC<AllTasksControlsProps> = () => {
  const intl = useIntl();

  const [datepickerValue, setDatepickerValue] = useState<IDatepickerValue>({
    endDate: moment().add(7, 'days'),
    isChosenMonth: false,
    startDate: moment()
  });
  const datepickerToggler = useToggle();
  const sortModalsToggler = useToggle();

  const [activeTab, setActiveTabValue] = useState<string | null>(TabsVariants.TODAY);
  const shouldAdapt = useMediaQuery('(max-width: 1441px)');
  const shouldShowSortModals = useMediaQuery('(max-width: 768px)');

  const TABS: IUsualTab[] = [
    {
      text: intl.formatMessage({ defaultMessage: 'На сегодня', id: 'tasks.tabs.today.title' }),
      value: TabsVariants.TODAY
    },
    {
      text: intl.formatMessage({ defaultMessage: 'На неделю', id: 'tasks.tabs.week.title' }),
      value: TabsVariants.WEEK
    },
    {
      text: intl.formatMessage({ defaultMessage: 'На месяц', id: 'tasks.tabs.month.title' }),
      value: TabsVariants.MONTH
    }
  ];

  const handleTabChange = (tabValue: string) => {
    setActiveTabValue(tabValue);
  };

  const handleShowChange = () => {};

  const handleHouseTeamChange = () => {};

  const handleCreatedByChange = () => {};

  const renderSortPopups = () => (
    <>
      <SortByPopup
        containerClassName={s.AllProjectsSections__control}
        onChange={handleShowChange}
        options={SHOW_SELECT_OPTIONS}
        selectedOption={SHOW_SELECT_OPTIONS[0]}
        selectedTextPrefix={intl.formatMessage({ defaultMessage: 'Show:', id: 'tasks.sort.option.show.prefix' })}
      />

      <SortByPopup
        containerClassName={s.AllProjectsSections__control}
        onChange={handleHouseTeamChange}
        options={AMPLUA_SELECT_OPTIONS}
        selectedOption={AMPLUA_SELECT_OPTIONS[0]}
        selectedTextPrefix={intl.formatMessage({
          defaultMessage: 'House team:',
          id: 'tasks.sort.option.houseTeam.prefix'
        })}
      />

      <SortByPopup
        containerClassName={s.AllProjectsSections__control}
        onChange={handleCreatedByChange}
        options={CREATED_BY_SELECT_OPTIONS}
        selectedOption={CREATED_BY_SELECT_OPTIONS[0]}
        selectedTextPrefix={intl.formatMessage({
          defaultMessage: 'Created by:',
          id: 'tasks.sort.option.createdBy.prefix'
        })}
      />
    </>
  );

  const setDatepickerText = () => 'Calendar';

  const handleDatepickerOpen = () => {
    setActiveTabValue(null);
    datepickerToggler.set();
  };

  return (
    <div className={s.AllTasksControls__container}>
      <div className={s.AllTasksControls__inner}>
        <div className={s.AllTasksControls__controls}>
          <UsualTabs
            containerClassName={s.AllTasksControls__tabsContainer}
            onChange={handleTabChange}
            tabs={TABS}
            value={activeTab}
          />

          <DatepickerInput
            containerClassName={s.AllProjectsSections__dateinput}
            enableSwap
            isOpen={datepickerToggler.value}
            onChange={setDatepickerValue}
            onClose={datepickerToggler.unset}
            onOpen={handleDatepickerOpen}
            setInputText={activeTab ? setDatepickerText : undefined}
            value={datepickerValue}
          />

          {shouldShowSortModals && (
            <IconCircle
              className={s.AllProjectsSections__filtersIcon}
              height={32}
              icon={<FiltersIcon />}
              onClick={sortModalsToggler.set}
              shadow="l"
              width={32}
            />
          )}
        </div>

        <div className={s.AllTasksControls__controls}>
          <SearchInput inputClassName={s.AllProjectsSections__searchInput} />

          {!shouldAdapt && renderSortPopups()}
        </div>
      </div>

      {shouldAdapt && <div className={s.AllProjectsSections__popupsContainer}>{renderSortPopups()}</div>}

      {shouldShowSortModals && (
        <SortModals
          handleCreatedByChange={handleCreatedByChange}
          handleHouseTeamChange={handleHouseTeamChange}
          handleShowChange={handleShowChange}
          isOpen={sortModalsToggler.value}
          onClose={sortModalsToggler.unset}
        />
      )}
    </div>
  );
};
