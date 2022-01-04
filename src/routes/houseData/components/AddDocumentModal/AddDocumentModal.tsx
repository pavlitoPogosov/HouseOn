import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikProps } from 'formik';

import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { SelectUsualField, SelectUsualMultipleField } from 'common/components/ui/_formikComponents/SelectField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { getFileExtension } from 'utils/files';

import { FileCard } from '../FileCard/FileCard';

import s from './AddDocumentModal.module.scss';

export interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum FieldNames {
  PROJECT = 'PROJECT',
  FOLDER = 'FOLDER',
  SECTION = 'SECTION',
  DESCRIPTION = 'DESCRIPTION',
  TAGS = 'TAGS',
  FILES = 'FILES'
}

enum ModalTypes {
  ADD_FORM = 'ADD_FORM',
  SAVED_NOTIFY = 'SAVED_NOTIFY'
}

export const ADD_DOCUMENT_FORM_INITIAL_VALUES = {
  [FieldNames.PROJECT]: '',
  [FieldNames.FOLDER]: '',
  [FieldNames.SECTION]: '',
  [FieldNames.DESCRIPTION]: '',
  [FieldNames.TAGS]: [],
  [FieldNames.FILES]: [] as File[]
};

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose }) => {
  const [modalType, setModalType] = useState<ModalTypes>(ModalTypes.ADD_FORM);
  const formikRef = useRef<FormikProps<typeof ADD_DOCUMENT_FORM_INITIAL_VALUES> | null>(null);

  const intl = useIntl();

  const handleSaveBtnClick = () => {
    if (modalType === ModalTypes.ADD_FORM) {
      formikRef.current?.submitForm();
      setModalType(ModalTypes.SAVED_NOTIFY);

      return;
    }

    onClose();
    setModalType(ModalTypes.ADD_FORM);
  };

  const renderContent = () => {
    if (modalType === ModalTypes.SAVED_NOTIFY) {
      return (
        <Text
          color="textSecondary"
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'houseData.form.success',
            defaultMessage: 'You can put files in any sections later'
          })}
        />
      );
    }

    return (
      <Formik initialValues={ADD_DOCUMENT_FORM_INITIAL_VALUES} onSubmit={() => {}}>
        {({ values }) => (
          <ExtentedForm disableScrollToError>
            <SelectUsualField
              name={FieldNames.PROJECT}
              label={intl.formatMessage({
                id: 'houseData.form.project.label',
                defaultMessage: 'Choose project'
              })}
              placeholder={intl.formatMessage({
                id: 'houseData.form.project.label',
                defaultMessage: 'Choose project'
              })}
              options={[]}
            />

            <SelectUsualField
              name={FieldNames.FOLDER}
              label={intl.formatMessage({
                id: 'houseData.form.folder.label',
                defaultMessage: 'Choose folder'
              })}
              placeholder={intl.formatMessage({
                id: 'houseData.form.folder.label',
                defaultMessage: 'Choose folder'
              })}
              options={[]}
            />

            <SelectUsualField
              name={FieldNames.SECTION}
              label={intl.formatMessage({
                id: 'houseData.form.section.label',
                defaultMessage: 'Choose section'
              })}
              placeholder={intl.formatMessage({
                id: 'houseData.form.section.label',
                defaultMessage: 'Choose section'
              })}
              options={[]}
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

            <SelectUsualMultipleField
              name={FieldNames.TAGS}
              options={[]}
              label={intl.formatMessage({
                id: 'houseData.form.tag.label',
                defaultMessage: 'Typing tag'
              })}
              placeholder="text..."
            />

            <DropzoneField name={FieldNames.FILES} maxFiles={6} />

            <div className={s.AddDocumentModal__filesWrapper}>
              {values[FieldNames.FILES].map((f, i) => {
                const fileExtension = getFileExtension(f.name);
                const title = f.name.replace(`.${fileExtension}`, '');

                return (
                  <FileCard
                    key={i}
                    createTime={Date().toLocaleString()}
                    title={title}
                    fileExtension={fileExtension}
                    containerClassName={s.AddDocumentModal__file}
                  />
                );
              })}
            </div>
          </ExtentedForm>
        )}
      </Formik>
    );
  };

  return (
    <Dialog
      title={
        modalType === ModalTypes.ADD_FORM
          ? intl.formatMessage({ id: 'houseData.form.title.create', defaultMessage: 'Add document' })
          : intl.formatMessage({
              id: 'houseData.form.title.success',
              defaultMessage: 'Your files have been placed in the "Inbox" project'
            })
      }
      isOpen={isOpen}
      onClose={onClose}
      onClickCancelBtn={onClose}
      onClickSaveBtn={handleSaveBtnClick}>
      {renderContent()}
    </Dialog>
  );
};
