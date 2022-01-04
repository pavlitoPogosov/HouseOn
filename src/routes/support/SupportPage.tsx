import React from 'react';
import { useIntl } from 'react-intl';

import { appHistory } from 'appHistory';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';

import { SupportPageForm, CONTACT_SUPPORT_INITIAL_VALUES } from './SupportPageForm/SupportPageForm';

import s from './SupportPage.module.scss';

export interface SupportPageProps {}

export const SupportPage: React.FC<SupportPageProps> = () => {
  const { goBack } = appHistory;
  const shouldAdapt = useMediaQuery('(max-width: 992px)');

  const intl = useIntl();

  const handleFormSubmit = (values: typeof CONTACT_SUPPORT_INITIAL_VALUES) => {};

  const onGoBack = () => {
    goBack();
  };

  return (
    <CenteredPageLayout>
      <div className={s.SupportPage_header}>
        <IconCircle
          className={s.SupportPage__goBack}
          height={32}
          icon={<ArrowIcon />}
          onClick={onGoBack}
          shadow="m"
          width={32}
        />

        <Text text="Contact support" variant={!shouldAdapt ? TextPropsVariantsEnum.H2 : TextPropsVariantsEnum.BODY_L} />
      </div>

      <SupportPageForm onSubmit={handleFormSubmit} />

      <div className={s.SupportPage__footer}>
        <Text
          className={s.SupportPage__text}
          text={intl.formatMessage({
            defaultMessage: 'About the app',
            id: 'support.title'
          })}
          variant={TextPropsVariantsEnum.H3}
        />

        <Text
          className={s.SupportPage__text}
          text={intl.formatMessage({
            defaultMessage:
              'You are using V1.0 apps. If you have any questions requests or Suggestions write to us at house@on.com or submit the form below.',
            id: 'suppoert.hint'
          })}
          variant={TextPropsVariantsEnum.BODY_M}
        />

        <NavigationLink
          as="div"
          text={intl.formatMessage({ defaultMessage: 'Go to the site', id: 'support.button.back' })}
        />
      </div>
    </CenteredPageLayout>
  );
};
