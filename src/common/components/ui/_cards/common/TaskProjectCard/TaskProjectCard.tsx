import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { ReactComponent as TeamIcon } from 'assets/icons/team.svg';
import { StatusBadge, EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import s from 'common/components/ui/_cards/common/TaskProjectCard/TaskProjectCard.module.scss';
import { getButtonIcon } from 'common/components/ui/_cards/ProjectCard/getButtonIcon';
import { getRightStatusType } from 'common/components/ui/_cards/ProjectCard/getRightStatusType';
import { Member } from 'common/components/ui/_cards/ProjectCard/Member';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

export type TTaskProjectCardProps = {
  isTask?: boolean;
  onClick?: () => void;
  onStartTask?: () => void;
  onStopTask?: () => void;
  project: IProject | ITask;
};

export const TaskProjectCard = (props: TTaskProjectCardProps): JSX.Element => {
  const { isTask, onClick, onStartTask, onStopTask, project } = props;

  const intl = useIntl();

  const { img, members, title } = project;

  const statusType = getRightStatusType(project);
  const ButtonIcon = getButtonIcon(statusType);

  const isPaused =
    statusType === EStatusBadgeTypesEnum.IS_PAUSED || statusType === EStatusBadgeTypesEnum.IS_READY_TO_START;

  const onAction = () => {
    if (isPaused) {
      onStartTask?.();
    } else {
      onStopTask?.();
    }
  };

  const member = members?.[0];

  const { avatar, name } = member || {};

  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <div onClick={onClick} className={clsx(s.TaskProjectCard__container, isTask && s.task)}>
      <div className={clsx(s.TaskProjectCard__header, isTask && s.task)}>
        <Button
          className={clsx(s.header__button, isTask && s.task)}
          color={isPaused ? 'green' : 'grey'}
          // leftIcon={buttonIcon}
          onClick={onAction}
          variant="primary">
          <ButtonIcon className={s.header__button_action_icon} />
        </Button>

        {isTask && isDesktop && <div className={s.header__divider} />}

        <Text className={clsx(s.header__title, isTask && s.task)} text={title} variant={TextPropsVariantsEnum.BODY_M} />
      </div>

      <div className={clsx(s.TaskProjectCard__content, isTask && s.task)}>
        <div className={clsx(s.TaskProjectCard__statuses_container, isTask && s.task)}>
          <StatusBadge containerClassName={clsx(s.TaskProjectCard__status, isTask && s.task)} statusType={statusType} />

          {isTask && <StatusBadge containerClassName={s.TaskProjectCard__status_extra}>Every 6 months</StatusBadge>}
        </div>

        <div className={clsx(s.TaskProjectCard__footer, isTask && s.task)}>
          <TeamIcon />

          <Text
            className={s.footer__team_text}
            color="textTretiary"
            text={intl.formatMessage({
              defaultMessage: 'House team:',
              id: 'projects.card.quick.houseTeam'
            })}
            variant={TextPropsVariantsEnum.CAPTION_R}
          />

          {!member && (
            <Text
              className={s.footer__team_text}
              color="textTretiary"
              text={intl.formatMessage({
                defaultMessage: 'no members added',
                id: 'projects.card.quick.noMembers'
              })}
              variant={TextPropsVariantsEnum.CAPTION_R}
            />
          )}

          {member && (
            <div className={s.footer__team_member}>
              {avatar && (
                // <Tippy content={<MemberTooltip member={member} />} offset={[0, -72]}>
                //   <Avatar avatar={avatar} emptyText={name} height={16} width={16} />
                // </Tippy>
                <Avatar avatar={avatar} emptyText={name} height={16} width={16} />
              )}

              <Text
                className={clsx(s.member__description, member && s.withAuthor)}
                color="textSecondary"
                variant={TextPropsVariantsEnum.CAPTION_R}>
                <Member className={s.member__link} member={member} />
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
