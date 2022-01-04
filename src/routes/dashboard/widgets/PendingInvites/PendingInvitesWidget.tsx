import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { TeamMemberListCard } from 'common/components/ui/_cards/TeamMemberListCard/TeamMemberListCard';
import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TPendingInvitesWidgetProps } from './types.PendingInvitesWidget';

import s from './PendingInvitesWidget.module.scss';

export interface IPendingInvitesWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  listContainerClassName?: string;
  listWrapperClassName?: string;
}

export const PendingInvitesWidget: React.FC<IPendingInvitesWidgetProps & TPendingInvitesWidgetProps> = (props) => {
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
    onCopyClick,
    onEditClick,
    title
  } = props;

  return (
    <div className={clsx(s.PendingInvitesWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.PendingInvitesWidget__content, contentClassName)}>
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
                      icon: <PencilIcon />,
                      iconName: 'Edit',
                      onClick: () => onEditClick(id)
                    },
                    {
                      icon: <CopyIcon />,
                      iconName: 'Copy',
                      onClick: () => onCopyClick(id)
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
