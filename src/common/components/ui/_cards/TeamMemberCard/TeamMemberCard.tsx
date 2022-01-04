import React, { useCallback } from 'react';

import clsx from 'clsx';

import { ReactComponent as GuestIcon } from 'assets/icons/guest.svg';
import { TextPropsVariantsEnum, Text } from 'common/components/ui/Text/Text';
import { EColors } from 'variables/colors';

import { OnlineStatusLabel } from '../../_labels/OnlineStatusLabel/OnlineStatusLabel';
import { Avatar } from '../../Avatar/Avatar';

import s from './TeamMemberCard.module.scss';

export interface ITeamMemberCardProps {
  activeProjects: number;
  avatar?: string | null;
  containerClassName?: string;
  isActive?: boolean;
  isOnline: boolean;
  isPendingToRespond?: boolean;
  name: string;
  onClick?: () => void;
  onlineStatusClassName?: string;
  onlineStatusColor?: EColors;
  onlineStatusContainerClassName?: string;
  onlineStatusDotSize?: number;
  onlyName?: boolean;
  role: string;
}

export const TeamMemberCard: React.FC<ITeamMemberCardProps> = (props) => {
  const {
    activeProjects,
    avatar,
    containerClassName,
    isActive,
    isOnline,
    isPendingToRespond,
    name,
    onClick,
    onlineStatusClassName,
    onlineStatusColor,
    onlineStatusContainerClassName,
    onlineStatusDotSize,
    onlyName = false,
    role
  } = props;

  const ProjectsStatus = useCallback(() => {
    const status = activeProjects === 1 ? 'project' : 'projects';

    return activeProjects > 0 ? (
      <span className={s.TeamMemberCard__infoText}>{`${activeProjects} active ${status}`}</span>
    ) : (
      <span className={s.TeamMemberCard__infoWarning}>No projects</span>
    );
  }, []);

  const CardExtra = () =>
    isPendingToRespond ? (
      <span className={s.TeamMemberCard__infoText}>Pending to respond</span>
    ) : (
      <div className={s.TeamMemberCard__tasksWrapper}>
        <ProjectsStatus />
      </div>
    );

  return (
    <article className={clsx(s.TeamMemberCard__container, isActive && s.active, containerClassName)} onClick={onClick}>
      {avatar ? (
        <Avatar
          avatar={avatar}
          containerClassName={s.TeamMemberCard__avatar}
          emptyClassName={s.TeamMemberCard__emptyAvatar}
          emptyText={name}
          height={40}
          width={40}
        />
      ) : (
        <div className={s.TeamMemberCard__avatarIconWrapper}>
          <GuestIcon className={s.TeamMemberCard__avatarIcon} />
        </div>
      )}

      <div>
        <Text as="div" variant={TextPropsVariantsEnum.BODY_M}>
          {!onlyName && role}

          {!onlyName && role && <span className={s.TeamMemberCard__dot}>&#8226;</span>}

          {name}

          {!onlyName && (
            <OnlineStatusLabel
              containerClassName={clsx(
                s.TeamMemberCard__onlineStatusContainerClassName,
                onlineStatusContainerClassName
              )}
              dotClassName={onlineStatusClassName}
              dotColor={onlineStatusColor}
              dotSize={onlineStatusDotSize}
              isOnline={isOnline}
            />
          )}
        </Text>

        <div className={s.TeamMemberCard__infoWrapper}>{!onlyName && <CardExtra />}</div>
      </div>
    </article>
  );
};
