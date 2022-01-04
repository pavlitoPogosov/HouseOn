import React from 'react';
import { useIntl } from 'react-intl';

import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { IWizardStepProps } from '../WizardPage';

import s from './styles.module.scss';

export interface AdvancedStepProps {}

export const AdvancedStep: React.FC<IWizardStepProps> = ({
  loading,
  error,
  onPrevPage,
  onCompleteWizard,
  onFirstProjectOpen
}) => {
  const intl = useIntl();

  return (
    <div>
      <Text variant={TextPropsVariantsEnum.H1} className={s.Step__title}>
        {intl.formatMessage({
          id: 'wizard.step.advanced.title',
          defaultMessage: 'Your house is made!'
        })}
      </Text>

      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary" className={s.Step__text}>
        {intl.formatMessage({
          id: 'wizard.step.advanced.description',
          defaultMessage: 'You can go to your house or switch up a project “General cleaning”'
        })}
      </Text>

      <div className={s.Step__cardWrapper}>
        <div className={s.Step__cardImage} />

        {/* FIX add real project link */}
        <div className={s.Step__cardContent}>
          <h6>General cleaning</h6>

          <p>Organize the cleaning process automatically and reduce time and finance spending</p>

          <NavigationLink as="div" onClick={onFirstProjectOpen} isUnderline>
            {intl.formatMessage({
              id: 'wizard.step.advanced.button.start',
              defaultMessage: ' Start this project'
            })}
          </NavigationLink>
        </div>
      </div>

      <div className={s.Step__buttonsWrapper}>
        <Button color="green" variant="secondary" className={s.Step__backBtn} onClick={onPrevPage} disabled={loading}>
          {intl.formatMessage({ id: 'app.button.back', defaultMessage: 'Back' })}
        </Button>

        <Button color="green" className={s.Step__bigNextBtn} onClick={onCompleteWizard} isLoading={loading}>
          {intl.formatMessage({
            id: 'wizard.step.advanced.button.thanks',
            defaultMessage: 'Thanks! Let’s manage my house'
          })}
        </Button>
      </div>

      <ErrorMessage
        className={s.Step__error}
        error={
          error &&
          intl.formatMessage({
            id: 'app.error.text',
            defaultMessage: 'Something went wrong. Please, try again'
          })
        }
      />
    </div>
  );
};
