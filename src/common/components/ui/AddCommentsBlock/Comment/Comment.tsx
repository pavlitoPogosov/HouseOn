import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

// TODO remove useless picture
import AvatarImg from './avatar.png';

import s from './Comment.module.scss';

export interface IComment {
  author: string;
  role?: string;
  message: string;
  date: string | number;
  id: number;
}

export interface CommentProps {
  containerClassName?: string;
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({ comment, containerClassName }) => {
  const { author, date, message, role } = comment;

  return (
    <div className={clsx(containerClassName)}>
      <div className={s.Comment__info}>
        <Avatar avatar={AvatarImg} width={24} height={24} containerClassName={s.Comment__avatar} />

        <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary" as="div">
          {author}

          {role && (
            <>
              <span className={s.Comment__dot}>&#8226;</span>
              {role}
            </>
          )}
        </Text>

        <Text variant={TextPropsVariantsEnum.CAPTION_M} color="textTretiary" className={s.Comment__date}>
          {moment(date).format('MMM D, YYYY')}
        </Text>
      </div>

      <Text variant={TextPropsVariantsEnum.BODY_M} as="div" className={s.Comment__message}>
        {message}
      </Text>
    </div>
  );
};
