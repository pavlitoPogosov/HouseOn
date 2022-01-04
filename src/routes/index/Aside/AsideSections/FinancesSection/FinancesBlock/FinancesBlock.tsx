import React from 'react';

import clsx from 'clsx';

import { THINSP } from '@proscom/ui-utils';
import { CounterBadge } from 'common/components/ui/_badges/CounterBadge/CounterBadge';
import { ButtonLink } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './FinancesBlock.module.scss';

export interface FinancesBlockProps {
  title: string;
  amount: string;
  percent?: number;
  buttonLink?: string;
  buttonText?: string;
  className?: string;
}

export const FinancesBlock: React.FC<FinancesBlockProps> = ({
  amount,
  title,
  buttonLink,
  buttonText,
  percent,
  className
}) => {
  return (
    <div className={clsx(s.FinancesBlock__container, className)}>
      <Text variant={TextPropsVariantsEnum.BODY_M} text={title} className={s.FinancesBlock__Title} />

      <div className={s.FinancesBlock__content}>
        <div>
          <span className={s.FinancesBlock__dollarSign}>${THINSP}</span>

          <span className={s.FinancesBlock__amount}>{amount}</span>

          {percent && (
            <CounterBadge className={s.FinancesBlock__badge} color={percent <= 0 ? 'secondary' : 'red'} size="s">
              {`${percent! >= 0 ? '+' : ''}${percent}%`}
            </CounterBadge>
          )}
        </div>

        {buttonLink && (
          <ButtonLink variant="secondary" color="orange" to={buttonLink}>
            {buttonText}
          </ButtonLink>
        )}
      </div>
    </div>
  );
};
