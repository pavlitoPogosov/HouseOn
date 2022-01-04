import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';
import moment, { Moment } from 'moment';

import { delayPromise } from '@proscom/ui-utils';
import { BarProgress } from 'common/components/ui/BarProgress/BarProgress';
import { PreviewMedia } from 'common/components/ui/PreviewMedia/PreviewMedia';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { CardTextBlock } from 'routes/chat/ChatMain/_common/DownloadedFileCard/CardTextBlock';
import { CardTitle } from 'routes/chat/ChatMain/_common/DownloadedFileCard/CardTitle';
import { TChatFile } from 'routes/chat/types';
import { getEventsCalendarNames } from 'utils/dates';
import { EMediaTypes } from 'variables/media';

import { ReactComponent as FileIcon } from './file.svg';

import s from './DownloadedFileCard.module.scss';

export interface IDownloadedFileCardProps {
  containerClassName?: string;
  file: TChatFile;
  id: number;
  isFromCurrentUser?: boolean;
  isInput?: boolean;
  isPreviewDisabled?: boolean;
  messageAuthor?: string;
  messageDate?: Moment;
  onDelete?: () => void;
  onDownload?: () => void;
  onError?: () => void;
  withTime?: boolean;
}

const mediaTypes = ['image/*', 'video/*'];

export const DownloadedFileCard: React.FC<IDownloadedFileCardProps> = (props) => {
  const {
    containerClassName,
    file,
    id,
    isFromCurrentUser,
    isInput = false,
    isPreviewDisabled = false,
    messageAuthor,
    messageDate: messageDateProp,
    onDelete,
    onDownload,
    onError,
    withTime
  } = props;

  const messageDate = getEventsCalendarNames(moment(messageDateProp).toISOString());

  const intl = useIntl();

  /* TODO: remove */
  const temp = id % 2;

  /* TODO: change to real error message */
  const errorMessage = intl.formatMessage({
    defaultMessage: 'This file type can not be uploaded...',
    id: 'chat.input.file.error.type'
  });

  const initialProgress = isInput ? 0 : 100;
  const initialLoading = isInput ? !!onDelete : false;

  // TODO remove useless state
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [progress, setProgress] = useState(initialProgress);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /* TODO: change to real progress */
  const setFakeProgress = async () => {
    if (uploadError) {
      setUploadError(null);
    }

    await delayPromise(200).then(() => setProgress(20));
    await delayPromise(200).then(() => setProgress(40));
    await delayPromise(200).then(() => setProgress(60));
    await delayPromise(200).then(() => setProgress(80));
    await delayPromise(200).then(() => setProgress(100));

    if (isInput && temp && !uploadError) {
      setUploadError(errorMessage);
    }
  };

  // TODO: add upload mutation
  useEffect(() => {
    if (isInput) {
      setFakeProgress();
    }
  }, []);

  useEffect(() => {
    if (isInput) {
      if (progress === 100 && isLoading) {
        setIsLoading(false);
      } else if (!isLoading) {
        setIsLoading(true);
      }
    }
  }, [progress]);

  let fileName = 'File name';
  let fileLink = '';
  let isMedia = false;

  if ('name' in file) {
    fileName = file.name;
  }

  if ('link' in file) {
    fileLink = file.link;
  }

  if ('type' in file) {
    isMedia = file.type === EMediaTypes.IMAGE || file.type === EMediaTypes.VIDEO;
  }

  const handleOnRetryClick = () => {
    onError?.();
    setFakeProgress();
  };

  const handleFileNameClick = () => {
    if (fileLink) {
      window.open(fileLink, '_blank');
    }
  };

  return (
    <div className={clsx(s.DownloadedFileCard__container, containerClassName)}>
      {!isMedia && (
        <div className={s.DownloadedFileCard__icon}>
          <FileIcon />
        </div>
      )}

      {isMedia && (
        <div className={s.DownloadedFileCard__content_media}>
          <div className={clsx(s.media__content, isFromCurrentUser && s.current_user)}>
            <PreviewMedia
              author={messageAuthor}
              date={messageDate}
              // linkThumb={}
              isPreviewDisabled={isPreviewDisabled}
              link={fileLink}
              mediaType={file.type as EMediaTypes}
              title={fileName}
            />
          </div>

          {withTime && (
            <div className={clsx(s.media__message_time_container, isFromCurrentUser && s.current_user)}>
              {moment(messageDateProp).isValid() && (
                <Text
                  as="div"
                  className={clsx(s.media__message_time, isFromCurrentUser && s.current_user)}
                  color="textSecondary"
                  text={moment(messageDateProp).format('h:mma')}
                  variant={TextPropsVariantsEnum.CAPTION_R}
                />
              )}
            </div>
          )}
        </div>
      )}

      {!isMedia && (
        <div className={s.DownloadedFileCard__content}>
          <CardTitle fileName={fileName} handleFileNameClick={handleFileNameClick} uploadError={uploadError} />

          {!isLoading ? (
            <CardTextBlock
              file={file}
              fileName={fileName}
              handleOnRetryClick={handleOnRetryClick}
              isInput={isInput}
              onDelete={onDelete}
              onDownload={onDownload}
              uploadError={uploadError}
            />
          ) : (
            <BarProgress
              backgroundClassName={s.DownloadedFileCard__progressBar}
              percent={progress}
              progressClassName={s.DownloadedFileCard__progressBar}
            />
          )}
        </div>
      )}
    </div>
  );
};
