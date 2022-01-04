import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './SubscriptionDaysLeft.module.scss';

export interface SubscriptionDaysLeftProps {
  daysLeft: number;
}

export const SubscriptionDaysLeft: React.FC<SubscriptionDaysLeftProps> = ({ daysLeft }) => {
  const intl = useIntl();

  const titleText = intl.formatMessage(
    {
      id: 'subscription.banner.alert.period.title',
      defaultMessage:
        '{daysLeft, plural, =0 {Your trial period finished}  =1 {Your trial period will end in {daysLeft} day} other {Your trial period will end in ${daysLeft} days}}'
    },
    { daysLeft }
  );

  const descriptionText = intl.formatMessage(
    {
      id: 'subscription.banner.alert.period.description',
      defaultMessage:
        '{daysLeft, plural, =0 {Your subscription has expired. Connect a suitable plan below to continue using the product} other {You can wait until the end of the trial period or activate any subscription right now from the options below}}'
    },
    { daysLeft }
  );

  return (
    <article className={s.SubscriptionDaysLeft__container}>
      <div
        className={clsx(s.SubscriptionDaysLeft__daysLeft, {
          [s.primary]: daysLeft > 0,
          [s.secondary]: daysLeft === 0
        })}>
        <span className={s.SubscriptionDaysLeft__daysLeftCount}>{daysLeft}</span>
        <span className={s.SubscriptionDaysLeft__daysLeftLabel}>days</span>
      </div>

      <div>
        <Text text={titleText} variant={TextPropsVariantsEnum.H2} className={s.SubscriptionDaysLeft__title} />

        <Text
          text={descriptionText}
          variant={TextPropsVariantsEnum.BODY_M}
          color="textSecondary"
          className={s.SubscriptionDaysLeft__description}
        />
      </div>
    </article>
  );
};
