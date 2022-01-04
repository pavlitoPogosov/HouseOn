import React, {
  useEffect,
  useMemo,
  useRef,
  useState, 
} from 'react';
import {
  FormattedMessage,
  useIntl, 
} from 'react-intl';

import clsx from 'clsx';
import {
  FormikProps,
  useFormikContext, 
} from 'formik';

import { useApolloClient } from '@apollo/client';
import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Alert } from 'common/components/ui/Alert/Alert';
import { Button } from 'common/components/ui/Button';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { PhoneBlock } from 'common/components/ui/PhoneBlock/PhoneBlock';
import {
  Text,
  TextPropsVariantsEnum, 
} from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { useUpdateHouseContacts } from 'graphql/hooks/house';
import { QUERY_HOUSE_CONTACTS } from 'graphql/queries/house';
import {
  ContactType,
  Maybe, 
} from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';

import { TEventData } from '../../types';
import { EventFormFields } from '../EventForm';

import { EventFormContactsModal } from './EventFormContactsModal';

import s from './_styles.module.scss';

export enum EventFormContactsModalTypes {
  ADD = 'ADD',
  VIEW = 'VIEW',
}

type TEventFormContactsBlock = {
  houseContacts?: Maybe<ContactType[]> | undefined;
};

export const EventFormContactsBlock: React.FC<TEventFormContactsBlock> = props => {
  const { houseContacts } = props;

  const {
    setValues,
    values,
  } = useFormikContext<TEventData>();

  const formContacts = values[EventFormFields.CONTACTS];

  const intl = useIntl();

  const modalToggler = useToggle();
  const alertToggler = useToggle();
  const dispatch = useTypedDispatch();
  const [ modalType, setModalType ] = useState<EventFormContactsModalTypes | null>(null);
  const [ isAdditional, setAdditional ] = useState<boolean>(false);
  const { cache } = useApolloClient();

  const {
    data: contactsData,
    loading: isQueryLoading,
  } = useQueryWithError<{ result: ContactType[] }, {}>(QUERY_HOUSE_CONTACTS);

  const [ updateHouseContacts, { loading: updatingContacts } ] = useUpdateHouseContacts({
    onCompleted({ result }) {
      cache.writeQuery({
        data: { result },
        query: QUERY_HOUSE_CONTACTS,
      });

      dispatch(createToast({
        dismissTimeout: 3000,
        text: intl.formatMessage({
          defaultMessage: 'You can see this information on the home ownership page',
          id: 'event.form.contacts.success.text',
        }),
        title: intl.formatMessage({
          defaultMessage: 'Information saved',
          id: 'event.form.contacts.success.title',
        }),
      }));

      alertToggler.unset();
    },
    onError() {
      dispatch(createToast({
        text: DEFAULT_ERROR_MESSAGE,
        title: 'Oops!',
        type: 'error',
      }));
    },
  });

  const isContacts = !!contactsData?.result.length;

  const handlePhoneDelete = (deletedIndex: number) => {
    return () => {
      setValues({
        ...values,
        [EventFormFields.CONTACTS]: formContacts?.filter((_, i) => i !== deletedIndex),
      });
      alertToggler.set();
    };
  };

  const handleModalOpen = (type: EventFormContactsModalTypes) => {
    return () => {
      setModalType(type);
      modalToggler.set();
    };
  };

  const addFormRef = useRef<FormikProps<{
    phones: { comment: string; name: string; phone: string }[];
  }> | null>(null);

  const [ selectedPhones, setSelectedPhones ] = useState<ContactType[]>([]);

  const contacts = useMemo(() => {
    return isContacts
      ? [ {
        cells: contactsData?.result,
        title: 'Contacts from current House',
      } ]
      : [];
  }, [ contactsData ]);

  const handleSave = () => {
    const prevPhones = values[EventFormFields.CONTACTS];

    if (modalType === EventFormContactsModalTypes.ADD) {
      addFormRef.current?.validateForm().then(errors => {
        if (!Object.keys(errors).length && addFormRef.current) {
          setValues({
            ...values,
            [EventFormFields.CONTACTS]: [ ...prevPhones, ...addFormRef.current.values.phones ],
          });
          modalToggler.unset();
        }
      });
    }

    if (modalType === EventFormContactsModalTypes.VIEW) {
      setValues({
        ...values,
        [EventFormFields.CONTACTS]: [ ...prevPhones, ...selectedPhones ],
      });

      modalToggler.unset();
      setSelectedPhones([]);
    }
  };

  const handleUpdate = () => {
    if (updatingContacts) return;

    const newContacts: ContactType[] = values[EventFormFields.CONTACTS]?.map(c => {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        additional_info,
        id,
        phone,
        title,
      } = c;

      return {
        additional_info,
        id,
        phone,
        title,
      } as ContactType;
    });

    updateHouseContacts({ variables: { input: { contacts: newContacts } } });
  };

  const shouldAdapt = useMediaQuery('(max-width: 576px)');

  useEffect(() => {
    const isFormContacts = !!formContacts?.length;
    const isHouseContacts = !!houseContacts?.length;

    const formContactsIdArr = formContacts?.map(c => c.id);
    const isNotUsedHouseContacts = houseContacts?.find(hc => !formContactsIdArr.includes(hc.id));

    let isAdditionalContacts = false;

    if ((!isFormContacts && isHouseContacts) || isNotUsedHouseContacts) {
      isAdditionalContacts = true;
    }

    if (isAdditionalContacts && !isAdditional) {
      setAdditional(true);
    } else if (!isAdditionalContacts && isAdditional) {
      setAdditional(false);
    }

    if (formContacts.length) {
      const isNotExists = formContacts.find(fc => {
        if (!houseContacts?.length) {
          return true;
        }

        return houseContacts.find(hc => hc.id !== fc.id);
      });

      if (isNotExists) {
        alertToggler.set();
      }
    }
  }, [
    houseContacts,
    formContacts,
    selectedPhones, 
  ]);

  return (
    <>
      <Text
        className={s.EventForm__title}
        text={intl.formatMessage({ defaultMessage: 'Contact numbers', id: 'event.form.contacts.title' })}
        variant={TextPropsVariantsEnum.H3}
      />

      {
        values[EventFormFields.CONTACTS].map((selectedPhone, i) => (
          <PhoneBlock
            additionalInfo={selectedPhone.additional_info as string}
            containerClassName={s.EventForm__phone}
            disableCopy
            disableHover
            key={String(selectedPhone.phone) + i}
            onDelete={handlePhoneDelete(i)}
            phone={selectedPhone.phone as string}
            title={selectedPhone.title as string}
          />
        ))
      }

      <div className={s.EventForm__contactsBtns}>
        <NavigationLink
          as="div"
          className={s.EventForm__contactsLink}
          color="green"
          icon={<PlusIcon />}
          isUnderline
          onClick={handleModalOpen(EventFormContactsModalTypes.ADD)}
        >
          <FormattedMessage
            defaultMessage="Add another one"
            id="event.form.contacts.link.add"
          />
        </NavigationLink>

        {
          isContacts &&
          isAdditional &&
          (shouldAdapt ? (
            <Button
              className={s.EventForm__contactsBtn}
              color="green"
              leftIcon={<ClipIcon />}
              onClick={handleModalOpen(EventFormContactsModalTypes.VIEW)}
              type="button"
              variant="secondary"
            >
              <FormattedMessage
                defaultMessage="Add from contacts"
                id="event.form.contacts.button.addFromContacts"
              />
            </Button>
          ) : (
            <NavigationLink
              as="div"
              className={s.EventForm__contactsLink}
              iconLeft={<ClipIcon />}
              isUnderline
              onClick={handleModalOpen(EventFormContactsModalTypes.VIEW)}
            >
              <FormattedMessage
                defaultMessage="Add from contacts"
                id="event.form.contacts.link.addFromContacts"
              />
            </NavigationLink>
          ))
        }
      </div>

      {
        alertToggler.value && (
          <Alert
            containerClassName={s.EventForm__alert}
            onClose={alertToggler.unset}
            text={
              intl.formatMessage({
                defaultMessage: 'Do you want to save the entered information as the main for your home?',
                id: 'event.form.alert.save',
              })
            }
          >
            <NavigationLink
              as="div"
              className={clsx(s.EventForm__contactsLink, s.marginRight)}
              isUnderline
              onClick={handleUpdate}
              text={intl.formatMessage({ defaultMessage: 'Save information', id: 'event.form.navigationLink.save' })}
            />

            <NavigationLink
              as="div"
              className={s.EventForm__contactsLink}
              isUnderline
              onClick={alertToggler.unset}
              text={intl.formatMessage({ defaultMessage: 'Not now', id: 'event.form.navigationLink.cancel' })}
            />
          </Alert>
        )
      }

      <EventFormContactsModal
        addFormRef={addFormRef}
        contacts={contacts}
        handleSave={handleSave}
        isOpen={modalToggler.value}
        modalType={modalType}
        onClose={modalToggler.unset}
        selectedPhones={selectedPhones}
        setSelectedPhones={setSelectedPhones}
      />
    </>
  );
};
