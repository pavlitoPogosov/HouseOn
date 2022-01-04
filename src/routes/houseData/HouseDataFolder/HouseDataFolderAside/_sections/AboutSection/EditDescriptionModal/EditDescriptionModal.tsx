import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { SelectUsualField } from 'common/components/ui/_formikComponents/SelectField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

enum FieldNames {
  PROJECT = 'project',
  FOLDER = 'folder',
  SECTION = 'section',
  DESCRIPTION = 'description'
}

export const EDIT_DESCRIPTION_FORM_INITIAL_VALUES = {
  [FieldNames.PROJECT]: '',
  [FieldNames.FOLDER]: '',
  [FieldNames.SECTION]: '',
  [FieldNames.DESCRIPTION]: ''
};

const EDIT_DESCRIPTION_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldNames.PROJECT]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.FOLDER]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.SECTION]: REQUIRED_FIELD_VALIDATION,
  [FieldNames.DESCRIPTION]: REQUIRED_FIELD_VALIDATION
});

export interface EditDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditDescription: () => void;
}

export const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({ isOpen, onClose, onEditDescription }) => {
  const formikRef = useRef<FormikProps<typeof EDIT_DESCRIPTION_FORM_INITIAL_VALUES> | null>(null);

  const intl = useIntl();

  const onClickSaveBtn = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      title="Edit description"
      onClose={onClose}
      isOpen={isOpen}
      onClickCancelBtn={onClose}
      onClickSaveBtn={onClickSaveBtn}>
      <Formik
        initialValues={EDIT_DESCRIPTION_FORM_INITIAL_VALUES}
        validationSchema={EDIT_DESCRIPTION_FORM_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onEditDescription}
        innerRef={formikRef}>
        <ExtentedForm disableScrollToError>
          <SelectUsualField
            options={[]}
            name={FieldNames.PROJECT}
            label={intl.formatMessage({
              id: 'houseData.form.project.label',
              defaultMessage: 'Choose project'
            })}
            placeholder={intl.formatMessage({
              id: 'houseData.form.project.label',
              defaultMessage: 'Choose project'
            })}
          />

          <SelectUsualField options={[]} name={FieldNames.FOLDER} label="Choose folder" placeholder="Choose folder" />

          <SelectUsualField
            options={[]}
            name={FieldNames.SECTION}
            label={intl.formatMessage({
              id: 'houseData.form.section.label',
              defaultMessage: 'Choose section'
            })}
            placeholder={intl.formatMessage({
              id: 'houseData.form.section.label',
              defaultMessage: 'Choose section'
            })}
          />

          <TextAreaField
            name={FieldNames.DESCRIPTION}
            fieldContainerProps={{
              label: intl.formatMessage({
                id: 'houseData.form.description.label',
                defaultMessage: 'Description'
              })
            }}
            placeholder={intl.formatMessage({
              id: 'houseData.form.description.label',
              defaultMessage: 'Description'
            })}
          />
        </ExtentedForm>
      </Formik>
    </Dialog>
  );
};
