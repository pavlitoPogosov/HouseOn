import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

export interface MoveFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveFile: () => void;
}

enum FieldNames {
  PROJECT = 'project',
  FOLDER = 'folder',
  SECTION = 'section'
}

const FORM_INITIAL_VALUES = {
  [FieldNames.PROJECT]: '',
  [FieldNames.FOLDER]: '',
  [FieldNames.SECTION]: ''
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldNames.PROJECT]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.FOLDER]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.SECTION]: REQUIRED_FIELD_VALIDATION
});

export const MoveFileModal: React.FC<MoveFileModalProps> = ({ isOpen, onClose, onSaveFile }) => {
  const formikRef = useRef<FormikProps<typeof FORM_INITIAL_VALUES> | null>(null);

  const intl = useIntl();

  const handleSaveBtnClick = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      title="Move file"
      isOpen={isOpen}
      onClose={onClose}
      onClickCancelBtn={onClose}
      onClickSaveBtn={handleSaveBtnClick}>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={FORM_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        innerRef={formikRef}
        onSubmit={onSaveFile}>
        <ExtentedForm disableScrollToError>
          <SelectUsualField
            name={FieldNames.PROJECT}
            options={[]}
            label={intl.formatMessage({
              id: 'houseData.form.project.label',
              defaultMessage: 'Choose project'
            })}
            placeholder={intl.formatMessage({
              id: 'houseData.form.project.label',
              defaultMessage: 'Choose project'
            })}
          />

          <SelectUsualField
            name={FieldNames.FOLDER}
            options={[]}
            label={intl.formatMessage({
              id: 'houseData.form.folder.label',
              defaultMessage: 'Choose folder'
            })}
            placeholder={intl.formatMessage({
              id: 'houseData.form.folder.label',
              defaultMessage: 'Choose folder'
            })}
          />

          <SelectUsualField
            name={FieldNames.SECTION}
            options={[]}
            label={intl.formatMessage({
              id: 'houseData.form.section.label',
              defaultMessage: 'Choose section'
            })}
            placeholder={intl.formatMessage({
              id: 'houseData.form.section.label',
              defaultMessage: 'Choose section'
            })}
          />
        </ExtentedForm>
      </Formik>
    </Dialog>
  );
};
