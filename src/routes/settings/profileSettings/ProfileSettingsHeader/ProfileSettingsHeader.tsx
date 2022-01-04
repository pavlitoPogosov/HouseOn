import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { AvatarEditable } from 'common/components/ui/AvatarEditable/AvatarEditable';
import { SelectLanguage } from 'common/components/ui/Select';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useStateWithCallback } from 'common/hooks/useStateWithCallback';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './ProfileSettingsHeader.module.scss';

export interface ProfileSettingsHeaderProps {
  avatar?: string;
  name?: string;
  role?: string;
}

enum UsernamesStatuses {
  CHANGED = 'changed',
  LOADING = 'loading',
  NOT_CHANGED = 'not_changed'
}

export const ProfileSettingsHeader: React.FC<ProfileSettingsHeaderProps> = ({ avatar, name = 'No name', role }) => {
  const [usernameValue, setUsernameValue] = useStateWithCallback<null | string>(null);
  const [usernameStatus, setUsernameStatus] = useState(UsernamesStatuses.NOT_CHANGED);
  const [isUsernameDisabled, setIsUsernameDisabled] = useStateWithCallback(true);
  const [currentAvatar, setCurrentAvatar] = useState(avatar);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const hiddenSpanRef = useRef<HTMLDivElement | null>(null);

  const handleInputSizeAdjust = () => {
    if (hiddenSpanRef.current && inputRef.current) {
      inputRef.current.style.width = hiddenSpanRef.current.offsetWidth + 14 + 'px';
    }
  };

  const handleIconClick = () => {
    setUsernameValue(name);
    setIsUsernameDisabled(false, () => inputRef.current?.focus());
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setUsernameValue(e.target.value, () => handleInputSizeAdjust());
  };

  const handleSetUsername = () => {
    // TODO api call, show loader, disable input
    if (usernameValue === name) {
      setIsUsernameDisabled(true);

      return;
    }

    if (!REQUIRED_FIELD_VALIDATION.isValidSync(usernameValue)) {
      setUsernameValue(null);
      setUsernameStatus(UsernamesStatuses.NOT_CHANGED);
      setIsUsernameDisabled(true, () => handleInputSizeAdjust());

      return;
    }

    setIsUsernameDisabled(true);
    setUsernameStatus(UsernamesStatuses.LOADING);

    setTimeout(() => {
      try {
        setUsernameStatus(UsernamesStatuses.CHANGED);
        setUsernameValue(null);
        handleInputSizeAdjust();

        setTimeout(() => {
          setUsernameStatus(UsernamesStatuses.NOT_CHANGED);
        }, 2000);
      } catch {
        // TODO api error handle
      }
    }, 3000);
  };

  useEffect(() => {
    if (hiddenSpanRef.current && inputRef.current) {
      handleInputSizeAdjust();
    }
  }, []);

  return (
    <>
      <SelectLanguage
        containerClassName={s.ProfileSettingsHeader__languageSelect}
        dropdownClassName={s.ProfileSettingsHeader__languageSelectDropdown}
      />

      <div className={s.ProfileSettingsHeader__wrapper}>
        <AvatarEditable
          avatar={currentAvatar}
          containerClassName={s.ProfileSettingsHeader__avatarWrapper}
          height={78}
          onEdit={setCurrentAvatar}
          width={78}
        />

        <div>
          <div className={s.ProfileSettingsHeader__username}>
            <span className={s.ProfileSettingsHeader__hiddenDiv} ref={hiddenSpanRef}>
              {usernameValue ?? name}
            </span>

            <input
              className={s.ProfileSettingsHeader__input}
              disabled={isUsernameDisabled}
              onBlur={handleSetUsername}
              onChange={handleUsernameChange}
              ref={inputRef}
              value={usernameValue ?? name}
            />

            {usernameStatus === UsernamesStatuses.LOADING ? (
              <Spinner className={s.ProfileSettingsHeader__icon} size="sm" />
            ) : (
              <>
                {usernameStatus === UsernamesStatuses.CHANGED ? (
                  <CheckIcon className={s.ProfileSettingsHeader__icon} />
                ) : (
                  <PencilIcon className={s.ProfileSettingsHeader__editIcon} onClick={handleIconClick} />
                )}
              </>
            )}
          </div>

          {role && <Text color="textSecondary" text={role} variant={TextPropsVariantsEnum.BODY_M} />}
        </div>
      </div>
    </>
  );
};
