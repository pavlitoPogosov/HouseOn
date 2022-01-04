import React from 'react';
import { useIntl } from 'react-intl';

import { Moment } from 'moment';

import { NBSP } from '@proscom/ui-utils';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { RewardType } from 'graphql/types';

import s from './RewardCard.module.scss';

export interface RewardCardProps {
  reward: RewardType;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const intl = useIntl();

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
    }
  };

  const getDate = (date: Moment) => {
    return date.format('D MMM');
  };
  return (
    <div className={s.RewardCard}>
      <div className={s.RewardCard__header}>
        <div className={s.RewardCard__amount}>
          <ColorfulIcon
            className={s.RewardCard__amount_icon}
            icon={ColorfulIconTypes.TASK}
            variant={ColorfulIconVariants.YELLOW}
          />
          <Text className={s.RewardCard__amount_text} variant={TextPropsVariantsEnum.H3}>
            + {getCurrencyIcon(reward.currency)}
            {reward.amount}
          </Text>
        </div>
      </div>
      <div className={s.RewardCard__footer}>
        <div className={s.RewardCard__from}>
          <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.RewardCard__from_text}>
            {intl.formatMessage({ id: 'houseTeam.finance.reward.from', defaultMessage: 'From:' })}
          </Text>
          {NBSP}
          <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.RewardCard__from_user}>
            {/*{TODO "Убрать когда появиться возможность изменить имя"}*/}
            {reward.creator.name || 'Maria Ankerville'}
          </Text>
        </div>
        <div className={s.RewardCard__created}>
          <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.RewardCard__created_text}>
            <ColorfulIcon className={s.RewardCard__created_icon} icon={ColorfulIconTypes.CLOCK} />
            {NBSP}
            {intl.formatMessage({ id: 'houseTeam.finance.reward.created', defaultMessage: 'Date' })}
          </Text>
          {NBSP}
          <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.RewardCard__created_date}>
            {getDate(reward.created_at)}
          </Text>
        </div>
      </div>
    </div>
  );
};
