import React, {
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import {
  Formik,
  FormikProps,
} from 'formik';
import { uniqBy } from 'lodash';
import * as Yup from 'yup';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { PhoneField } from 'common/components/ui/_formikComponents/PhoneField/PhoneField';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { ContactType } from 'graphql/types';
import {
  PHONE_FIELD_VALIDATION,
  REQUIRED_FIELD_VALIDATION,
} from 'utils/formValidation/validationFields';
import { mergeRefs } from 'utils/mergeRefs';

import { ColorfulIconTypes } from '../../ColorfulIcon/ColorfulIcon';
import { Dialog } from '../../Dialog/Dialog';
import { PhoneSelectForm } from '../PhoneSelectForm/PhoneSelectForm';

import s from './PhoneAddForm.module.scss';

enum PhoneAddFormInputNames {
  ADDITIONAL_INFO = 'additional_info',
  PHONE = 'phone',
  TITLE = 'title',
}

interface IFormPhone {
  [PhoneAddFormInputNames.ADDITIONAL_INFO]: string;
  [PhoneAddFormInputNames.PHONE]: string;
  [PhoneAddFormInputNames.TITLE]: string;
}

export const PHONE_ADD_FORM_INITIAL_VALUES = [ {
  [PhoneAddFormInputNames.ADDITIONAL_INFO]: '',
  [PhoneAddFormInputNames.PHONE]: '',
  [PhoneAddFormInputNames.TITLE]: '',
} ];

export const PHONE_ADD_FORM_INITIAL_TOUCHED = {
  phones: [ {
    [PhoneAddFormInputNames.ADDITIONAL_INFO]: true,
    [PhoneAddFormInputNames.PHONE]: true,
    [PhoneAddFormInputNames.TITLE]: true,
  } ],
};

export const PHONE_ADD_VALIDATION_SCHEMA = Yup.object().shape({
  phones: Yup.array().of(Yup.object().shape({
    [PhoneAddFormInputNames.TITLE]: REQUIRED_FIELD_VALIDATION,
    [PhoneAddFormInputNames.PHONE]: PHONE_FIELD_VALIDATION,
  })),
});

export interface IPhoneAddFormProps {
  formClassname?: string;
  phones?: ContactType[];
  showContactsModal?: boolean;
}

export const PhoneAddForm = React.forwardRef<any, IPhoneAddFormProps>((props, ref) => {
  const formikRef = useRef<FormikProps<{ [key in string]: any }> | null>(null);
  const divToScrollRef = useRef<HTMLDivElement | null>(null);

  const [ selectedPhones, setSelectedPhones ] = useState<ContactType[]>([]);
  const contactsModalToggler = useToggle();

  const handleAddFormClick = () => {
    if (formikRef.current) {
      const {
        touched,
        values,
      } = formikRef.current;

      const newPhoneBlock = {
        [PhoneAddFormInputNames.ADDITIONAL_INFO]: '',
        [PhoneAddFormInputNames.PHONE]: '',
        [PhoneAddFormInputNames.TITLE]: '',
      };

      const phonesValues = [ ...values.phones, newPhoneBlock ];
      const phonesTouched = Object.keys(newPhoneBlock).reduce((accom, key) => ({ ...accom, [key]: true }), {});

      formikRef.current.setValues({
        ...values,
        phones: phonesValues,
      });
      formikRef.current.setTouched({
        ...touched,
        phones: [ ...(touched.phones as []), phonesTouched ],
      });

      setTimeout(() => {
        divToScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  const handleDeleteFormBlock = (index: number) => {
    return () => {
      if (formikRef.current) {
        const {
          setValues,
          values,
        } = formikRef.current;

        if (values.phones.length === 1) {
          return setValues({ phones: PHONE_ADD_FORM_INITIAL_VALUES });
        }

        setValues({
          ...values,
          phones: values.phones.filter((_: any, i: number) => i !== index),
        });
      }
    };
  };

  const handleSavePhonesFromContacts = () => {
    if (formikRef.current) {
      const {
        setValues,
        values,
      } = formikRef.current;

      const newPhones = uniqBy([ ...values.phones, ...selectedPhones ], 'phone') as IFormPhone[];

      const isFirstPhoneEmpty =
        !newPhones[0][PhoneAddFormInputNames.PHONE] &&
        !newPhones[0][PhoneAddFormInputNames.TITLE] &&
        !newPhones[0][PhoneAddFormInputNames.ADDITIONAL_INFO];
      if (isFirstPhoneEmpty) {
        newPhones.shift();
        newPhones.push({
          [PhoneAddFormInputNames.ADDITIONAL_INFO]: '',
          [PhoneAddFormInputNames.PHONE]: '',
          [PhoneAddFormInputNames.TITLE]: '',
        });
      }

      setValues({
        ...values,
        phones: newPhones,
      });
      contactsModalToggler.unset();
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <Formik
        enableReinitialize
        initialTouched={PHONE_ADD_FORM_INITIAL_TOUCHED}
        initialValues={{ phones: props.phones?.length ? props.phones : PHONE_ADD_FORM_INITIAL_VALUES }}
        innerRef={mergeRefs([ formikRef, ref ])}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={PHONE_ADD_VALIDATION_SCHEMA}
      >
        {
          ({ values }) => (
            <ExtentedForm>
              {
                values.phones.map((_, i) => (
                  <div
                    className={clsx(s.PhoneAddForm__formContainer, props.formClassname)}
                    key={i}
                  >
                    <div className={s.PhoneAddForm__inputContainer}>
                      <InputField
                        fieldContainerProps={
                          {
                            containerClassName: s.PhoneAddForm__name,
                            label: 'Full name*',
                          }
                        }
                        name={`phones.${i}.${PhoneAddFormInputNames.TITLE}`}
                        placeholder="Ex, Maria"
                      />

                      <PhoneField
                        fieldContainerProps={
                          {
                            containerClassName: s.PhoneAddForm__phone,
                            label: 'Phone number*',
                          }
                        }
                        name={`phones.${i}.${PhoneAddFormInputNames.PHONE}`}
                        placeholder="X-XXX-XXX-XXXX"
                      />

                      <IconCircle
                        className={s.PhoneAddForm__closeIcon}
                        height={32}
                        icon={
                          (
                            <CloseIcon
                              height={12}
                              width={12}
                            />
                          )
                        }
                        onClick={handleDeleteFormBlock(i)}
                        shadow="l"
                        width={32}
                      />
                    </div>

                    <InputField
                      fieldContainerProps={
                        {
                          containerClassName: clsx(s.PhoneAddForm__comment, { [s.PhoneAddForm__comment_small]: values.phones.length > 1 }),
                          label: 'Comment (not necessary)',
                        }
                      }
                      name={`phones.${i}.${PhoneAddFormInputNames.ADDITIONAL_INFO}`}
                      placeholder="Type something..."
                    />
                  </div>
                ))
              }
            </ExtentedForm>
          )
        }
      </Formik>

      <div className={s.PhoneAddForm__linksWrapper}>
        <NavigationLink
          as="div"
          icon={
            (
              <div className={s.PhoneAddForm__icon}>
                <PlusIcon />
              </div>
            )
          }
          onClick={handleAddFormClick}
          text="Add another one"
        />

        {
          props.showContactsModal && (
            <NavigationLink
              as="div"
              icon={<ClipIcon />}
              onClick={contactsModalToggler.set}
              text="Add from contacts"
            />
          )
        }
      </div>

      <div ref={divToScrollRef} />

      {
        props.showContactsModal && (
          <Dialog
            icon={ColorfulIconTypes.PHONE}
            isOpen={contactsModalToggler.value}
            onClickCancelBtn={contactsModalToggler.unset}
            onClickSaveBtn={handleSavePhonesFromContacts}
            onClose={contactsModalToggler.unset}
            saveBtnText="Add numbers"
            title="Phones"
          >
            <PhoneSelectForm
              hiddenPhones={formikRef.current?.values.phones}
              selectedPhones={selectedPhones}
              setSelectedPhones={setSelectedPhones}
            />
          </Dialog>
        )
      }
    </>
  );
});
