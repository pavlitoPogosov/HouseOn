import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { BarProgress } from 'common/components/ui/BarProgress/BarProgress';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { getFileExtension } from 'utils/files';

import { ReactComponent as FileIcon } from './file.svg';

import s from './DownloadedFileCard.module.scss';

export interface DownloadedFileCardProps {
  containerClassName?: string;
  file: File;

  onDelete: () => void;
}

export const DownloadedFileCard: React.FC<DownloadedFileCardProps> = ({ containerClassName, file, onDelete }) => {
  // TODO remove useless state
  const [isLoading, setIsLoading] = useState(true);

  // TODO remove useless useEffect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className={clsx(s.DownloadedFileCard__container, containerClassName)}>
      <div className={s.DownloadedFileCard__icon}>
        <FileIcon />
      </div>

      <div className={s.DownloadedFileCard__content}>
        <Text className={s.DownloadedFileCard__title} text={file.name} variant={TextPropsVariantsEnum.CAPTION_R} />

        {!isLoading ? (
          <Text className={s.DownloadedFileCard__format} color="textTretiary" variant={TextPropsVariantsEnum.CAPTION_R}>
            {getFileExtension(file.name)}

            <span className={s.DownloadedFileCard__dot}>&#8226;</span>

            <span className={s.DownloadedFileCard__delete} onClick={onDelete}>
              Delete
            </span>
          </Text>
        ) : (
          <BarProgress
            backgroundClassName={s.DownloadedFileCard__progressBar}
            percent={50}
            progressClassName={s.DownloadedFileCard__progressBar}
          />
        )}
      </div>
    </div>
  );
};
