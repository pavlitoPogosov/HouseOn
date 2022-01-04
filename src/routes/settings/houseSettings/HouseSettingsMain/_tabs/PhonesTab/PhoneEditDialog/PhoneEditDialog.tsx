import React, { useRef } from 'react';

import { FormikProps } from 'formik';

import { PhoneEditForm } from 'common/components/ui/_forms/PhoneEditForm/PhoneEditForm';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ContactType } from 'graphql/types';
import { submitFormikFormWithRef } from 'utils/formikUtils';

export interface PhoneEditDialogProps {
  formik: FormikProps<{ contacts: (ContactType & { toEdit?: boolean })[] }>;
}

export const PhoneEditDialog: React.FC<PhoneEditDialogProps> = ({ formik }) => {
  const formikRef = useRef<FormikProps<ContactType> | null>(null);
  const contactToEdit = formik.values.contacts.find((c) => c.toEdit);

  const handleClose = () => {
    formik.setValues({
      contacts: formik.values.contacts.map((c) => ({
        ...c,
        toEdit: false
      }))
    });
  };

  const handleEditContact = () => {
    submitFormikFormWithRef(formikRef, (newContact: ContactType) => {
      formik.setValues({
        contacts: formik.values.contacts.map((c) => {
          if (c === contactToEdit) {
            return {
              ...newContact,
              toEdit: false
            };
          }

          return c;
        })
      });
    });
  };

  return (
    <Dialog
      title="Edit phone"
      onClose={handleClose}
      isOpen={!!contactToEdit}
      icon={ColorfulIconTypes.PHONE}
      onClickSaveBtn={handleEditContact}
      onClickCancelBtn={handleClose}>
      {contactToEdit && <PhoneEditForm phone={contactToEdit} ref={formikRef} />}
    </Dialog>
  );
};
