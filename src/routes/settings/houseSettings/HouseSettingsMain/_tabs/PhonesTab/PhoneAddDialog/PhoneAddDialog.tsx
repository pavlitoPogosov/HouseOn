import React, { useRef } from 'react';

import { FormikProps } from 'formik';

import { PhoneAddForm } from 'common/components/ui/_forms/PhoneAddForm/PhoneAddForm';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ContactType } from 'graphql/types';
import { submitFormikFormWithRef } from 'utils/formikUtils';

import s from './PhoneAddDialog.module.scss';

export interface PhoneAddDialogProps {
  formik: FormikProps<{ contacts: ContactType[] }>;
  isOpen: boolean;

  onClose: () => void;
}

export const PhoneAddDialog: React.FC<PhoneAddDialogProps> = ({ formik, isOpen, onClose }) => {
  const formikRef = useRef<FormikProps<{ phones: ContactType[] }>>();

  const handleSave = () => {
    submitFormikFormWithRef(formikRef, (values: { phones: ContactType[] }) => {
      formik.setValues({
        contacts: [...formik.values.contacts, ...values.phones]
      });

      onClose();
    });
  };

  return (
    <Dialog
      title="Add phones"
      icon={ColorfulIconTypes.PHONE}
      isOpen={isOpen}
      onClose={onClose}
      onClickCancelBtn={onClose}
      onClickSaveBtn={handleSave}>
      <PhoneAddForm ref={formikRef} formClassname={s.PhoneAddDialog__form} />
    </Dialog>
  );
};
