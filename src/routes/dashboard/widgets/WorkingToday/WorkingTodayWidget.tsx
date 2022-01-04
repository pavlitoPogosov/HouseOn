import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import { TeamMemberListCard } from 'common/components/ui/_cards/TeamMemberListCard/TeamMemberListCard';
import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';
import { EColors } from 'variables/colors';

import { TWorkingTodayWidgetProps } from './types.WorkingTodayWidget';

import s from './WorkingTodayWidget.module.scss';

export interface IWorkingTodayWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  listContainerClassName?: string;
  listWrapperClassName?: string;
}

export const WorkingTodayWidget: React.FC<IWorkingTodayWidgetProps & TWorkingTodayWidgetProps> = (props) => {
  const {
    containerClassName,
    contentClassName,
    data,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    isDataLoading = false,
    listContainerClassName,
    listWrapperClassName,
    onMessageClick,
    title
  } = props;

  return (
    <div className={clsx(s.WorkingTodayWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.WorkingTodayWidget__content, contentClassName)}>
          <WidgetHeader
            buttonLabel="View all"
            buttonLink="/"
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            icon={<CalendarIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}
          />

          <div className={clsx(s.content__list_wrapper, listWrapperClassName)}>
            <Scrollbars className={s.content__list_scrollbars}>
              <div className={clsx(s.content__list_container, listContainerClassName)}>
                {data?.map((item) => {
                  const { id, isOnline, role, tasks, ...rest } = item;

                  const iconsArr = [
                    {
                      icon: <MessageIcon />,
                      iconName: 'Message',
                      onClick: () => onMessageClick(id)
                    }
                  ];

                  /* TODO: заменить на автоматическое определение множественной формы из библиотеки локализации */
                  const pluralTasks = tasks > 1 ? 'tasks' : 'task';

                  return (
                    <TeamMemberListCard
                      containerClassName={s.content__list_item}
                      icons={iconsArr}
                      key={id}
                      onlineStatusColor={isOnline ? EColors.GREEN200 : EColors.GREY100}
                      withOnlineStatus
                      {...rest}>
                      <div className={s.list_item__children}>
                        <div className={s.list_item__role_container}>
                          <Text className={s.list_item__role} text={role} variant={TextPropsVariantsEnum.BODY_M} />

                          <span className={clsx(s.list_item__children_bullet)}>&#8226;</span>
                        </div>

                        <Text
                          className={s.list_item__tasks}
                          color="textSecondary"
                          text={`${tasks} ${pluralTasks}`}
                          variant={TextPropsVariantsEnum.BODY_M}
                        />
                      </div>
                    </TeamMemberListCard>
                  );
                })}
              </div>
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
};
