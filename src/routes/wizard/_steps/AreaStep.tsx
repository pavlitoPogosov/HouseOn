import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { AreaInputField } from 'common/components/ui/_formikComponents/AreaInputField/AreaInputField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { Button } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { FloorSpaceUnitsEnum } from 'graphql/types';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import { HelpTextTooltip } from '../_tooltips/HelpTextTooltip/HelpTextTooltip';
import { IWizardStepProps } from '../WizardPage';

import s from './styles.module.scss';

enum InputNames {
  SPACE = 'area',
  SPACE_METRICS = 'area_metric'
}

const FORM_INITIAL_VALUES = {
  [InputNames.SPACE]: '',
  [InputNames.SPACE_METRICS]: FloorSpaceUnitsEnum.Meter
};

const FORM_VALIDATION_SHEMA = Yup.object().shape({
  [InputNames.SPACE]: REQUIRED_FIELD_VALIDATION
});

export const AreaStep: React.FC<IWizardStepProps> = ({ savedValues, onSubmit }) => {
  const formikRef = useRef<FormikProps<typeof FORM_INITIAL_VALUES> | null>(null);

  const intl = useIntl();

  const handleStepForward = (values: typeof FORM_INITIAL_VALUES) => {
    onSubmit(values, 'forward');
  };

  const handleStepBack = () => {
    formikRef.current
      ?.validateForm()
      .then((errors) => {
        if (!Object.keys(errors).length) {
          if (formikRef.current) {
            onSubmit(formikRef.current.values, 'back');
          }
        }
      })
      .catch(() => {});
  };

  return (
    <div>
      <Text variant={TextPropsVariantsEnum.H1} className={s.Step__title} as="div">
        <div
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({
              id: 'wizard.step.area.title',
              defaultMessage: 'Enter the approximate&thinsp;area <br /> to set up the system'
            })
          }}
        />
      </Text>

      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary" className={s.Step__text} as="div">
        <div
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({
              id: 'wizard.step.area.text',
              defaultMessage:
                'In order to customize our recommendations for home care and other <br /> activities, write an approximate floor space'
            })
          }}
        />
      </Text>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          [InputNames.SPACE]: savedValues.area || FORM_INITIAL_VALUES[InputNames.SPACE],
          [InputNames.SPACE_METRICS]: savedValues.area_metric || FORM_INITIAL_VALUES[InputNames.SPACE_METRICS]
        }}
        validationSchema={FORM_VALIDATION_SHEMA}
        innerRef={formikRef}
        onSubmit={handleStepForward}>
        <ExtentedForm>
          <AreaInputField
            name={InputNames.SPACE}
            areaMetricName={InputNames.SPACE_METRICS}
            fieldContainerProps={{
              label: intl.formatMessage({
                id: 'wizard.step.area.form.space.label',
                defaultMessage: 'Total floor space'
              }),
              helpTextCmp: (
                <HelpTextTooltip
                  content={intl.formatMessage({
                    id: 'wizard.step.area.tooltip.hint',
                    defaultMessage:
                      'Write the approximate area of the house so that the system can estimate the time and effort needed to manage the house'
                  })}
                />
              ),
              containerClassName: s.Step__input
            }}
            placeholder={`${intl.formatMessage({
              id: 'wizard.step.area.form.space.placeholder',
              defaultMessage: 'About 50m'
            })}`}
            type="number"
            autoComplete="off"
            autoFocus
          />

          <div className={s.Step__buttonsWrapper}>
            <Button
              color="green"
              variant="secondary"
              type="button"
              className={s.Step__backBtn}
              onClick={handleStepBack}>
              {intl.formatMessage({ id: 'app.button.back', defaultMessage: 'Back' })}
            </Button>

            <Button type="submit" color="green" className={s.Step__nextBtn}>
              {intl.formatMessage({ id: 'app.button.next', defaultMessage: 'Next' })}
            </Button>
          </div>
        </ExtentedForm>
      </Formik>
    </div>
  );
};
