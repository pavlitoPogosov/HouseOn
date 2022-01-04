import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import { FormikProps } from 'formik';

import {
  InstructionAddForm,
  INSTRUCTION_EDIT_FORM_INITIAL_VALUES,
  isInstructionAddFormEmpty
} from 'common/components/ui/_forms/InstructionAddForm/InstructionAddForm';
import { InputSkeleton } from 'common/components/ui/_skeletons/InputSkeleton/InputSkeleton';
import { useGetHouseQuery, useUpdateHouseInstructions } from 'graphql/hooks/house';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import { mapFormikValuesToInstructions, mapInstructionsToFormik } from 'utils/instructionsUtils';

import { SubmitBtn } from '../_SubmitBtn/SubmitBtn';
import { SubmitBtnSkeleton } from '../_SubmitBtn/SubmitBtnSkeleton';
import { TabContainer } from '../_TabContainer/TabContainer';

import s from './InstructionsTab.module.scss';

export interface InstructionsTabProps {}

export const InstructionsTab: React.FC<InstructionsTabProps> = () => {
  const dispatch = useTypedDispatch();

  const formikRef = useRef<FormikProps<typeof INSTRUCTION_EDIT_FORM_INITIAL_VALUES> | null>(null);

  const { data, loading: isFetching } = useGetHouseQuery();
  const intl = useIntl();

  const [updateMutation, { loading: isUpdating, error: updatingError }] = useUpdateHouseInstructions({
    onError() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'settings.tabs.alert.failed.title',
            defaultMessage: 'Oops!'
          }),
          text: intl.formatMessage({
            id: 'settings.tabs.alert.failed.text',
            defaultMessage: 'Failed to save comments. Please, try again'
          }),
          type: 'error'
        })
      );
    },
    onCompleted() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'settings.tabs.alert.success.title',
            defaultMessage: 'Success'
          }),
          text: intl.formatMessage({
            id: 'settings.tabs.direction.alert.success.text',
            defaultMessage: 'Direction saved'
          }),
          type: 'success'
        })
      );
    }
  });

  const handleFormSubmit = async () => {
    if (isInstructionAddFormEmpty(formikRef)) {
      formikRef.current?.setErrors({});

      if (accordions.length) {
        await updateMutation({
          variables: {
            input: {
              instructions: []
            }
          }
        });
      }
    }

    submitFormikFormWithRef(formikRef, async (values: typeof INSTRUCTION_EDIT_FORM_INITIAL_VALUES) => {
      await updateMutation({
        variables: {
          input: {
            instructions: mapFormikValuesToInstructions({
              items: values.accordions
            })
          }
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const accordions = useMemo(() => mapInstructionsToFormik(data?.result.instructions), [data?.result.instructions]);

  const renderContent = () => {
    if (isFetching) {
      return (
        <>
          <InputSkeleton containerClassName={s.InstructionsTab__marginBottom} />
          <InputSkeleton disableLabel containerClassName={s.InstructionsTab__marginBottomLarge} />

          <InputSkeleton containerClassName={s.InstructionsTab__marginBottom} />
          <InputSkeleton disableLabel containerClassName={s.InstructionsTab__marginBottomLarge} />

          <SubmitBtnSkeleton />
        </>
      );
    }

    return (
      <>
        <InstructionAddForm
          ref={formikRef}
          elementToListenScroll={window}
          initialValues={{ accordions }}
          error={updatingError ? DEFAULT_ERROR_MESSAGE : undefined}
        />

        <SubmitBtn onClick={handleFormSubmit} isLoading={isUpdating} />
      </>
    );
  };

  return <TabContainer>{renderContent()}</TabContainer>;
};
