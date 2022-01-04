import React from 'react';
import { useIntl } from 'react-intl';

import { EmptySection } from '../_common/_EmptySection/EmptySection';
import { SectionHeader } from '../_common/_SectionHeader/SectionHeader';

import { FinancesBlock } from './FinancesBlock/FinancesBlock';

import s from './FinancesSection.module.scss';

export interface FinancesSectionProps {}

export const FinancesSection: React.FC<FinancesSectionProps> = () => {
  const isEmpty = false;

  const intl = useIntl();

  const renderContent = () => (
    <div className={s.Finances__container}>
      <FinancesBlock
        title={intl.formatMessage({
          id: 'index.finance.spent.title',
          defaultMessage: 'Spent this month'
        })}
        amount="15,035"
        percent={25}
        className={s.Finances__block}
      />

      <FinancesBlock
        title={intl.formatMessage({
          id: 'index.finance.expenses.title',
          defaultMessage: 'Possible expenses'
        })}
        amount="25,500"
        percent={-18}
        className={s.Finances__block}
      />

      <FinancesBlock
        title={intl.formatMessage({
          id: 'index.finance.requests.title',
          defaultMessage: 'You have 4 requests'
        })}
        amount="200,035"
        buttonText={intl.formatMessage({
          id: 'index.finance.requests.button',
          defaultMessage: 'Check'
        })}
        buttonLink="/"
        className={s.Finances__block}
      />
    </div>
  );

  return (
    <>
      <SectionHeader title={intl.formatMessage({ id: 'index.finance.title', defaultMessage: 'Finances' })} to="/" />

      {isEmpty ? (
        <EmptySection
          buttonText={intl.formatMessage({
            id: 'index.finance.manage.button',
            defaultMessage: 'Manage finances'
          })}
          buttonLink="/"
          textTitle={intl.formatMessage({
            id: 'index.finance.manage.title',
            defaultMessage: 'Track and manage spending'
          })}
          text={intl.formatMessage({
            id: 'index.finance.manage.description',
            defaultMessage: 'View statistics and tips based on other households to cooperate your finances successfully'
          })}
        />
      ) : (
        renderContent()
      )}
    </>
  );
};
