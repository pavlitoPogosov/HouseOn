import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as PencilFilledIcon } from 'assets/icons/pencil-filled.svg';
import { ReactComponent as TriangleRight } from 'assets/icons/triangleRight.svg';
import { Button } from 'common/components/ui/Button';
import { ColorfulIcon, ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';

import s from './styles.module.scss';

export const TaskModalContentHeader = (): JSX.Element => {
  const intl = useIntl();

  const onClick = () => {};
  const onClose = () => {};
  const onClickEdit = () => {};

  return (
    <div className={s.TaskModalContentHeader__container}>
      <Button
        className={s.header__button_action}
        // color='green'
        leftIcon={<TriangleRight className={s.header__button_action_icon} />}
        onClick={onClick}
        variant="primary">
        {intl.formatMessage({ defaultMessage: 'Activate task', id: 'tasks.modal.view.header.button.action' })}
      </Button>

      <div className={s.header__section_right}>
        <div className={s.header__toggler_wrapper}>
          <ToggleSwitch size="sm" />

          <Text
            className={s.header__toggler_text}
            text={intl.formatMessage({
              defaultMessage: 'High priority',
              id: 'tasks.modal.view.header.highPriority'
            })}
            variant={TextPropsVariantsEnum.BODY_M}
          />
        </div>

        <IconCircle
          className={s.header__button_edit}
          height={32}
          icon={<PencilFilledIcon />}
          onClick={onClickEdit}
          shadow="m"
          width={32}
        />

        <ColorfulIcon className={s.header__close} icon={ColorfulIconTypes.CLOSE} onClick={onClose} />
      </div>
    </div>
  );
};
