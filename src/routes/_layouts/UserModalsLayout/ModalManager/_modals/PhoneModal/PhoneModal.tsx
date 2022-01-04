import React, { useRef, useState } from 'react';

import { FormikProps } from 'formik';

import { PhoneAddForm } from 'common/components/ui/_forms/PhoneAddForm/PhoneAddForm';
import { PhoneEditForm } from 'common/components/ui/_forms/PhoneEditForm/PhoneEditForm';
import { ReactPhoneSkeleton } from 'common/components/ui/_skeletons/PhoneBlockSkeleton/PhoneBlockSkeleton';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useGetHouseContacts } from 'graphql/hooks/house';
import { MUTATION_UPDATE_HOUSE_CONTACTS } from 'graphql/mutations/house';
import { ContactType, UpdateHouseContactsInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { submitFormikFormWithRef } from 'utils/formikUtils';

import { PhoneView } from './PhoneView/PhoneView';

import s from './PhoneModal.module.scss';

export interface PhoneModalProps {
  onClose: () => void;
}

enum PhoneModalTypes {
  VIEW_ALL = 'VIEW_ALL',
  ADD = 'ADD'
}
// fix remove toasts from modals
export const PhoneModal: React.FC<PhoneModalProps> = ({ onClose }) => {
  const dispatch = useTypedDispatch();

  const [phoneToEdit, setPhoneToEdit] = useState<ContactType | null>(null);
  const [shownModalType, setShownModalType] = useState(PhoneModalTypes.VIEW_ALL);
  const addFormRef = useRef<FormikProps<{ [key in string]: string }> | null>(null);
  const editFormRef = useRef<FormikProps<{ [key in string]: string }> | null>(null);

  const { data: contactsResp, loading: loadingContacts } = useGetHouseContacts({
    onCompleted({ result }) {
      setShownModalType(result.length ? PhoneModalTypes.VIEW_ALL : PhoneModalTypes.ADD);
    }
  });
  const [updateContacts, { loading: updatingContacts }] = useMutationWithError<
    { result: ContactType[] },
    { input: UpdateHouseContactsInput }
  >(MUTATION_UPDATE_HOUSE_CONTACTS, {
    onCompleted({ result }) {
      setShownModalType(!result.length ? PhoneModalTypes.ADD : PhoneModalTypes.VIEW_ALL);
    },
    onError() {
      dispatch(
        createToast({
          title: 'Oops!',
          text: 'Something went wrong. Please, try again',
          type: 'error',
          dismissTimeout: 3000
        })
      );
    },
    update(cache, req) {
      if (req.data) {
        cache.modify({
          fields: {
            houseContacts() {
              return req.data?.result;
            }
          }
        });
      }
    }
  });

  const currentContacts = (contactsResp?.result || []).map((c) => ({
    id: c.id,
    phone: c.phone,
    title: c.title,
    additional_info: c.additional_info
  }));

  const handleChangeModalType = (modalType: PhoneModalTypes) => {
    return () => setShownModalType(modalType);
  };

  const handleCancelBtnClick = () => {
    if (phoneToEdit) {
      return setPhoneToEdit(null);
    }

    if (shownModalType === PhoneModalTypes.VIEW_ALL) {
      onClose();
    } else {
      contactsResp?.result.length ? setShownModalType(PhoneModalTypes.VIEW_ALL) : onClose();
    }
  };

  const handleSaveBtnClick = async () => {
    if (shownModalType === PhoneModalTypes.ADD) {
      submitFormikFormWithRef(addFormRef, (values: { phones: any }) => {
        updateContacts({
          variables: {
            input: {
              contacts: [...currentContacts, ...values.phones]
            }
          }
        });
      });
    }

    if (phoneToEdit && editFormRef.current) {
      submitFormikFormWithRef(
        editFormRef,
        async (editedPhone: { id: string; house_id: any; phone: any; title: any; additional_info: any }) => {
          await updateContacts({
            variables: {
              input: {
                contacts: [
                  ...currentContacts.map((p) => {
                    if (p.id === editedPhone.id) {
                      return {
                        id: editedPhone.id,
                        house_id: editedPhone.house_id,
                        phone: editedPhone.phone,
                        title: editedPhone.title,
                        additional_info: editedPhone.additional_info
                      };
                    }

                    return p;
                  })
                ]
              }
            }
          });

          setPhoneToEdit(null);
        }
      );
    }
  };

  const handlePhoneDelete = (phone: ContactType) => {
    updateContacts({
      variables: {
        input: {
          contacts: currentContacts.filter(({ id }) => id !== phone.id)
        }
      }
    });
  };

  const renderContent = () => {
    if (loadingContacts) {
      return (
        <>
          <ReactPhoneSkeleton containerClassName={s.PhoneModal__skeleton} />
          <ReactPhoneSkeleton containerClassName={s.PhoneModal__skeleton} />
          <ReactPhoneSkeleton containerClassName={s.PhoneModal__skeleton} />
        </>
      );
    }

    if (shownModalType === PhoneModalTypes.ADD) {
      return <PhoneAddForm ref={addFormRef} formClassname={s.PhoneModal__form} />;
    }

    if (phoneToEdit) {
      return <PhoneEditForm ref={editFormRef} phone={phoneToEdit} />;
    }

    return (
      <PhoneView phones={contactsResp?.result || []} onDeletePhone={handlePhoneDelete} onEditPhone={setPhoneToEdit} />
    );
  };

  const cancelBtnText = shownModalType === PhoneModalTypes.VIEW_ALL && !phoneToEdit ? 'Close' : 'Cancel';
  const headerBtnText = shownModalType === PhoneModalTypes.VIEW_ALL ? 'Add new' : '';
  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.PHONE}
      headerBtnText={headerBtnText}
      onClickHeaderBtn={
        shownModalType === PhoneModalTypes.VIEW_ALL ? handleChangeModalType(PhoneModalTypes.ADD) : undefined
      }
      title="Phones"
      onClose={onClose}
      cancelBtnText={cancelBtnText}
      onClickCancelBtn={handleCancelBtnClick}
      onClickSaveBtn={shownModalType === PhoneModalTypes.VIEW_ALL && !phoneToEdit ? undefined : handleSaveBtnClick}
      isLoading={updatingContacts}>
      {renderContent()}
    </Dialog>
  );
};
