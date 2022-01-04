import React from 'react';
import ContentLoader from 'react-content-loader';

import { useFormik } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { PhoneBlock } from 'common/components/ui/PhoneBlock/PhoneBlock';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useGetHouseContacts } from 'graphql/hooks/house';
import { MUTATION_UPDATE_HOUSE_CONTACTS } from 'graphql/mutations/house';
import { ContactType, UpdateHouseContactsInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import { SubmitBtn } from '../_SubmitBtn/SubmitBtn';
import { SubmitBtnSkeleton } from '../_SubmitBtn/SubmitBtnSkeleton';
import { TabContainer } from '../_TabContainer/TabContainer';

import { PhoneAddDialog } from './PhoneAddDialog/PhoneAddDialog';
import { PhoneEditDialog } from './PhoneEditDialog/PhoneEditDialog';

import s from './PhonesTab.module.scss';

export const PhonesTab: React.FC<unknown> = () => {
  const dispatch = useTypedDispatch();

  const { data: contactsResp, loading: loadingContacts } = useGetHouseContacts();
  const [updateContacts, { loading: updatingContacts }] = useMutationWithError<
    { result: ContactType[] },
    { input: UpdateHouseContactsInput }
  >(MUTATION_UPDATE_HOUSE_CONTACTS, {
    onCompleted() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: 'Contacts updated',
          title: 'Success'
        })
      );
    },
    onError() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: 'Something went wrong. Please, try again',
          title: 'Oops!',
          type: 'error'
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

  const handleSubmit = (values: { contacts: ContactType[] }) => {
    updateContacts({
      variables: {
        input: {
          contacts: values.contacts.map((p) => ({
            additional_info: p.additional_info,
            id: p.id,
            phone: p.phone,
            title: p.title
          }))
        }
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { contacts: (contactsResp?.result || []) as (ContactType & { toEdit?: boolean })[] },
    onSubmit: handleSubmit
  });
  const phoneAddToggler = useToggle();

  const handleContactDelete = (index: number) => {
    return () => {
      formik.setValues({ contacts: formik.values.contacts.filter((c, i) => i !== index) });
    };
  };

  const handleContactEdit = (index: number) => {
    return () => {
      formik.setValues({
        contacts: formik.values.contacts.map((c, i) => {
          if (i === index) {
            return {
              ...c,
              toEdit: true
            };
          }

          return c;
        })
      });
    };
  };

  const renderContent = () => {
    if (loadingContacts) {
      return (
        <>
          {new Array(3).fill(1).map((_, i) => (
            <ContentLoader
              className={s.PhoneTab__phoneBlock}
              height="50"
              key={i}
              preserveAspectRatio="none"
              viewBox="0 0 100 50"
              width="100%">
              <rect height="50" rx="0" ry="0" width="300" x="0" y="0" />
            </ContentLoader>
          ))}

          <SubmitBtnSkeleton />
        </>
      );
    }

    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.contacts.map((c, i) => (
            <PhoneBlock
              additionalInfo={c.additional_info || ''}
              containerClassName={s.PhoneTab__phoneBlock}
              disableHover
              key={i}
              onDelete={handleContactDelete(i)}
              onEdit={handleContactEdit(i)}
              phone={c.phone}
              title={c.title}
            />
          ))}

          <div>
            <NavigationLink
              isUnderline
              as="div"
              icon={<ClipIcon />}
              text={formik.values.contacts.length ? 'Add more' : 'Add'}
              onClick={phoneAddToggler.toggle}
            />
          </div>

          <SubmitBtn isLoading={updatingContacts} />
        </form>

        <PhoneEditDialog formik={formik} />

        <PhoneAddDialog formik={formik} isOpen={phoneAddToggler.value} onClose={phoneAddToggler.unset} />
      </>
    );
  };

  return <TabContainer>{renderContent()}</TabContainer>;
};
