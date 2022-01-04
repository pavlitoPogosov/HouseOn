import React, { useEffect, useRef } from 'react';

// TODO DELETE USELESS IMG
import moment from 'moment';

import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { ReactComponent as SendIcon } from 'assets/icons/send.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { useInput } from 'common/hooks/useInput';
import { useStateWithCallback } from 'common/hooks/useStateWithCallback';
import { author5001 } from 'routes/chat/chat-example';
import { TChat, TChatDataItem, EChatDataTypes, TChatFile } from 'routes/chat/types';

import { DownloadedFileCard } from '../_common/DownloadedFileCard/DownloadedFileCard';

import s from './ChatInput.module.scss';

export interface IChatInputProps {
  selectedChat: TChat;
  setSelectedChat: React.Dispatch<React.SetStateAction<TChat | null>>;
  setTouched: () => void;
}

export const acceptableFilesTypes = `
  image/*,
  video/*,
  .pdf,
  .doc,
  .docx,
  .xlsx,
  .xls,
  .ppt,
  .txt,
`;

export const ChatInput: React.FC<IChatInputProps> = (props) => {
  const { selectedChat, setSelectedChat, setTouched } = props;

  const [inputValue, handleInputChange, setInputValue] = useInput();

  const [files, setFiles] = useStateWithCallback<File[] | TChatFile[]>([]);

  const filesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFilesDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = Array.from(e.target.files ?? []);

    setFiles(
      (prev) => {
        const arrayToReturn = [...prev, ...f];

        return arrayToReturn.length > 3 ? arrayToReturn.slice(-3) : arrayToReturn;
      },
      () => {
        filesContainerRef.current?.scrollIntoView({ block: 'end' });
      }
    );

    setTouched();
  };

  const handleFileDelete = (index: number) => {
    setTouched();

    return () => {
      setFiles((prev) => {
        const newArray = prev.concat();
        newArray.splice(index, 1);
        return newArray;
      });
    };
  };

  const handleSaveValue = () => {
    if (inputValue.trim() || !!files.length) {
      setSelectedChat((prev) => {
        if (prev) {
          const isLastBlockSameDay =
            prev.data.content.length > 0
              ? moment(prev.data.content[prev.data.content.length - 1].date)
                  .startOf('day')
                  .isSame(moment().startOf('day'))
              : false;

          const newMessage = {
            author: author5001,
            date: moment(),
            files,
            text: inputValue,
            type: EChatDataTypes.MESSAGE
          } as TChatDataItem;

          if (isLastBlockSameDay) {
            return {
              ...prev,
              data: {
                ...prev.data,
                content: [...prev.data.content.slice(0, -1), newMessage],
                date: moment()
              }
            };
          }

          return {
            ...prev,
            data: {
              ...prev.data,
              content: [...prev.data.content, newMessage],
              date: moment()
            }
          };
        }

        return prev;
      });

      setInputValue('');
      setFiles([]);
    }

    setTouched();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      if (!e.shiftKey) {
        handleSaveValue();
        e.preventDefault();
      }
    }
  };

  const handleSendClick = () => {
    handleSaveValue();
  };

  const handleRetryClick = (id: number) => {
    // handleSaveValue();
  };

  useEffect(() => {
    setInputValue('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat.id]);

  return (
    <div className={s.ChatInput__wrapper}>
      <div className={s.ChatInput__container}>
        <TextArea
          fieldContainerProps={{ containerClassName: s.ChatInput__inputContainer }}
          maxLetters={null}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type message..."
          textAreaClassName={s.ChatInput__input}
          value={inputValue}
        >
          <label className={s.ChatInput__label_download}>
            <input
              accept={acceptableFilesTypes}
              autoComplete="off"
              multiple
              onChange={handleFilesDownload}
              tabIndex={-1}
              type="file"
            />

            <ClipIcon />
          </label>

          <IconCircle
            className={s.ChatInput__button_send}
            height={24}
            icon={<SendIcon />}
            onClick={handleSendClick}
            width={24}
          />
        </TextArea>

        {!!files.length && (
          <div className={s.ChatInput__files} ref={filesContainerRef}>
            {files.map((f, i) => {
              const fileId = f instanceof File ? i : f.id;

              return (
                <DownloadedFileCard
                  containerClassName={s.ChatInput__fileCard}
                  file={f}
                  id={fileId}
                  isInput
                  isPreviewDisabled
                  key={fileId}
                  onDelete={handleFileDelete(i)}
                  onError={() => handleRetryClick(i)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
