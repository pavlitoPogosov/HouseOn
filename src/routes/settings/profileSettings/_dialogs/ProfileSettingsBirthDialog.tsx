import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './_styles.module.scss';

export interface ProfileSettingsBirthDialogProps {
  onClose: () => void;
  onChangeBirth: (value: string) => void;
}

export const ProfileSettingsBirthDialog: React.FC<ProfileSettingsBirthDialogProps> = ({ onClose, onChangeBirth }) => {
  const handleSubmit = ({ birthday }: { birthday: string }) => {
    onChangeBirth(birthday);
    onClose();
  };

  return (
    <Dialog isOpen icon={ColorfulIconTypes.STARS} title="Change date of birth" onClose={onClose} maxWidth={424}>
      <Formik
        initialValues={{ birthday: '' }}
        validationSchema={Yup.object().shape({ birthday: REQUIRED_FIELD_VALIDATION })}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}>
        <ExtentedForm disableScrollToError>
          <InputField
            name="birthday"
            fieldContainerProps={{
              label: 'New date of birth',
              containerClassName: s.ProfileSettingsDialog__inputContainer
            }}
          />

          <div className={s.ProfileSettingsDialog__footer}>
            <Button className={s.ProfileSettingsDialog__singleBtn} type="submit" color="orange" size="s">
              Confirm
            </Button>
          </div>
        </ExtentedForm>
      </Formik>
    </Dialog>
  );
};
