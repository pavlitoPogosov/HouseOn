import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { Button } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './PlanCard.module.scss';

export interface PlanCardProps {
  containerClassName?: string;
  title: string;
  description: string;
  price: string;
  isSubscribed: boolean;
  subscriptionDaysLeft: number | null;
  onClickSubscribe: (isSubscribed: boolean) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  containerClassName,
  description,
  price,
  title,
  isSubscribed,
  subscriptionDaysLeft,
  onClickSubscribe
}) => {
  const intl = useIntl();

  const planText = intl.formatMessage(
    {
      id: 'subscription.plan.left.text',
      defaultMessage: '{daysLeft, plural, =1 {Left {daysLeftHtml} day} other {Left {daysLeftHtml} days}}',
      description: 'Need to translate word `Left` and `Day/Days` (singular and plural)'
    },
    { daysLeft: subscriptionDaysLeft, daysLeftHtml: `<span>${subscriptionDaysLeft}</span>` }
  );

  const handleSubscribeBtnClick = () => {
    onClickSubscribe(!isSubscribed);
  };

  return (
    <article className={clsx(s.PlanCard__container, containerClassName)}>
      <div className={s.PlanCard__imageWrapper}>
        {subscriptionDaysLeft && (
          <Text variant={TextPropsVariantsEnum.BODY_M} className={s.PlanCard__badge} as="div">
            <div dangerouslySetInnerHTML={{ __html: planText }} />
          </Text>
        )}
      </div>

      <div className={s.PlanCard__content}>
        <Text text={title} variant={TextPropsVariantsEnum.H2} className={s.PlanCard__title} />

        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={description}
          color="textSecondary"
          className={s.PlanCard__description}
        />

        <div className={s.PlanCard__price}>
          <span className={s.PlanCard__priceSign}>$</span>
          <span className={s.PlanCard__priceAmount}>{`${price}`}</span>
          /month
        </div>

        <Button
          variant={isSubscribed ? 'secondary' : 'primary'}
          color="green"
          onClick={handleSubscribeBtnClick}
          className={s.PlanCard__btn}>
          {isSubscribed
            ? intl.formatMessage({ id: 'subscription.plan.button.unsubscribe', defaultMessage: 'Unsubscribe' })
            : intl.formatMessage({ id: 'subscription.plan.button.subscribe', defaultMessage: 'Subscribe' })}
        </Button>
      </div>
    </article>
  );
};
