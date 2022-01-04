import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { IUsualTab, UsualTabs } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { PlanCard } from './PlanCard/PlanCard';

import s from './SubscriptionPlan.module.scss';

export interface SubscriptionPlanProps {}

export enum SubscriptionVariants {
  ONE_MONTH = '1',
  SIX_MONTHS = '6',
  TWELVE_MONTHS = '12'
}

const TABS: IUsualTab[] = [
  { text: '1 month', value: SubscriptionVariants.ONE_MONTH },
  { text: '6 months', value: SubscriptionVariants.SIX_MONTHS },
  { text: '12 months', value: SubscriptionVariants.TWELVE_MONTHS }
];

const PLANS = [
  {
    title: 'Apartment or small house',
    description: 'Кратко описание какой дом считается маленьким (мб квадратура или еще что-то)',
    price: '99',
    subscriptionDaysLeft: 12
  },
  {
    title: 'Middle house',
    description: 'Кратко описание какой дом считается маленьким (мб квадратура или еще что-то)',
    price: '199',
    subscriptionDaysLeft: null
  },
  {
    title: 'Big house',
    description: 'Кратко описание какой дом считается большим (мб квадратура или еще что-то)',
    price: '299',
    subscriptionDaysLeft: null
  }
];

export const SubscriptionPlan: React.FC<SubscriptionPlanProps> = () => {
  const [activeTab, setActiveTab] = useState<string>(SubscriptionVariants.ONE_MONTH);

  const intl = useIntl();

  const handleSubscribe = (isSubscribed: boolean) => {};

  return (
    <>
      <div className={s.SubscriptionPlan__controls}>
        <Text
          text={intl.formatMessage({
            id: 'subscription.plan.title',
            defaultMessage: 'Subscription plan'
          })}
          variant={TextPropsVariantsEnum.H3}
          className={s.SubscriptionPlan__title}
        />

        <UsualTabs onChange={setActiveTab} tabs={TABS} value={activeTab} />
      </div>

      <div className={s.SubscriptionPlan__content}>
        {PLANS.map((p, i) => (
          <PlanCard
            key={i}
            isSubscribed={i === 0}
            onClickSubscribe={handleSubscribe}
            containerClassName={s.SubscriptionPlan__card}
            {...p}
          />
        ))}
      </div>
    </>
  );
};
