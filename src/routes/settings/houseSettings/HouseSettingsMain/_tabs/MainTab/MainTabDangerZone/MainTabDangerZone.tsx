import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './MainTabDangerZone.module.scss';

export interface MainTabDangerZoneProps {}

export const MainTabDangerZone: React.FC<MainTabDangerZoneProps> = () => {
  const intl = useIntl();

  return (
    <>
      <Text
        text={intl.formatMessage({ id: 'settings.dangerZone.title', defaultMessage: 'Danger zone' })}
        variant={TextPropsVariantsEnum.H3}
      />

      <div className={s.MainTabDangerZone__content}>
        <Text
          text={intl.formatMessage({
            id: 'settings.dangerZone.hint',
            defaultMessage: 'You can delete your house, but be aware that all your data will be lost forever'
          })}
          color="textSecondary"
          variant={TextPropsVariantsEnum.BODY_M}
          className={s.MainTabDangerZone__contentTitle}
        />

        <Button color="orange" variant="secondary" size="m">
          <FormattedMessage id="settings.dangerZone.button.delete" defaultMessage="Delete house" />
        </Button>
      </div>
    </>
  );
};
