import React from 'react';
import { useIntl } from 'react-intl';

import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { PRIVACY_POLICY_ROUTE } from 'utils/routes';

import { OverlayTooltip } from '../OverlayTooltip/OverlayTooltip';

import s from './SafetyTooltip.module.scss';

export interface SafetyTooltipProps {}

export const SafetyTooltip: React.FC<SafetyTooltipProps> = () => {
  const intl = useIntl();

  const TOOLTIPS_ITEMS = [
    {
      text: intl.formatMessage({
        id: 'wizard.safety.tooltip.text',
        defaultMessage:
          'We care about the safety of our users and do not store your personal data and information about the house.'
      }),
      linkText: intl.formatMessage({
        id: 'app.route.privacyPolicy',
        defaultMessage: 'Privacy policy'
      }),
      linkHref: PRIVACY_POLICY_ROUTE
    },
    {
      text: intl.formatMessage({
        id: 'wizard.safety.processes.text',
        defaultMessage:
          'All processes take place without your participation. The system adjusts to you and helps to automate routine processes'
      })
    },
    {
      text: intl.formatMessage({
        id: 'wizard.safety.personalDataInformation.text',
        defaultMessage:
          'We care about the safety of our users and do not store your personal data and information about the house.'
      })
    }
  ];

  const renderSafetyContent = () => (
    <div className={s.SafetyTooltip__content}>
      {TOOLTIPS_ITEMS.map((item, i) => (
        <div key={i} className={s.SafetyTooltip__item}>
          <Text text={item.text} variant={TextPropsVariantsEnum.BODY_L} />

          {item.linkText && (
            <NavigationLink as="div" isUnderline className={s.SafetyTooltip__href} target="_blank" rel="noreferrer">
              {item.linkText}
            </NavigationLink>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <OverlayTooltip
      offset={[198, 20]}
      linkCmp={<NavigationLink isUnderline>Why is it safe?</NavigationLink>}
      content={renderSafetyContent()}
      tooltipHeaderText={intl.formatMessage({
        id: 'wizard.safety.why',
        defaultMessage: 'Why is it safe?'
      })}
    />
  );
};
