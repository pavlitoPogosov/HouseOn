import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as LightningIcon } from 'assets/icons/lightning.svg';
import { ToggleSwitchField } from 'common/components/ui/_formikComponents/ToggleSwitchField/ToggleSwitchField';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { TextPropsVariantsEnum, Text } from 'common/components/ui/Text/Text';
import { ESettingsFormFieldsTypes } from 'routes/projects/singleProject/ProjectSettingsDialog/types';

import s from './styles.module.scss';

type THighPrioritySection = {};

export const HighPrioritySection: React.FC<THighPrioritySection> = (props) => {
  const {} = props;

  const intl = useIntl();

  return (
    <div className={s.HighPrioritySection__container}>
      <IconCircle
        className={s.HighPrioritySection__lightning}
        height={32}
        icon={<LightningIcon className={s.HighPrioritySection__lightning_icon} />}
        shadow="m"
        width={32}
      />

      <Text
        className={s.header__toggler_text}
        text={intl.formatMessage({
          defaultMessage: 'High priority',
          id: 'project.settings.form.highPriority'
        })}
        variant={TextPropsVariantsEnum.BODY_M}
      />

      <ToggleSwitchField
        containerClassName={s.HighPrioritySection__switch_container}
        name={ESettingsFormFieldsTypes.HIGH_PRIORITY}
        size="md"
      />
    </div>
  );
};
