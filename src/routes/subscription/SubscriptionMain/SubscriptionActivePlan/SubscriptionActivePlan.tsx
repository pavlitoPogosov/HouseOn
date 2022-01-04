import React from 'react';

import { Button } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './SubscriptionActivePlan.module.scss';

export interface SubscriptionActivePlanProps {}

export const SubscriptionActivePlan: React.FC<SubscriptionActivePlanProps> = () => {
  return (
    <div className={s.SubscriptionActivePlan__container}>
      <div className={s.SubscriptionActivePlan__header}>
        <Text
          variant={TextPropsVariantsEnum.H2}
          text="Active plan: Big House"
          className={s.SubscriptionActivePlan__title}
        />

        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text="Next renewal: 10.10.2022"
          color="textSecondary"
          className={s.SubscriptionActivePlan__date}
        />
      </div>

      <Text
        variant={TextPropsVariantsEnum.BODY_M}
        text="Кратко описание какой дом считается большим (мб квадратура или еще что-то)"
        color="textSecondary"
        className={s.SubscriptionActivePlan__description}
      />

      <div className={s.SubscriptionActivePlan__btns}>
        <Button size="xl" className={s.SubscriptionActivePlan__btn} color="green" variant="secondary">
          Cancel subscription
        </Button>

        <Button size="xl" className={s.SubscriptionActivePlan__btn} color="green" variant="secondary">
          Change suscription
        </Button>
      </div>
    </div>
  );
};
