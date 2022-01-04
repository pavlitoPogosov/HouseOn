import React, { useRef } from 'react';

import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { useInput } from 'common/hooks/useInput';

import { Comment, IComment } from './Comment/Comment';

import s from './AddCommentsBlock.module.scss';

export interface AddCommentsBlockProps {
  comments: IComment[];
  onChange: (newComments: IComment[]) => void;
}

export const AddCommentsBlock: React.FC<AddCommentsBlockProps> = ({ comments, onChange }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textAreaValue, handleTextAreaValue, setTextAreaValue] = useInput();

  const handleClearValue = () => {
    setTextAreaValue('');
  };

  const handleSaveValue = () => {
    if (textAreaValue.trim()) {
      onChange([
        ...comments,
        {
          id: Date.now(),
          date: Date.now(),
          message: textAreaValue.trim(),
          author: 'You'
        }
      ]);
      setTextAreaValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        handleSaveValue();
        e.preventDefault();
      }
    }
  };

  return (
    <>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} containerClassName={s.AddCommentsBlock__comment} />
      ))}

      <TextArea
        ref={textAreaRef}
        value={textAreaValue}
        onChange={handleTextAreaValue}
        onBlur={handleClearValue}
        onKeyDown={handleKeyDown}
        maxLength={240}
        placeholder="Type a text..."
        fieldContainerProps={{
          label: 'Your comment'
        }}
      />

      <div className={s.AddCommentsBlock__controlsWrapper}>
        <label className={s.AddCommentsBlock__fileLink}>
          <input type="file" accept="image/*" autoComplete="off" tabIndex={-1} />

          <span>
            <ClipIcon />
            Add a file
          </span>
        </label>
      </div>
    </>
  );
};
