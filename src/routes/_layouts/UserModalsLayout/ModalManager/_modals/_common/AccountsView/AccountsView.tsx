import React, { useMemo } from 'react';
import ContentLoader from 'react-content-loader';

import { AccountCard } from 'common/components/ui/_cards/AccountCard/AccountCard';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useInput } from 'common/hooks/useInput';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AccountType } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { normalizeString } from 'utils/stringUtils';

import s from './AccountsView.module.scss';

export interface AccountsViewProps {
  isLoading: boolean;
  accounts?: AccountType[];

  onAccountEdit: (account: AccountType) => void;
  onAccountShowInvite: (account: AccountType) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  isLoading,
  accounts,
  onAccountEdit,
  onAccountShowInvite
}) => {
  const { currentAccountId } = useTypedSelector((s) => s.accounts);

  const [searchValue, handleSearchChange] = useInput();
  const isTablet = useMediaQuery('(min-width: 576px)');

  const handleAccountEdit = (account: AccountType) => {
    return () => onAccountEdit(account);
  };

  const handleAccountCopy = (account: AccountType) => {
    return () => onAccountShowInvite(account);
  };

  const handleAccountChat = () => {};

  const renderLoader = () => (
    <>
      {new Array(5).fill(1).map((_, i) => (
        <ContentLoader
          width="100%"
          height={isTablet ? 56 : 48}
          viewBox={`0 0 100 ${isTablet ? '56' : '48'}`}
          className={s.AccountsView__cardMargin}
          key={i}
          preserveAspectRatio="none"
          title="">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height={isTablet ? 56 : 48} />
        </ContentLoader>
      ))}
    </>
  );

  const [normalAccounts, pendingToInviteAccounts] = useMemo(() => {
    const normalAccounts: AccountType[] = [];
    const pendingToInviteAccounts: AccountType[] = [];

    accounts?.forEach((a) => {
      if (normalizeString(a.name || 'No name').includes(normalizeString(searchValue))) {
        a.is_pending_invite ? pendingToInviteAccounts.push(a) : normalAccounts.push(a);
      }
    });

    return [normalAccounts, pendingToInviteAccounts];
  }, [accounts, searchValue]);

  return (
    <>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        containerClassName={s.AccountsView__searchInput}
        disabled={isLoading}
      />

      {!isLoading ? (
        <>
          {normalAccounts?.map((a) => (
            <AccountCard
              key={a.id}
              name={a.name || 'No name'}
              onChat={currentAccountId !== a.id ? handleAccountChat : undefined}
              onEdit={currentAccountId !== a.id ? handleAccountEdit(a) : undefined}
              containerClassName={s.AccountsView__cardMargin}
            />
          ))}

          {!!pendingToInviteAccounts.length && (
            <>
              <Text
                text="Pending to respond"
                variant={TextPropsVariantsEnum.CAPTION_M}
                color="textSecondary"
                className={s.AccountsView__title}
              />

              {pendingToInviteAccounts.map((a) => (
                <AccountCard
                  key={a.id}
                  name={a.name || 'No name'}
                  onCopy={a.invite?.public_uuid ? handleAccountCopy(a) : undefined}
                  onEdit={currentAccountId !== a.id ? handleAccountEdit(a) : undefined}
                  containerClassName={s.AccountsView__cardMargin}
                />
              ))}
            </>
          )}
        </>
      ) : (
        renderLoader()
      )}
    </>
  );
};
