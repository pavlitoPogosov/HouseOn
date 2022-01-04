import React from 'react';
import { FormattedMessage } from 'react-intl';

import { appHistory } from 'appHistory';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { SubscriptionActivePlan } from './SubscriptionActivePlan/SubscriptionActivePlan';
import { SubscriptionDaysLeft } from './SubscriptionDaysLeft/SubscriptionDaysLeft';
import { SubscriptionPlan } from './SubscriptionPlan/SubscriptionPlan';
import { SubscriptionRenewal } from './SubscriptionRenewal/SubscriptionRenewal';

import s from './SubscriptionMain.module.scss';

export interface SubscriptionMainProps {}

export const SubscriptionMain: React.FC<SubscriptionMainProps> = () => {
  const isTablet = useMediaQuery('(min-width: 576px)');

  const handleGoBack = () => {
    appHistory.goBack();
  };

  return (
    <div className={s.SubscriptionMain__container}>
      <Text
        variant={isTablet ? TextPropsVariantsEnum.H2 : TextPropsVariantsEnum.BODY_L}
        className={s.SubscriptionMain__title}
        as="h1">
        {isTablet ? (
          <IconCircle
            icon={<ChevronLeftIcon />}
            width={32}
            height={32}
            className={s.SubscriptionMain__backIcon}
            onClick={handleGoBack}
          />
        ) : (
          <ChevronLeftIcon className={s.SubscriptionMain__backIcon} />
        )}
        <FormattedMessage id="subscription.button" defaultMessage="Subscriptions" />
      </Text>

      <SubscriptionDaysLeft daysLeft={0} />
      <SubscriptionRenewal />
      <SubscriptionActivePlan />
      <SubscriptionPlan />
    </div>
  );
};
