import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import { ReactComponent as StopIcon } from 'assets/icons/stop.svg';
import { Button } from 'common/components/ui/Button';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { IconButton } from 'common/components/ui/IconButton/IconButton';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { StatusState } from 'routes/tasks/_components/TaskViewModal/Status/Status';

import s from './HeaderView.module.scss';

export interface HeaderViewProps {
  status: StatusState;
  headerSticky: boolean;
  stickyText: string;

  onClose: () => void;
  onEdit: () => void;
}

export const HeaderView = React.forwardRef<HTMLDivElement, HeaderViewProps>((props, ref) => {
  const { status, headerSticky, stickyText, onClose, onEdit } = props;
  const intl = useIntl();

  const isMd = useMediaQuery('(max-width: 768px)');

  let button = <></>;

  switch (status) {
    case StatusState.ACTIVE:
      button = (
        <>
          {!isMd && !headerSticky ? (
            <Button className={s.HeaderView__active} color="gray">
              <StopIcon className={s.HeaderView__mr} />
              <Text
                className={clsx(s.HeaderView__buttonText, { [s.HeaderView__buttonText_hide]: headerSticky })}
                variant={TextPropsVariantsEnum.BODY_M}>
                {intl.formatMessage({ id: 'tasks.button.stop', defaultMessage: 'Stop task' })}
              </Text>
            </Button>
          ) : (
            <IconButton className={s.HeaderView__iconButton_gray} width={40} height={40}>
              <StopIcon />
            </IconButton>
          )}
          {headerSticky && (
            <Text
              className={s.HeaderView__stickyText}
              variant={isMd ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}>
              {stickyText}
            </Text>
          )}
        </>
      );
      break;
    case StatusState.IN_WORK:
      button = (
        <>
          {!isMd && !headerSticky ? (
            <Button className={s.HeaderView__active} color="gray">
              <CheckIcon className={clsx(!headerSticky ? s.HeaderView__mr : '', s.HeaderView__iconGray)} />
              <Text className={s.HeaderView__buttonText} variant={TextPropsVariantsEnum.BODY_M}>
                {intl.formatMessage({ id: 'tasks.button.complete', defaultMessage: 'Complete task' })}
              </Text>
            </Button>
          ) : (
            <IconButton className={s.HeaderView__iconButton_gray} width={40} height={40}>
              <CheckIcon className={s.HeaderView__iconGray} />
            </IconButton>
          )}
          {headerSticky && (
            <Text
              className={s.HeaderView__stickyText}
              variant={isMd ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}>
              {stickyText}
            </Text>
          )}
        </>
      );
      break;
    case StatusState.ARCHIVED:
      button = (
        <>
          <CheckCircleIcon className={s.HeaderView__mr} />
          {!headerSticky ? (
            <Text variant={TextPropsVariantsEnum.H3} color="textBrand">
              {intl.formatMessage({ id: 'tasks.button.archived', defaultMessage: 'Task completed' })}
            </Text>
          ) : (
            <Text
              className={s.HeaderView__stickyText}
              variant={isMd ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}>
              {stickyText}
            </Text>
          )}
        </>
      );
      break;
    default:
      button = (
        <>
          {!isMd && !headerSticky ? (
            <Button className={s.HeaderView__active}>
              <PlayIcon className={!headerSticky ? s.HeaderView__mr : ''} />
              <Text
                className={clsx(s.HeaderView__buttonText, { [s.HeaderView__buttonText_hide]: headerSticky })}
                variant={TextPropsVariantsEnum.BODY_M}>
                {intl.formatMessage({ id: 'tasks.button.activate', defaultMessage: 'Activate task' })}
              </Text>
            </Button>
          ) : (
            <IconButton className={s.HeaderView__iconButton_green} width={40} height={40}>
              <PlayIcon />
            </IconButton>
          )}
          {headerSticky && (
            <Text
              className={s.HeaderView__stickyText}
              variant={isMd ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}>
              {stickyText}
            </Text>
          )}
        </>
      );
      break;
  }

  return (
    <div ref={ref} className={clsx(s.HeaderView, { [s.HeaderView_sticky]: headerSticky })}>
      {button}
      <div className={s.HeaderView__actions}>
        <Text as="div" className={s.HeaderView__actions_item} variant={TextPropsVariantsEnum.BODY_M}>
          <ColorfulIcon
            className={s.HeaderView__actions_item_small}
            icon={ColorfulIconTypes.LIGHTNING}
            variant={ColorfulIconVariants.ORANGE}
          />
          <span className={clsx(s.HeaderView__actions_item_small, s.HeaderView__buttonText)}>
            {intl.formatMessage({ id: 'tasks.highPriority', defaultMessage: 'High priority' })}
          </span>
          <ToggleSwitch className={s.HeaderView__actions_item_small} />
        </Text>
        <IconCircle
          onClick={onEdit}
          className={s.HeaderView__actions_item}
          icon={
            <ColorfulIcon icon={ColorfulIconTypes.PENCIL_SECONDARY} variant={ColorfulIconVariants.GRAY_SECONDARY} />
          }
        />

        <IconCircle
          className={s.HeaderView__actions_item}
          icon={<ColorfulIcon icon={ColorfulIconTypes.CLOSE} variant={ColorfulIconVariants.GRAY_SECONDARY} />}
          onClick={onClose}
        />
      </div>
    </div>
  );
});
