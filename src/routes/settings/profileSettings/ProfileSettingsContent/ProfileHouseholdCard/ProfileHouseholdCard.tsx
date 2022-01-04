import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { AvatarGroup } from 'common/components/ui/AvatarGroup/AvatarGroup';
import { Button } from 'common/components/ui/Button/Button';
import { StatusCard } from 'common/components/ui/HomeStatus/StatusCard/StatusCard';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { moveInputCaretToEnd } from 'common/components/utils/moveInputCaretToEnd';
import { useInput } from 'common/hooks/useInput';
import { Maybe } from 'graphql/types';
import { SUBSCRIPTION_PAGE_ROUTE } from 'utils/routes';

import s from './ProfileHouseholdCard.module.scss';

export interface ProfileHouseholdCardProps {
  containerClassName?: string;
  title: string;
  creationDate: Maybe<string>;
  updatedDate: Maybe<string>;
  comment: Maybe<string>;
}

// FIX ask backend for date of creation
export const ProfileHouseholdCard: React.FC<ProfileHouseholdCardProps> = ({
  updatedDate,
  comment: initialComment,
  creationDate,
  containerClassName,
  title
}) => {
  const commentToggler = useToggle();

  const [comment, setComment] = useState(initialComment || '');
  const [hasAutoFocus, setHasAutoFocus] = useState(false);
  const [textAreaValue, handleChangeTextArea, setTextAreaValue] = useInput();

  const handleEdit = () => {
    setTextAreaValue(comment);
    commentToggler.unset();
  };

  const handleRemove = () => {
    setComment('');
    commentToggler.unset();
  };

  const handleSave = () => {
    if (textAreaValue.trim()) {
      setComment(textAreaValue.trim());
      setTextAreaValue('');
      setHasAutoFocus(true);

      commentToggler.set();
    }
  };

  return (
    <div className={clsx(s.ProfileHouseholdCard__wrapper, containerClassName)}>
      <div className={s.ProfileHouseholdCard__header}>
        <div className={s.ProfileHouseholdCard__headerInner}>
          <Text text={title} variant={TextPropsVariantsEnum.H3} className={s.ProfileHouseholdCard__title} />

          {creationDate && (
            <Text variant={TextPropsVariantsEnum.CAPTION_M} color="textTretiary">
              Date of creation:
              <span className={s.ProfileHouseholdCard__date}>{moment(creationDate).format(' DD MMMM YYYY')}</span>
            </Text>
          )}
        </div>

        <div className={s.ProfileHouseholdCard__avatars}>
          <AvatarGroup className={s.ProfileHouseholdCard__avatarGroup} />
          +6
        </div>
      </div>

      {!commentToggler.value ? (
        <TextArea
          onChange={handleChangeTextArea}
          onFocus={moveInputCaretToEnd}
          value={textAreaValue}
          autoFocus={hasAutoFocus}
          fieldContainerProps={{
            label: 'Comment'
          }}
          enableAutoSize
        />
      ) : (
        <div className={s.ProfileHouseholdCard__status}>
          <StatusCard onRemove={handleRemove} onEdit={handleEdit} status={{ text: comment, title: 'You' }} />
        </div>
      )}

      {!commentToggler.value && (
        <Text
          color="textTretiary"
          className={s.ProfileHouseholdCard__commentHint}
          variant={TextPropsVariantsEnum.CAPTION_M}
          text="This comment will be seen as a separate status, and not a comment on the home ownership itself"
        />
      )}

      <div className={s.ProfileHouseholdCard__footer}>
        <div>
          {!commentToggler.value && (
            <Button
              onClick={handleSave}
              color="orange"
              size="s"
              variant={'secondary'}
              className={s.ProfileHouseholdCard__buttonSave}
              disabled={!textAreaValue.trim()}>
              Save changes
            </Button>
          )}
        </div>

        <Text variant={TextPropsVariantsEnum.CAPTION_R} color="textTretiary">
          <Link className={s.ProfileHouseholdCard__footerLink} to={SUBSCRIPTION_PAGE_ROUTE}>
            {'Subscription '}
          </Link>
          ends
          <span className={s.ProfileHouseholdCard__updatedDate}>{moment(updatedDate).format(' DD MMMM YYYY')}</span>
        </Text>
      </div>
    </div>
  );
};
