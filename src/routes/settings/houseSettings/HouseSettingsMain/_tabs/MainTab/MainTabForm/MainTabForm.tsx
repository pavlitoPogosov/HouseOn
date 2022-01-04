import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { appHistory } from 'appHistory';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

// eslint-disable-next-line
import { useApolloClient } from '@apollo/client';

import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { AreaInputField } from 'common/components/ui/_formikComponents/AreaInputField/AreaInputField';
import { DateInputField } from 'common/components/ui/_formikComponents/DateInputField/DateInputField';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { Button } from 'common/components/ui/Button';
import { EDatepickerCalendarTypes } from 'common/components/ui/Datepicker/Datepicker';
import { HomeStatus } from 'common/components/ui/HomeStatus/HomeStatus';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useHomeStatus } from 'common/hooks/useHomeStatus';
import { useGetHouseQuery, useUpdateHouse } from 'graphql/hooks/house';
import { QUERY_HOUSE_STATUSES } from 'graphql/queries/house';
import { FloorSpaceUnitsEnum, HouseStatusType, HouseType, HouseUpdateInput, OwnershipTypesEnum } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { INDEX_PAGE_ROUTE } from 'utils/routes';

import { SubmitBtn } from '../../_SubmitBtn/SubmitBtn';

import s from './MainTabForm.module.scss';

export enum FieldsNames {
  AREA = 'area',
  AREA_METRICS = 'area_metrics',
  DEADLINE = 'rent_expire_at',
  IMAGE = 'image',
  OWNERSHIP = 'ownership',
  STATUS = 'status',
  TITLE = 'title'
}

export const MAIN_TAB_FORM_INITIAL_VALUES = {
  [FieldsNames.IMAGE]: '',
  [FieldsNames.TITLE]: '',
  [FieldsNames.OWNERSHIP]: '',
  [FieldsNames.STATUS]: [] as Pick<HouseStatusType, 'title' | 'text' | 'expires_at'>[],
  [FieldsNames.DEADLINE]: { endDate: null, startDate: moment().startOf('day') },
  [FieldsNames.AREA]: '',
  [FieldsNames.AREA_METRICS]: FloorSpaceUnitsEnum.Meter
};

const getValuesForHouseUpdate = (values: typeof MAIN_TAB_FORM_INITIAL_VALUES): Omit<HouseUpdateInput, 'id'> => {
  const mappedStatuses = values.status.map((s) => ({
    expires_at: s.expires_at,
    id: (s as any).id || '',
    text: s.text,
    title: s.title
  }));

  return {
    floor_space: Number(values.area),
    floor_space_unit: values.area_metrics,
    ownership_type: values.ownership as OwnershipTypesEnum,
    rent_expire_at:
      values.ownership === OwnershipTypesEnum.Rented ? values.rent_expire_at.startDate.endOf('day') : null,
    statuses: mappedStatuses,
    title: values.title
  };
};

const getValuesForHouseForm = (house: HouseType): typeof MAIN_TAB_FORM_INITIAL_VALUES => {
  return {
    area: String(house.floor_space) || '0',
    area_metrics: house.floor_space_unit || FloorSpaceUnitsEnum.Meter,
    image: '',
    ownership: house.ownership_type || OwnershipTypesEnum.Owner,
    rent_expire_at:
      house.ownership_type === OwnershipTypesEnum.Rented && house.rent_expire_at
        ? { endDate: null, startDate: house.rent_expire_at.startOf('day') }
        : { endDate: null, startDate: moment().startOf('day') },
    status: house.statuses,
    title: house.title
  };
};

const SELECT_FIELD_OPTION: ISelectPrimaryOption[] = [
  { text: 'Rented', value: OwnershipTypesEnum.Rented },
  { text: 'Owner', value: OwnershipTypesEnum.Owner }
];

export interface MainTabFormProps {}

export const MainTabForm: React.FC<MainTabFormProps> = () => {
  const { cache } = useApolloClient();
  const dispatch = useTypedDispatch();

  const formikRef = useRef<FormikProps<typeof MAIN_TAB_FORM_INITIAL_VALUES> | null>(null);
  const { setStatuses, statuses, ...homeStatusOptions } = useHomeStatus();

  const intl = useIntl();

  const { data, loading: loadingHouse } = useGetHouseQuery();
  const [updateHouse, { loading: updatingHouse }] = useUpdateHouse({
    onCompleted({ result }) {
      cache.writeQuery({
        data: { result: result.statuses },
        query: QUERY_HOUSE_STATUSES
      });
    },
    onError() {
      dispatch(
        createToast({
          text: DEFAULT_ERROR_MESSAGE,
          title: 'Oops!',
          type: 'error'
        })
      );
    }
  });

  const initialFormValues = data?.result ? getValuesForHouseForm(data.result) : MAIN_TAB_FORM_INITIAL_VALUES;

  useEffect(() => {
    if (initialFormValues?.status) {
      setStatuses(initialFormValues.status);
    }
  }, [initialFormValues?.status, setStatuses]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setValues({
        ...formikRef.current.values,
        status: statuses
      });
    }
  }, [statuses]);

  const handleCancel = () => {
    if (appHistory.canGoBack()) {
      appHistory.goBack();
    } else {
      appHistory.push(INDEX_PAGE_ROUTE);
    }
  };

  const handleSubmit = () => {
    submitFormikFormWithRef(formikRef, (values: typeof MAIN_TAB_FORM_INITIAL_VALUES) => {
      updateHouse({ variables: { input: { ...getValuesForHouseUpdate(values) } } });
    });
  };

  const renderDropzoneContent = () => (
    <div className={s.MainTabForm__dropzoneContent}>
      <Text
        className={s.MainTabForm__dropzoneContentTitle}
        color="textSecondary"
        text={intl.formatMessage({
          defaultMessage: 'There can be a picture of your house',
          id: 'settings.dangerZone.pictures.hint'
        })}
        variant={TextPropsVariantsEnum.CAPTION_M}
      />

      <NavigationLink
        as="div"
        className={s.MainTabForm__dropzoneContentLink}
        icon={<UploadIcon />}
        isUnderline
        text={intl.formatMessage({
          defaultMessage: 'Upload file',
          id: 'app.button.uploadFile'
        })}
      />
    </div>
  );

  const isLoading = loadingHouse || updatingHouse;

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues}
      innerRef={formikRef}
      onSubmit={() => {}}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={Yup.object().shape({
        [FieldsNames.TITLE]: REQUIRED_FIELD_VALIDATION,
        [FieldsNames.AREA]: REQUIRED_FIELD_VALIDATION
      })}
    >
      {({ values }) => (
        <ExtentedForm>
          <div className={s.MainTabForm__container}>
            <DropzoneField
              className={s.MainTabForm__dropzone}
              disabled={isLoading}
              name={FieldsNames.IMAGE}
              renderDropzoneContent={renderDropzoneContent}
              size="l"
            />

            <div className={s.MainTabForm__fieldsContainer}>
              <InputField
                fieldContainerProps={{
                  containerClassName: s.MainTabForm__fieldContainer,
                  label: intl.formatMessage({
                    defaultMessage: 'Name house',
                    id: 'settings.dangerZone.form.name.label'
                  })
                }}
                isLoading={isLoading}
                name={FieldsNames.TITLE}
                placeholder="Text..."
              />

              <div className={s.MainTabForm__flexContainer}>
                <SelectUsualField
                  disabled={isLoading}
                  fieldContainerProps={{ containerClassName: s.MainTabForm__selectContainer }}
                  label={intl.formatMessage({
                    defaultMessage: 'Type of ownership',
                    id: 'settings.dangerZone.form.ownership.label'
                  })}
                  name={FieldsNames.OWNERSHIP}
                  optionContainerClassName={s.MainTabForm__selectOption}
                  options={SELECT_FIELD_OPTION}
                  placeholder={intl.formatMessage({ defaultMessage: 'Choose..', id: 'app.choose' })}
                />

                {values[FieldsNames.OWNERSHIP] === OwnershipTypesEnum.Rented && (
                  <DateInputField
                    datepickerProps={{
                      disableRangeSelect: true,
                      disabledCalendars: [EDatepickerCalendarTypes.YEAR],
                      disabledTillDate: moment().startOf('day').subtract(1, 'day')
                    }}
                    disabled={isLoading}
                    fieldContainerProps={{
                      label: intl.formatMessage({
                        defaultMessage: 'Deadline',
                        id: 'settings.dangerZone.form.deadline.label'
                      })
                    }}
                    name={FieldsNames.DEADLINE}
                    wrapperClassName={s.MainTabForm__deadlineContainer}
                  />
                )}
              </div>

              <Text
                className={s.MainTabForm__fieldLabel}
                color="textSecondary"
                text="House status"
                variant={TextPropsVariantsEnum.CAPTION_M}
              />

              <HomeStatus {...homeStatusOptions} statuses={statuses} />

              <AreaInputField
                areaMetricName={FieldsNames.AREA_METRICS}
                fieldContainerProps={{
                  containerClassName: s.MainTabForm__areaInput,
                  label: intl.formatMessage({
                    defaultMessage: 'Total floor space',
                    id: 'settings.dangerZone.form.areaMetrics.label'
                  })
                }}
                name={FieldsNames.AREA}
              />
            </div>
          </div>

          <div className={s.MainTabForm__controls}>
            <Button
              className={s.MainTabForm__controlBtn}
              color="orange"
              disabled={isLoading}
              onClick={handleCancel}
              size="m"
              type="button"
              variant="secondary"
            >
              {intl.formatMessage({ defaultMessage: 'Cancel', id: 'app.button.cancel' })}
            </Button>

            <SubmitBtn
              className={s.MainTabForm__controlBtn}
              isLoading={isLoading}
              onClick={handleSubmit}
              size="m"
              type="button"
            />
          </div>
        </ExtentedForm>
      )}
    </Formik>
  );
};
