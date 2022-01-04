import React from 'react';
import { useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import { HelpTextTooltip } from '../_tooltips/HelpTextTooltip/HelpTextTooltip';
import { IWizardStepProps } from '../WizardPage';

import s from './styles.module.scss';

export interface NameStepProps {
  onNextPage: any;
}

enum InputNames {
  HOUSE_NAME = 'title'
}

const FORM_INITIAL_VALUES = {
  [InputNames.HOUSE_NAME]: ''
};

const FORM_VALIDATION_SHEMA = Yup.object().shape({
  [InputNames.HOUSE_NAME]: REQUIRED_FIELD_VALIDATION
});

export const NameStep: React.FC<IWizardStepProps> = ({ onSubmit, savedValues }) => {
  const intl = useIntl();

  const handleSubmit = (values: typeof FORM_INITIAL_VALUES) => {
    // TODO save values
    onSubmit(values, 'forward');
  };

  return (
    <div>
      <Text variant={TextPropsVariantsEnum.H1} className={s.Step__title} as="div">
        <div
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({
              id: 'wizard.step.name.title',
              defaultMessage: 'Create a name to&thinsp;make <br /> a house in system'
            })
          }}
        />
      </Text>

      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary" className={s.Step__text} as="div">
        <div
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({
              id: 'wizard.step.name.description',
              defaultMessage:
                'We need any name of your house which you can create, so that we can <br /> make a home profile in the system'
            })
          }}
        />
      </Text>

      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
        For ex. “My Little Cazy House”
      </Text>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{ [InputNames.HOUSE_NAME]: savedValues[InputNames.HOUSE_NAME] || '' }}
        validationSchema={FORM_VALIDATION_SHEMA}
        onSubmit={handleSubmit}>
        <ExtentedForm>
          <InputField
            name={InputNames.HOUSE_NAME}
            fieldContainerProps={{
              label: intl.formatMessage({
                id: 'wizard.step.name.form.houseName.label',
                defaultMessage: 'Name your house'
              }),
              helpTextCmp: (
                <HelpTextTooltip
                  content={intl.formatMessage({
                    id: 'wizard.step.name.tooltip.hint',
                    defaultMessage:
                      'We ask you to come up with a name for the house so that we can name your house in the system. We do not ask for exact data and coordinates of the house, any word will suit us'
                  })}
                />
              ),
              containerClassName: s.Step__input
            }}
            placeholder={intl.formatMessage({
              id: 'wizard.step.name.form.houseName.placeholder',
              defaultMessage: 'Winter House'
            })}
            autoComplete="off"
            autoFocus
          />

          <Button type="submit" color="green" className={s.Step__nameSubmitBtn}>
            {intl.formatMessage({ id: 'app.button.next', defaultMessage: 'Next' })}
          </Button>
        </ExtentedForm>
      </Formik>
    </div>
  );
};
