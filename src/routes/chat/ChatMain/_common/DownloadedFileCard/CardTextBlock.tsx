import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TChatFile } from 'routes/chat/types';
import { getFileExtension, checkIsFile } from 'utils/files';

import s from './DownloadedFileCard.module.scss';

type TCardTextBlock = {
  file: TChatFile;
  fileName: string;
  handleOnRetryClick: () => void;
  isInput: boolean;
  onDelete?: () => void;
  onDownload?: () => void;
  uploadError: string | null;
};

export const CardTextBlock = (props: TCardTextBlock): JSX.Element => {
  const { file, fileName, handleOnRetryClick, isInput, onDelete, onDownload, uploadError } = props;

  const intl = useIntl();

  const isFile = checkIsFile(file);

  const errorText = intl.formatMessage({ defaultMessage: 'Error', id: 'app.error' });
  const onErrorText = intl.formatMessage({ defaultMessage: 'Retry', id: 'app.retry' });

  const actionText = onDelete
    ? intl.formatMessage({ defaultMessage: 'Delete', id: 'app.delete' })
    : intl.formatMessage({ defaultMessage: 'Download', id: 'app.download' });

  const fileExtension = isFile ? getFileExtension(fileName) : 'File extension';

  return !uploadError ? (
    <Text className={s.DownloadedFileCard__format} color="textTretiary" variant={TextPropsVariantsEnum.CAPTION_R}>
      {fileExtension}

      {isInput && <span className={s.DownloadedFileCard__dot}>&#8226;</span>}

      {isInput && (
        <span className={s.DownloadedFileCard__delete} onClick={onDelete ?? onDownload}>
          {actionText}
        </span>
      )}
    </Text>
  ) : (
    <Text
      className={s.DownloadedFileCard__error_container}
      color="textTretiary"
      variant={TextPropsVariantsEnum.CAPTION_R}>
      <Text
        className={s.DownloadedFileCard__error}
        color="textTretiary"
        text={errorText}
        variant={TextPropsVariantsEnum.CAPTION_R}
      />

      <span className={s.DownloadedFileCard__dot}>&#8226;</span>

      <span className={s.DownloadedFileCard__delete} onClick={handleOnRetryClick}>
        {onErrorText}
      </span>
    </Text>
  );
};
