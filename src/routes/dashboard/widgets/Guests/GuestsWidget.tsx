import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import { TeamMemberListCard } from 'common/components/ui/_cards/TeamMemberListCard/TeamMemberListCard';
import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TGuestsWidgetProps } from './types.GuestsWidget';

import s from './GuestsWidget.module.scss';

export interface IGuestsWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  listContainerClassName?: string;
  listWrapperClassName?: string;
}

export const GuestsWidget: React.FC<IGuestsWidgetProps & TGuestsWidgetProps> = (props) => {
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
    <div className={clsx(s.GuestsWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.GuestsWidget__content, contentClassName)}>
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
                  const { date, id, ...rest } = item;

                  const iconsArr = [
                    {
                      icon: <MessageIcon />,
                      iconName: 'Message',
                      onClick: () => onMessageClick(id)
                    }
                  ];

                  return (
                    <TeamMemberListCard containerClassName={s.content__list_item} icons={iconsArr} key={id} {...rest}>
                      <Text
                        className={s.list_item__date}
                        color="textSecondary"
                        text={date}
                        variant={TextPropsVariantsEnum.BODY_M}
                      />
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
