import React from 'react';
import { useIntl } from 'react-intl';

import cslx from 'clsx';

import { SelectTextualField } from 'common/components/ui/_formikComponents/SelectField/SelectTextualField';
import { ColorfulIcon, ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { ISelectTextualOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './TeamMemberHoldCard.module.scss';

export interface TeamMemberHoldCardProps {
  className?: string;
  title: string;
  fieldName: string;
  selectOptions: ISelectTextualOption[];
}

export const TeamMemberHoldCard: React.FC<TeamMemberHoldCardProps> = ({
  className,
  title,
  fieldName,
  selectOptions
}) => {
  const intl = useIntl();

  return (
    <div className={cslx(s.TeamMemberHoldCard, className)}>
      <ColorfulIcon icon={ColorfulIconTypes.GUEST_SETTINGS} className={s.TeamMemberHoldCard__icon} />
      <div className={s.TeamMemberHoldCard__content}>
        <div className={s.TeamMemberHoldCard__body}>
          <Text variant={TextPropsVariantsEnum.H2} className={s.TeamMemberHoldCard__title}>
            {title}
          </Text>
        </div>
        <div className={s.TeamMemberHoldCard__footer}>
          <SelectTextualField
            name={fieldName}
            prefix={intl.formatMessage({ id: 'houseTeam.form.houseIdField', defaultMessage: 'Add to:' })}
            options={selectOptions}
          />
        </div>
      </div>
    </div>
  );
};
