import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { DropZone } from 'common/components/ui/DropZone/DropZone';
import { getFileExtension } from 'utils/files';

import { FileCard } from '../../../../components/FileCard/FileCard';
import { SectionWrapper } from '../_SectionWrapper/SectionWrapper';

import s from './FilesSection.module.scss';

export interface FilesSectionProps {}

export const FilesSection: React.FC<FilesSectionProps> = () => {
  const [files, setFiles] = useState<File[]>([]);

  const intl = useIntl();

  const handleFileAdd = (file: File[]) => {
    setFiles((prev) => [...prev, ...file]);
  };

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'houseData.files.title', defaultMessage: 'Files' })}>
      <DropZone size="m" maxFiles={undefined} onDropAccepted={handleFileAdd} />

      <div className={s.FilesSection__filesWrapper}>
        {files.map((f, i) => {
          const fileExtension = getFileExtension(f.name);
          const title = f.name.replace(`.${fileExtension}`, '');

          return (
            <FileCard
              key={i}
              createTime={Date().toLocaleString()}
              title={title}
              fileExtension={fileExtension}
              containerClassName={s.FilesSection__file}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};
