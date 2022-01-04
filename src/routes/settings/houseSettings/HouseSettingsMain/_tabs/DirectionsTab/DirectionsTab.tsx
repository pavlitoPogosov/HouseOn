import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { AddressInputField } from 'common/components/ui/_formikComponents/AddressInputField/AddressInputField';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { InputSkeleton } from 'common/components/ui/_skeletons/InputSkeleton/InputSkeleton';
import { TextAreaSkeleton } from 'common/components/ui/_skeletons/TextAreaSkeleton/TextAreaSkeleton';
import { UsualMapSkeleton } from 'common/components/ui/_skeletons/UsualMapSkeleton/UsualMapSkeleton';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { MUTATION_UPDATE_HOUSE_DIRECTION } from 'graphql/mutations/direction';
import { QUERY_HOUSE } from 'graphql/queries/house';
import { DirectionType, HouseDirectionInput, HouseType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import { ADDRESS_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import { SubmitBtn } from '../_SubmitBtn/SubmitBtn';
import { SubmitBtnSkeleton } from '../_SubmitBtn/SubmitBtnSkeleton';
import { TabContainer } from '../_TabContainer/TabContainer';

import s from './DirectionsTab.module.scss';

export const DirectionsTab: React.FC<unknown> = () => {
  const dispatch = useTypedDispatch();

  const formikRef = useRef<FormikProps<any> | null>(null);

  const { data, loading } = useQueryWithError<{ result: HouseType }, {}>(QUERY_HOUSE);
  const intl = useIntl();

  const [updateHouseDirection, { loading: updatingDirection }] = useMutationWithError<
    { result: DirectionType },
    { input: HouseDirectionInput }
  >(MUTATION_UPDATE_HOUSE_DIRECTION, {
    onCompleted() {
      dispatch(
        createToast({
          text: intl.formatMessage({
            defaultMessage: 'Direction saved',
            id: 'settings.tabs.direction.alert.success.text'
          }),
          title: intl.formatMessage({
            defaultMessage: 'Success',
            id: 'settings.tabs.alert.success.title'
          }),
          type: 'success'
        })
      );
    },
    onError() {
      dispatch(
        createToast({
          text: intl.formatMessage({
            defaultMessage: 'Failed to save comments. Please, try again',
            id: 'settings.tabs.alert.failed.text'
          }),
          title: intl.formatMessage({
            defaultMessage: 'Oops!',
            id: 'settings.tabs.alert.failed.title'
          }),
          type: 'error'
        })
      );
    }
  });

  const handleFormSubmit = () => {
    submitFormikFormWithRef(
      formikRef,
      (values: {
        additional: string;
        address: { address: any; coordinates: { latitude: number; longitude: number } };
      }) => {
        updateHouseDirection({
          variables: {
            input: {
              additional_info: values.additional.trim(),
              address: values.address.address,
              latitude: values.address.coordinates?.latitude as number,
              longitude: values.address.coordinates?.longitude as number
            }
          }
        });
      }
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <InputSkeleton containerClassName={s.DirectionsTab__marginBottom} />

          <UsualMapSkeleton containerClassName={s.DirectionsTab__marginBottom} />

          <TextAreaSkeleton containerClassName={s.DirectionsTab__marginBottom} />

          <SubmitBtnSkeleton />
        </>
      );
    }

    const address = data?.result.direction?.address || '';
    const additional = data?.result.direction?.additional_info || '';
    const pictures: any[] = [];
    const latitude = data?.result.direction?.latitude;
    const longitude = data?.result.direction?.longitude;

    return (
      <>
        <Formik
          initialValues={{
            additional,
            address: {
              address,
              coordinates:
                latitude && longitude
                  ? {
                      latitude,
                      longitude
                    }
                  : undefined
            },
            pictures
          }}
          innerRef={formikRef}
          onSubmit={() => {}}
          validationSchema={Yup.object().shape({ address: ADDRESS_FIELD_VALIDATION })}>
          <ExtentedForm>
            <AddressInputField
              fieldContainerProps={{
                label: intl.formatMessage({
                  defaultMessage: 'Type your house address',
                  id: 'settings.tabs.direction.form.address.label'
                })
              }}
              mapProps={{ isInitiallyVisible: true }}
              name="address"
            />

            <div className={s.DirectionsTab__picturesWrapper}>
              <DropzoneField
                excludeRepeats
                fieldContainerProps={{
                  label: intl.formatMessage({
                    defaultMessage: 'Drop a pictures (up to 3) which would help to find you out',
                    id: 'settings.tabs.direction.form.pictures.label'
                  })
                }}
                maxFiles={3}
                name="pictures"
                size="m"
              />

              <DropzonePreviewField
                containerClassName={s.DirectionEdit__previewField}
                disableErrorShow
                isClosable
                name="pictures"
              />
            </div>

            <TextAreaField
              enableAutoSize
              fieldContainerProps={{
                label: intl.formatMessage({
                  defaultMessage: 'Additional info (not necessary):',
                  id: 'settings.tabs.direction.form.additional.label'
                })
              }}
              maxLetters={84}
              name="additional"
            />
          </ExtentedForm>
        </Formik>

        <SubmitBtn isLoading={updatingDirection} onClick={handleFormSubmit} />
      </>
    );
  };

  return <TabContainer>{renderContent()}</TabContainer>;
};
