import React from 'react';
import { useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { Button } from 'common/components/ui/Button';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './RewardDialog.module.scss';

export enum AddRewardFormFieldNames {
  REWARD = 'reward',
  CURRENCY = 'currency'
}

export const ADD_REWARD_FORM_INITIAL_VALUES = {
  [AddRewardFormFieldNames.REWARD]: '',
  [AddRewardFormFieldNames.CURRENCY]: ''
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [AddRewardFormFieldNames.REWARD]: REQUIRED_FIELD_VALIDATION,
  [AddRewardFormFieldNames.CURRENCY]: REQUIRED_FIELD_VALIDATION
});

const CURRENCY_SELECT_FIELD_OPTIONS: ISelectPrimaryOption[] = [
  { text: 'USD', value: 'USD' },
  { text: 'EUR', value: 'EUR' }
];

export interface RewardDialogProps {
  isOpen: boolean;
  isLoading: boolean;

  onClose: () => void;
  onAddReward: (values: typeof ADD_REWARD_FORM_INITIAL_VALUES) => void;
}

export const RewardDialog: React.FC<RewardDialogProps> = ({ isOpen, isLoading, onClose, onAddReward }) => {
  const intl = useIntl();

  return (
    <Dialog
      title={intl.formatMessage({ id: 'houseTeam.finance.reward.add.title', defaultMessage: 'Add reward' })}
      isOpen={isOpen}
      onClose={onClose}>
      <Formik
        initialValues={ADD_REWARD_FORM_INITIAL_VALUES}
        validationSchema={FORM_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onAddReward}>
        {({ values }) => (
          <div className={s.RewardDialog}>
            <ExtentedForm className={s.RewardDialog__form}>
              <InputField
                name={AddRewardFormFieldNames.REWARD}
                placeholder="1000"
                type="number"
                fieldContainerProps={{
                  label: intl.formatMessage({
                    id: 'houseTeam.finance.reward.form.reward.label',
                    defaultMessage: 'Reward'
                  }),
                  containerClassName: s.RewardDialog__input
                }}
              />
              <SelectUsualField
                name={AddRewardFormFieldNames.CURRENCY}
                fieldContainerProps={{ containerClassName: s.RewardDialog__input }}
                options={CURRENCY_SELECT_FIELD_OPTIONS}
                label={intl.formatMessage({
                  id: 'houseTeam.finance.reward.form.currency.label',
                  defaultMessage: 'Currency'
                })}
              />
            </ExtentedForm>
            <div className={s.RewardDialog__footer}>
              <Button
                onClick={onClose}
                color="orange"
                variant="secondary"
                className={s.RewardDialog__cancelBtn}
                disabled={isLoading}
                size="s">
                {intl.formatMessage({ id: 'app.cancel', defaultMessage: 'Cancel' })}
              </Button>
              <Button
                onClick={() => onAddReward(values)}
                color="orange"
                className={s.RewardDialog__saveBtn}
                isLoading={isLoading}
                size="s">
                {intl.formatMessage({
                  id: 'houseTeam.finance.reward.add.title',
                  defaultMessage: 'Add reward'
                })}
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </Dialog>
  );
};
