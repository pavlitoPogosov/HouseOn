import React from 'react';

import Tippy from '@tippyjs/react';
import { ReactComponent as QuestionIcon } from 'assets/icons/question.svg';
import { Button } from 'common/components/ui/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import s from 'routes/chat/ChatMain/_common/DownloadedFileCard/DownloadedFileCard.module.scss';

type TCardTitle = {
  fileName: string;
  handleFileNameClick: () => void;
  uploadError: string | null;
};

type TMessageTooltip = Pick<TCardTitle, 'uploadError'>;

const MessageTooltip = ({ uploadError }: TMessageTooltip) => (
  <div className={s.ChatDialogMessage__messageTooltip}>
    <div className={s.ChatDialogMessage__messageTooltipTriangle} />

    {uploadError}
  </div>
);

export const CardTitle: React.FC<TCardTitle> = (props) => {
  const { fileName, handleFileNameClick, uploadError } = props;

  return (
    <div className={s.DownloadedFileCard__title_container}>
      <Button
        className={s.DownloadedFileCard__title_button}
        color="transparent"
        isTextButton
        onClick={handleFileNameClick}
        type="button"
        variant="secondary">
        <Text className={s.DownloadedFileCard__title} text={fileName} variant={TextPropsVariantsEnum.CAPTION_R} />
      </Button>

      {uploadError && (
        <Tippy content={<MessageTooltip uploadError={uploadError} />} offset={[0, 8]}>
          <IconCircle className={s.DownloadedFileCard__error_question} height={16} icon={<QuestionIcon />} width={16} />
        </Tippy>
      )}
    </div>
  );
};
