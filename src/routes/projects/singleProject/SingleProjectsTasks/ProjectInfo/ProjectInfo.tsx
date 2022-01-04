import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as SettingsFilledIcon } from 'assets/icons/settings-filled.svg';
import { EStatusBadgeTypesEnum, StatusBadge } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { getButtonIcon } from 'common/components/ui/_cards/ProjectCard/getButtonIcon';
import { getProjectActionButtonText } from 'common/components/ui/_cards/ProjectCard/getProjectActionButtonText';
import { Button } from 'common/components/ui/Button/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './ProjectInfo.module.scss';

export interface IProjectInfoProps {
  isPaused: boolean;
  onSettingsClick: () => void;
  onStartProject: () => void;
  onStopProject: () => void;
  statusType: EStatusBadgeTypesEnum;
}

export const ProjectInfo: React.FC<IProjectInfoProps> = (props) => {
  const { isPaused, onSettingsClick, onStartProject, onStopProject, statusType } = props;

  const history = useHistory();

  const intl = useIntl();

  const handleBackIconClick = () => {
    history.goBack();
  };

  const ButtonIcon = getButtonIcon(statusType);
  const buttonText = getProjectActionButtonText(statusType);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleAction = () => {
    if (isPaused) {
      onStartProject?.();
    } else {
      onStopProject?.();
    }
  };

  return (
    <div className={s.ProjectInfo__container}>
      <div className={s.nav__title}>
        <IconCircle className={s.nav_title__backIcon} height={32} onClick={handleBackIconClick} width={32}>
          <ChevronLeftIcon />
        </IconCircle>

        <div className={s.nav_title__wrapper}>
          <Text
            className={s.nav_title__text}
            text={intl.formatMessage({
              defaultMessage: 'Home ownership care',
              id: 'projects.info.title'
            })}
            variant={TextPropsVariantsEnum.H2}
          />
        </div>
      </div>

      <div className={s.nav__actions_container}>
        <Button
          className={s.nav__action_btn}
          color={isPaused ? 'green' : 'grey'}
          leftIcon={<ButtonIcon className={s.action_btn__icon} />}
          onClick={handleAction}
          variant="primary">
          <FormattedMessage defaultMessage={buttonText.defaultMessage} id={buttonText.id} />
        </Button>

        <Button
          className={s.nav__settings_btn}
          color="grey"
          leftIcon={<SettingsFilledIcon />}
          onClick={onSettingsClick}
          variant="primary">
          {!isDesktop &&
            intl.formatMessage({
              defaultMessage: 'Project settings',
              id: 'projects.card.settings'
            })}
        </Button>
      </div>

      <div className={s.ProjectInfo__statuses_container}>
        <StatusBadge containerClassName={s.statuses_container__status} statusType={statusType} />
      </div>

      <div className={s.ProjectInfo__description}>
        <Text
          color="textSecondary"
          text={intl.formatMessage({
            defaultMessage:
              'This is a project that will allow you to keep everything in order so that you have it in predictable places.',
            id: 'projects.info.description'
          })}
          variant={TextPropsVariantsEnum.BODY_M}
        />
      </div>
    </div>
  );
};
