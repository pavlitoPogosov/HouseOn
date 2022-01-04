import React from 'react';

import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './SubscriptionRenewal.module.scss';

export interface SubscriptionRenewalProps {}

export const SubscriptionRenewal: React.FC<SubscriptionRenewalProps> = () => {
  return (
    <div className={s.SubscriptionRenewal__container}>
      <Text variant={TextPropsVariantsEnum.H2} text="We cannot renew your subscription" />

      <Text
        variant={TextPropsVariantsEnum.BODY_M}
        color="textSecondary"
        className={s.SubscriptionRenewal__description}
        text="Please check your payment info and try to renew or choose new subscription below"
      />

      <Button size="xl" color="green" variant="primary" className={s.SubscriptionRenewal__btn}>
        Try again
      </Button>
    </div>
  );
};
