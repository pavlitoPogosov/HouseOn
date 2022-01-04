import React from 'react';

import clsx from 'clsx';

import { Button } from 'common/components/ui/Button/Button';
import { Input } from 'common/components/ui/Input/Input';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import s from './CreatedEntityLinkDialogContent.module.scss';

export interface ICreatedEntityLinkDialogContentProps {
  containerClassName?: string;
  description: string;
  descriptionClassName?: string;
  disableFooter?: boolean;
  hideAvatar?: boolean;
  link?: string;
  title?: string;
}

export const CreatedEntityLinkDialogContent: React.FC<ICreatedEntityLinkDialogContentProps> = ({
  containerClassName,
  description,
  descriptionClassName,
  disableFooter,
  hideAvatar,
  link = '',
  title
}) => {
  const dispatch = useTypedDispatch();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);

    dispatch(
      createToast({
        dismissTimeout: 3000,
        text: 'Link copied!'
      })
    );
  };

  return (
    <div className={clsx(s.CreatedEntityLink__container, containerClassName)}>
      {!hideAvatar && <div className={s.CreatedEntityLink__avatar} />}

      {title && <Text as="h6" text={title} variant={TextPropsVariantsEnum.H3} />}

      <Text
        as="h6"
        className={clsx(s.CreatedEntityLink__text, descriptionClassName)}
        color="textSecondary"
        text={description}
        variant={TextPropsVariantsEnum.BODY_M}
      />

      {!disableFooter && link && (
        <div className={s.CreatedEntityLink__inputWrapper}>
          <Input
            disabled
            fieldContainerProps={{
              containerClassName: s.CreatedEntityLink__inputContainer,
              label: 'Invite link'
            }}
            inputClassName={s.CreatedEntityLink__input}
            value={link}
          />

          <Button
            className={s.CreatedEntityLink__btn}
            color="orange"
            onClick={handleCopyLink}
            size="s"
            variant="primary">
            Copy link
          </Button>
        </div>
      )}
    </div>
  );
};
