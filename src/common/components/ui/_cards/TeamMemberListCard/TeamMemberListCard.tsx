import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as GuestIcon } from 'assets/icons/guest.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { EIconCircleSizes, IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { EColors } from 'variables/colors';

import s from './TeamMemberListCard.module.scss';

type TIcon = {
  className?: string;
  icon: JSX.Element;
  iconName: string;
  onClick: () => void;
  shadow?: EIconCircleSizes;
  size?: number;
};

export type TTeamMemberListCardProps = {
  avatar?: string;
  avatarClassName?: string;
  avatarSize?: number;
  bulletClassName?: string;
  buttonsContainerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  icons?: TIcon[];
  memberLink: string;
  name: string;
  onlineStatusClassName?: string;
  onlineStatusColor?: EColors;
  onlineStatusContainerClassName?: string;
  withOnlineStatus?: boolean;
};

export const TeamMemberListCard: React.FC<TTeamMemberListCardProps> = (props) => {
  const {
    avatar,
    avatarSize = 40,
    onlineStatusContainerClassName,
    bulletClassName,
    children,
    memberLink,
    containerClassName,
    onlineStatusColor = EColors.GREEN200,
    onlineStatusClassName,
    buttonsContainerClassName,
    avatarClassName,
    contentClassName,
    withOnlineStatus = false,
    icons,
    name
  } = props;

  const onlineStatusStyle = { backgroundColor: onlineStatusColor };

  return (
    <div className={clsx(s.TeamMemberListCard__container, containerClassName)}>
      <div className={clsx(s.TeamMemberListCard__content, contentClassName)}>
        {avatar ? (
          <Avatar
            avatar={avatar}
            containerClassName={clsx(s.TeamMemberListCard__avatar, avatarClassName)}
            height={avatarSize}
            width={avatarSize}
          />
        ) : (
          <div className={clsx(s.TeamMemberListCard__avatar, avatarClassName)}>
            <GuestIcon />
          </div>
        )}

        <div className={s.content__details}>
          <div className={s.TeamMemberListCard__name_container}>
            <Link to={memberLink}>
              <Text className={s.TeamMemberListCard__name} text={name} variant={TextPropsVariantsEnum.BODY_M} />
            </Link>

            {children && <span className={clsx(s.TeamMemberListCard__bullet, bulletClassName)}>&#8226;</span>}
          </div>

          {children}
        </div>
      </div>

      {withOnlineStatus && (
        <div className={clsx(s.TeamMemberCard__online_status_container, onlineStatusContainerClassName)}>
          <span className={clsx(s.TeamMemberCard__online_status, onlineStatusClassName)} style={onlineStatusStyle} />
        </div>
      )}

      {icons && (
        <div className={clsx(s.TeamMemberCard__buttons_container, buttonsContainerClassName)}>
          {icons.map((iconItem) => {
            const { className, icon, iconName, onClick, shadow = 'm', size = 32 } = iconItem;

            return (
              <IconCircle
                className={clsx(s.TeamMemberListCard__cardIcon, className)}
                height={size}
                icon={icon}
                key={iconName}
                onClick={onClick}
                shadow={shadow}
                width={size}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
