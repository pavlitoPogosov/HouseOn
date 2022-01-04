import React from 'react';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { DashboardLayout } from 'routes/_layouts/DashboardLayout/DashboardLayout';

import { GuestsWidget } from './widgets/Guests/GuestsWidget';
import { useGuestsWidgetData } from './widgets/Guests/useGuestsWidgetData';
import { HouseConditionWidget } from './widgets/HouseCondition/HouseConditionWidget';
import { useHouseConditionWidgetData } from './widgets/HouseCondition/useHouseConditionWidgetData';
import { LastActivityWidget } from './widgets/LastActivity/LastActivityWidget';
import { useLastActivityWidgetData } from './widgets/LastActivity/useLastActivityWidgetData';
import { PendingInvitesWidget } from './widgets/PendingInvites/PendingInvitesWidget';
import { usePendingInvitesWidgetData } from './widgets/PendingInvites/usePendingInvitesWidgetData';
import { ProgressBoardWidget } from './widgets/ProgressBoard/ProgressBoardWidget';
import { useProgressBoardWidgetData } from './widgets/ProgressBoard/useProgressBoardWidgetData';
import { StorageWidget } from './widgets/Storage/StorageWidget';
import { useStorageWidgetData } from './widgets/Storage/useStorageWidgetData';
import { SuggestionsWidget } from './widgets/Suggestions/SuggestionsWidget';
import { useSuggestionsWidgetData } from './widgets/Suggestions/useSuggestionsWidgetData';
import { TodayProjectsWidget } from './widgets/TodayProjects/TodayProjectsWidget';
import { useTodayProjectsWidgetData } from './widgets/TodayProjects/useTodayProjectsWidgetData';
import { TodayTasksWidget } from './widgets/TodayTasks/TodayTasksWidget';
import { useTodayTasksWidgetData } from './widgets/TodayTasks/useTodayTasksWidgetData';
import { UpcomingEventsWidget } from './widgets/UpcomingEvents/UpcomingEventsWidget';
import { useUpcomingEventsWidgetData } from './widgets/UpcomingEvents/useUpcomingEventsWidgetData';
import { useWorkingTodayWidgetData } from './widgets/WorkingToday/useWorkingTodayWidgetData';
import { WorkingTodayWidget } from './widgets/WorkingToday/WorkingTodayWidget';

import s from './DashboardPage.module.scss';

export const DashboardPage = (): JSX.Element => {
  const isDesktop = useMediaQuery('(max-width: 1200px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const houseConditionWidgetData = useHouseConditionWidgetData();
  const suggestionsWidgetData = useSuggestionsWidgetData();
  const todayProjectsWidgetData = useTodayProjectsWidgetData();
  const todayTasksWidgetData = useTodayTasksWidgetData();
  const progressBoardWidgetData = useProgressBoardWidgetData();
  const lastActivityWidgetData = useLastActivityWidgetData();
  const upcomingEventsWidgetData = useUpcomingEventsWidgetData();
  const storageWidgetData = useStorageWidgetData();
  const pendingInvitesWidgetData = usePendingInvitesWidgetData();
  const guestsWidgetData = useGuestsWidgetData();
  const workingTodayWidgetData = useWorkingTodayWidgetData();

  return (
    <DashboardLayout>
      <Text className={s.DashboardPage__title} text="Main page" variant={TextPropsVariantsEnum.H1} />

      <div className={clsx(s.DashboardPage__widgets_container, s.width_100)}>
        <div className={clsx(s.widgets_container__block, s.width_100)}>
          <div className={clsx(s.block__item, !isDesktop && s.width_66, isDesktop && s.width_100)}>
            <HouseConditionWidget
              containerClassName={s.HouseConditionWidget__container}
              {...houseConditionWidgetData}
            />
          </div>

          <div className={clsx(s.block__item, s.SuggestionsWidget, !isDesktop && s.width_33, isDesktop && s.width_100)}>
            <SuggestionsWidget
              containerClassName={s.SuggestionsWidget__container}
              contentDetailsClassName={s.SuggestionsWidget__content_details}
              contentImageClassName={s.SuggestionsWidget__content_image}
              {...suggestionsWidgetData}
            />
          </div>
        </div>

        <div className={clsx(s.widgets_container__block, !isDesktop && s.width_66, isDesktop && s.width_100)}>
          <div className={clsx(s.widgets_container__block, s.width_100)}>
            <div className={clsx(s.block__item, s.ProgressBoardWidget, s.width_100)}>
              <ProgressBoardWidget {...progressBoardWidgetData} />
            </div>

            <div className={clsx(s.block__item, s.width_100)}>
              <TodayProjectsWidget {...todayProjectsWidgetData} />
            </div>
          </div>

          <div className={clsx(s.widgets_container__block, s.width_100)}>
            <div className={clsx(s.block__item, !isTablet && s.width_50, isTablet && s.width_100)}>
              <UpcomingEventsWidget {...upcomingEventsWidgetData} />
            </div>

            <div className={clsx(s.block__item, !isTablet && s.width_50, isTablet && s.width_100)}>
              <TodayTasksWidget {...todayTasksWidgetData} />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            s.block__item,
            !isDesktop && s.width_33,
            isDesktop && !isMobile && s.width_50,
            isMobile && s.width_100
          )}>
          <LastActivityWidget {...lastActivityWidgetData} />
        </div>

        <div
          className={clsx(
            s.block__item,
            !isDesktop && s.width_33,
            isDesktop && !isMobile && s.width_50,
            isMobile && s.width_100
          )}>
          <StorageWidget {...storageWidgetData} />
        </div>

        <div
          className={clsx(
            s.block__item,
            !isDesktop && s.width_33,
            isDesktop && !isMobile && s.width_50,
            isMobile && s.width_100
          )}>
          <PendingInvitesWidget {...pendingInvitesWidgetData} />
        </div>

        <div
          className={clsx(
            s.block__item,
            !isDesktop && s.width_33,
            isDesktop && !isMobile && s.width_50,
            isMobile && s.width_100
          )}>
          <GuestsWidget {...guestsWidgetData} />
        </div>

        <div
          className={clsx(
            s.block__item,
            !isDesktop && s.width_33,
            isDesktop && !isMobile && s.width_50,
            isMobile && s.width_100
          )}>
          <WorkingTodayWidget {...workingTodayWidgetData} />
        </div>
      </div>
    </DashboardLayout>
  );
};
