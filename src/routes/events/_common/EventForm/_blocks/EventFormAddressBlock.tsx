import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useFormikContext } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { AddressInputField } from 'common/components/ui/_formikComponents/AddressInputField/AddressInputField';
import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Alert } from 'common/components/ui/Alert/Alert';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import {
  Text,
  TextPropsVariantsEnum
} from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_UPDATE_HOUSE_DIRECTION } from 'graphql/mutations/direction';
import {
  DirectionType,
  HouseDirectionInput
} from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import { TEventData } from '../../types';
import { EventFormFields } from '../EventForm';

import s from './_styles.module.scss';

export interface IEventFormAddressBlockProps {
  address?: string;
  isDirection: boolean;
  isLoading: boolean;
}

export const EventFormAddressBlock: React.FC<IEventFormAddressBlockProps> = props => {
  const {
    address: addressProp,
    isDirection,
    isLoading
  } = props;

  const {
    validateField,
    values
  } = useFormikContext<TEventData>();
  const dispatch = useTypedDispatch();

  const intl = useIntl();

  const isHouseDirection = values[EventFormFields.USES_HOUSE_DIRECTION];
  const files = values[EventFormFields.FILES];
  const additionalInfo = values[EventFormFields.ADDITIONAL_INFO];
  const houseId = values[EventFormFields.HOUSE_ID];
  const address = values[EventFormFields.DIRECTION].address as string;

  const addressAlertToggler = useToggle();
  const [ updateHouseDirection, { loading: updatingDirection } ] = useMutationWithError<
    { result: DirectionType },
    { input: HouseDirectionInput }
  >(MUTATION_UPDATE_HOUSE_DIRECTION);

  /*
   * TODO: добавить инициализацию drop-zone с существующими изображениями текущего ивента
   * https://github.com/react-dropzone/react-dropzone/blob/ec934256bd13257915caee52dd3c88d733deb2db/examples/plugins/README.md
   * */
  const getFilesFromEvent = async () => {};

  const handleSaveInfo = async () => {
    validateField(EventFormFields.ADDITIONAL_INFO);
    if (isLoading || updatingDirection) return;

    const resp = await updateHouseDirection({
      variables: {
        input: {
          additional_info: additionalInfo,
          address,
          latitude: values[EventFormFields.DIRECTION].coordinates?.latitude as number,
          longitude: values[EventFormFields.DIRECTION].coordinates?.longitude as number
        }
      }
    });

    if (!resp.errors?.length) {
      dispatch(createToast({
        text: intl.formatMessage({
          defaultMessage: 'You can see this information on the home ownership page',
          id: 'event.form.address.success.text'
        }),
        title: intl.formatMessage({
          defaultMessage: 'Information saved',
          id: 'event.form.address.success.title'
        })
      }));

      addressAlertToggler.unset();
    }
  };

  useEffect(() => {
    if (address) {
      addressAlertToggler.set();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    houseId,
    address,
    isHouseDirection
  ]);

  const renderCustomAddressBlock = () => (
    <>
      <AddressInputField
        autoFocus
        disabled={isLoading}
        fieldContainerProps={{ label: intl.formatMessage({ defaultMessage: 'Address', id: 'event.form.address.label' }) }}
        initialAddress={addressProp}
        name={EventFormFields.DIRECTION}
        placeholder={
          intl.formatMessage({
            defaultMessage: 'Example: Residences at 706 Mission, San Francisco',
            id: 'event.form.address.placeholder'
          })
        }
      />

      {
        files?.length < 3 && (
          <DropzoneField
            disabled={isLoading}
            // getFilesFromEvent={getFilesFromEvent}
            fieldContainerProps={
              {
                label: intl.formatMessage({
                  defaultMessage: 'Drop a pictures (up to 3) which would help to find you out',
                  id: 'event.form.address.files.label'
                })
              }
            }
            maxFiles={3}
            name={EventFormFields.FILES}
          />
        )
      }

      {
        !!files?.length && (
          <DropzonePreviewField
            disableErrorShow
            fieldContainerProps={
              {
                label: intl.formatMessage({
                  defaultMessage: 'Additional pictures',
                  id: 'event.form.address.additionalPictures.label'
                })
              }
            }
            isClosable={!isLoading}
            name={EventFormFields.FILES}
          />
        )
      }

      <TextAreaField
        disabled={isLoading}
        fieldContainerProps={
          {
            label: intl.formatMessage({
              defaultMessage: 'Additional info:',
              id: 'event.form.address.additionalInfo.label'
            })
          }
        }
        maxLetters={480}
        name={EventFormFields.ADDITIONAL_INFO}
        placeholder={
          intl.formatMessage({
            defaultMessage: 'Example: “Don’t miss a sign on the road',
            id: 'event.form.address.additionalInfo.placeholder'
          })
        }
        textAreaClassName={s.EventForm__textArea}
      />

      {
        addressAlertToggler.value && (
          <Fade isActive>
            <Alert
              containerClassName={s.EventForm__alert}
              onClose={!updatingDirection ? addressAlertToggler.unset : undefined}
              text={
                intl.formatMessage({
                  defaultMessage: 'Do you want to save the entered information as the main for your home?',
                  id: 'event.form.alert.save'
                })
              }
            >
              <div className={s.EventForm__alertFooter}>
                <NavigationLink
                  as="div"
                  className={s.EventForm__link}
                  isUnderline
                  onClick={handleSaveInfo}
                  text={intl.formatMessage({ defaultMessage: 'Save information', id: 'event.form.navigationLink.save' })}
                />

                <NavigationLink
                  as="div"
                  className={s.EventForm__link}
                  isUnderline
                  onClick={addressAlertToggler.unset}
                  text={intl.formatMessage({ defaultMessage: 'Not now', id: 'event.form.navigationLink.cancel' })}
                />

                {
                  updatingDirection && (
                    <Spinner
                      color="text-brand"
                      size="sm"
                    />
                  )
                }
              </div>
            </Alert>
          </Fade>
        )
      }
    </>
  );

  return (
    <div className={s.EventForm__block}>
      <Text
        className={s.EventForm__title}
        text={intl.formatMessage({ defaultMessage: 'Address & additional info', id: 'event.form.address.title' })}
        variant={TextPropsVariantsEnum.H3}
      />

      {
        isDirection && (
          <CheckboxField
            disabled={isLoading}
            name={EventFormFields.USES_HOUSE_DIRECTION}
            text={intl.formatMessage({ defaultMessage: 'Use house address', id: 'event.form.housesAddress' })}
          />
        )
      }

      {(!isDirection || !isHouseDirection) && renderCustomAddressBlock()}
    </div>
  );
};
