import React from 'react';
import { useIntl } from 'react-intl';

import { useFormikContext } from 'formik';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import {
  ESettingsFormFieldsTypes,
  TSettingsFormFields
} from 'routes/projects/singleProject/ProjectSettingsDialog/types';

import s from './styles.module.scss';

type TDropzoneSection = {};

export const DropzoneSection: React.FC<TDropzoneSection> = (props) => {
  const {} = props;

  const { validateField, values } = useFormikContext<TSettingsFormFields>();

  const intl = useIntl();

  const files = values[ESettingsFormFieldsTypes.FILES];

  /*
   * TODO: добавить инициализацию drop-zone с существующими изображениями текущего проекта
   * https://github.com/react-dropzone/react-dropzone/blob/ec934256bd13257915caee52dd3c88d733deb2db/examples/plugins/README.md
   * */
  const getFilesFromProject = async () => {};

  const renderDropzoneContent = () => (
    <div className={s.DropzoneSection__dropzoneContent}>
      <NavigationLink
        as="div"
        className={s.DropzoneSection__upload}
        icon={<UploadIcon />}
        isUnderline
        text={intl.formatMessage({
          defaultMessage: 'Upload file',
          id: 'project.settings.form.dropzone.upload'
        })}
      />

      <Text
        className={s.DropzoneSection__or}
        color="textSecondary"
        text={intl.formatMessage({
          defaultMessage: 'or',
          id: 'project.settings.form.dropzone.or'
        })}
        variant={TextPropsVariantsEnum.CAPTION_M}
      />

      <NavigationLink
        as="div"
        className={s.DropzoneSection__select}
        icon={<EyeIcon />}
        isUnderline
        text={intl.formatMessage({
          defaultMessage: 'Select from HouseData',
          id: 'project.settings.form.dropzone.select'
        })}
      />
    </div>
  );

  return (
    <>
      <DropzoneField
        className={s.DropzoneSection__dropzone}
        // getFilesFromEvent={getFilesFromProject}
        name={ESettingsFormFieldsTypes.FILES}
        renderDropzoneContent={renderDropzoneContent}
      />

      {!!files?.length && (
        <DropzonePreviewField
          disableErrorShow
          fieldContainerProps={{
            label: intl.formatMessage({
              defaultMessage: 'House Data files',
              id: 'project.settings.form.dropzone.preview.label'
            })
          }}
          name={ESettingsFormFieldsTypes.FILES}
        />
      )}
    </>
  );
};
