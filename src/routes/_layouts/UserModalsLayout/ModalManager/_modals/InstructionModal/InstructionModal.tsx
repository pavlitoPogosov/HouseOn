import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { EditorState } from 'draft-js';
import { FormikProps } from 'formik';

import {
  InstructionAddForm,
  INSTRUCTION_EDIT_FORM_INITIAL_VALUES,
  isInstructionAddFormEmpty
} from 'common/components/ui/_forms/InstructionAddForm/InstructionAddForm';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { MODAL_OVERLAY_CHILDREN_ID } from 'common/components/ui/Overlay/Overlay';
import { useGetHouseQuery, useUpdateHouseInstructions } from 'graphql/hooks/house';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import { mapFormikValuesToInstructions, mapInstructionsToFormik } from 'utils/instructionsUtils';

import { CommonSpinner } from '../_common/_CommonSpinner/CommonSpinner';

import { InstuctionModalView } from './InstuctionModalView/InstuctionModalView';

export interface InstructionModalProps {
  onClose: () => void;
}

enum InstructionModalTypes {
  VIEW = 'VIEW',
  EDIT = 'EDIT'
}

export type InstructionModalAccordion = {
  title: string;
  id: string;
  content: EditorState;
};

export const InstructionModal: React.FC<InstructionModalProps> = ({ onClose }) => {
  const editFormRef = useRef<FormikProps<{ accordions: InstructionModalAccordion[] }> | null>(null);

  const [shownModalType, setShownModalType] = useState(InstructionModalTypes.EDIT);

  const { data, loading: isFetching } = useGetHouseQuery();
  const [updateMutation, { loading: isUpdating, error: updatingError }] = useUpdateHouseInstructions({
    onCompleted: ({ result }) => {
      !result.instructions.length ? onClose() : setShownModalType(InstructionModalTypes.VIEW);
    }
  });

  const isView = shownModalType === InstructionModalTypes.VIEW;
  const isEdit = shownModalType === InstructionModalTypes.EDIT;

  const accordions = useMemo(() => mapInstructionsToFormik(data?.result.instructions), [data?.result.instructions]);

  const handleSaveBtnClick = async () => {
    if (isInstructionAddFormEmpty(editFormRef)) {
      editFormRef.current?.setErrors({});

      if (!accordions.length) {
        onClose();
      } else {
        await updateMutation({
          variables: {
            input: {
              instructions: []
            }
          }
        });
        onClose();
      }
    }

    submitFormikFormWithRef(editFormRef, async (values: typeof INSTRUCTION_EDIT_FORM_INITIAL_VALUES) => {
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
  };

  const handleHeaderBtnClick = () => {
    setShownModalType(InstructionModalTypes.EDIT);
  };

  const handleCancelBtnClick = () => {
    if (!accordions.length || isView) {
      onClose();
    }

    setShownModalType(InstructionModalTypes.VIEW);
  };

  const renderContent = () => {
    if (isFetching) {
      return <CommonSpinner />;
    }

    if (isView && data?.result.instructions) {
      return <InstuctionModalView accordions={accordions} />;
    }

    return (
      <InstructionAddForm
        ref={editFormRef}
        initialValues={{ accordions }}
        elementToListenScroll={document.getElementById(MODAL_OVERLAY_CHILDREN_ID)}
        error={updatingError ? DEFAULT_ERROR_MESSAGE : undefined}
      />
    );
  };

  useLayoutEffect(() => {
    if (!isFetching && accordions.length) {
      setShownModalType(InstructionModalTypes.VIEW);
    }

    if (!isFetching && !accordions.length) {
      setShownModalType(InstructionModalTypes.EDIT);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, accordions]);

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.INSTRUCTION}
      title="Instructions"
      onClose={onClose}
      headerBtnText={isView ? 'Edit' : ''}
      onClickHeaderBtn={isView ? handleHeaderBtnClick : undefined}
      onClickCancelBtn={handleCancelBtnClick}
      onClickSaveBtn={isEdit ? handleSaveBtnClick : undefined}
      isLoading={isUpdating || (isFetching && !!data)}
      cancelBtnText={isView ? 'Close' : 'Cancel'}>
      {renderContent()}
    </Dialog>
  );
};
