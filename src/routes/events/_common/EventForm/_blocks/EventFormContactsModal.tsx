import React from 'react';
import { useIntl } from 'react-intl';

import { FormikProps, useFormikContext } from 'formik';

import { PhoneAddForm } from 'common/components/ui/_forms/PhoneAddForm/PhoneAddForm';
import { PhoneSelectForm } from 'common/components/ui/_forms/PhoneSelectForm/PhoneSelectForm';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ContactType } from 'graphql/types';

import { TEventData } from '../../types';
import { EventFormFields } from '../EventForm';

import { EventFormContactsModalTypes } from './EventFormContactsBlock';

export type TContacts = { cells: ContactType[]; title: string }[];

export interface IEventFormContactsModalProps {
  addFormRef: React.MutableRefObject<FormikProps<{
    phones: { comment: string; name: string; phone: string }[];
  }> | null>;
  contacts: TContacts | undefined;
  handleSave: () => void;
  isOpen: boolean;
  modalType: EventFormContactsModalTypes | null;
  onClose: () => void;
  selectedPhones: ContactType[] | [];
  setSelectedPhones: React.Dispatch<React.SetStateAction<ContactType[]>>;
}

export const EventFormContactsModal = (props: IEventFormContactsModalProps): JSX.Element => {
  const { addFormRef, contacts, handleSave, isOpen, modalType, onClose, selectedPhones, setSelectedPhones } = props;

  const { values } = useFormikContext<TEventData>();
  const intl = useIntl();

  return (
    <Dialog
      icon={ColorfulIconTypes.PHONE}
      isOpen={isOpen}
      onClickCancelBtn={onClose}
      onClickSaveBtn={handleSave}
      onClose={onClose}
      saveBtnText={intl.formatMessage({ defaultMessage: 'Add numbers', id: 'event.form.addNumbers' })}
      title="Phones">
      {modalType === EventFormContactsModalTypes.ADD ? (
        <PhoneAddForm ref={addFormRef} />
      ) : (
        <PhoneSelectForm
          contacts={contacts}
          hiddenPhones={values[EventFormFields.CONTACTS] as ContactType[]}
          selectedPhones={selectedPhones}
          setSelectedPhones={setSelectedPhones}
        />
      )}
    </Dialog>
  );
};
