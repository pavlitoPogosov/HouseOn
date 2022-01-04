import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { AccountType } from 'graphql/types';

import { MemberInfo } from './MemberInfo/MemberInfo';

import s from './SelectedMemberContent.module.scss';

export interface SelectedMemberContentProps {
  selectedMember: AccountType | null;
  hasMembers: boolean;
  shouldAdapt?: boolean;
  loading?: boolean;

  setSelectedMember: (member: AccountType | null) => void;
}

export const SelectedMemberContent: React.FC<SelectedMemberContentProps> = ({
  hasMembers,
  selectedMember,
  shouldAdapt,
  loading = false,
  setSelectedMember
}) => {
  const intl = useIntl();

  const handleBackLinkClick = () => {
    setSelectedMember(null);
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (!hasMembers) {
      return (
        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'houseTeam.description',
            defaultMessage: 'This is a page where you can keep your house team information'
          })}
          className={s.SelectedMemberContent__emptyMessage}
          color="textSecondary"
        />
      );
    }

    if (!selectedMember) {
      return (
        <div className={s.SelectedMemberContent__advice}>
          <div className={s.SelectedMemberContent__adviceAvatar} />

          <Text
            variant={TextPropsVariantsEnum.BODY_M}
            color="textSecondary"
            text={intl.formatMessage({
              id: 'houseTeam.advice',
              defaultMessage: 'Choose someone from the list to view full information'
            })}
          />
        </div>
      );
    }

    return <MemberInfo selectedMember={selectedMember} />;
  };

  return (
    <div className={s.SelectedMemberContent__container}>
      {shouldAdapt && (
        <Text
          variant={TextPropsVariantsEnum.BODY_L}
          className={s.SelectedMemberContent__backLink}
          onClick={handleBackLinkClick}>
          <ChevronLeftIcon />
          Team
        </Text>
      )}

      {renderContent()}
    </div>
  );
};
