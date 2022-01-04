import React from 'react';

import AvatarImage from 'assets/images/avatar.png';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './CommentsView.module.scss';

export interface CommentsViewProps {}

export const CommentsView: React.FC<CommentsViewProps> = () => {
  const items = new Array(4).fill(1).map((_, i) => (
    <div key={i} className={s.CommentsView__item}>
      <Avatar avatar={AvatarImage} containerClassName={s.CommentsView__avatar} />
      <div className={s.CommentsView__content}>
        <div className={s.CommentsView__header}>
          <Text variant={TextPropsVariantsEnum.CAPTION_M}>Roberto Mielgo</Text>
          <div className={s.CommentsView__dot} />
          <Text variant={TextPropsVariantsEnum.CAPTION_M}>Cleaner</Text>
        </div>
        <div className={s.CommentsView__message}>
          <Text variant={TextPropsVariantsEnum.CAPTION_R}>
            Hi everyone! Do you know where my blues? It was on the windowsill and then gone somewhere..
          </Text>
        </div>
      </div>
    </div>
  ));
  return (
    <div className={s.CommentsView}>
      <div className={s.CommentsView__items}>{items}</div>
    </div>
  );
};
