import React, { useMemo, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { AdminAddDialog } from 'common/components/ui/_dialogs/AdminAddDialog/AdminAddDialog';
import { GuestAddDialog } from 'common/components/ui/_dialogs/GuestAddDialog/GuestAddDialog';
import { Button } from 'common/components/ui/Button/Button';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { UsualTabs, IUsualTab } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useInput } from 'common/hooks/useInput';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_MODAL_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountFilterInput, AccountRolesEnum, AccountType } from 'graphql/types';
import { normalizeString } from 'utils/stringUtils';

import { MainTabMemberCard } from './MainTabMemberCard/MainTabMemberCard';

import s from './MainTabMembers.module.scss';

export interface MainTabMembersProps {}

const TABS: IUsualTab[] = [
  { text: 'Admins', value: AccountRolesEnum.Admin },
  { text: 'Guests', value: AccountRolesEnum.Guest }
];

enum ModalTypesEnum {
  ADMIN = 'admin',
  GUEST = 'guest'
}

export const MainTabMembers: React.FC<MainTabMembersProps> = () => {
  const [activeTab, setActiveTab] = useState<string>(AccountRolesEnum.Admin);
  const [searchValue, handleSearchChange] = useInput();

  const tooltipToggler = useToggle();
  const [addModalType, setAddModalType] = useState<ModalTypesEnum | null>(null);

  const intl = useIntl();

  const { data: accountsResp, loading: loadingAccounts } = useQueryWithError<
    { result: AccountType[] },
    { input: AccountFilterInput }
  >(QUERY_MODAL_ACCOUNTS, {
    variables: {
      input: {
        roles: [activeTab as AccountRolesEnum],
        is_deactivated: false
      }
    }
  });

  const [normalAccounts, pendingToInviteAccounts] = useMemo(() => {
    const normalAccounts: AccountType[] = [];
    const pendingToInviteAccounts: AccountType[] = [];

    accountsResp?.result?.forEach((a) => {
      if (normalizeString(a.name || 'No name').includes(normalizeString(searchValue))) {
        a.is_pending_invite ? pendingToInviteAccounts.push(a) : normalAccounts.push(a);
      }
    });

    return [normalAccounts, pendingToInviteAccounts];
  }, [accountsResp, searchValue]);

  const renderLoader = () => (
    <>
      {new Array(5).fill(1).map((_, i) => (
        <ContentLoader
          key={i}
          width="100%"
          height="56"
          viewBox="0 0 100 56"
          preserveAspectRatio="none"
          className={s.MainTabMembers__card}>
          <rect x="0" y="0" rx="2" ry="2" width="100%" height="56" />
        </ContentLoader>
      ))}
    </>
  );

  const handleTooltipItemClick = (type: ModalTypesEnum) => {
    return () => {
      setAddModalType(type);
      tooltipToggler.toggle();
    };
  };

  const handleModalClose = () => {
    setAddModalType(null);
  };

  const renderModalContent = () => (
    <div className={s.MainTabMembers__tooltip}>
      <div onClick={handleTooltipItemClick(ModalTypesEnum.ADMIN)} className={s.MainTabMembers__toltipItem}>
        Admin
      </div>

      <div onClick={handleTooltipItemClick(ModalTypesEnum.GUEST)} className={s.MainTabMembers__toltipItem}>
        Guest
      </div>
    </div>
  );

  return (
    <div className={s.MainTabMembers__container}>
      <Text
        text={intl.formatMessage({ id: 'settings.member.title', defaultMessage: 'Members' })}
        variant={TextPropsVariantsEnum.H3}
        className={s.MainTabMembers__title}
      />

      <div className={s.MainTabMembers__header}>
        <UsualTabs tabs={TABS} value={activeTab} onChange={setActiveTab} />

        <SearchInput
          placeholder={intl.formatMessage({
            id: 'app.search',
            defaultMessage: 'Search'
          })}
          containerClassName={s.MainTabMembers__searchInput}
          onChange={handleSearchChange}
          value={searchValue}
        />

        <Tippy
          render={renderModalContent}
          offset={[-40, -120]}
          visible={tooltipToggler.value}
          onClickOutside={tooltipToggler.unset}
          interactive>
          <div>
            <Button
              variant="secondary"
              size="s"
              color="orange"
              className={s.MainTabMembers__btn}
              onClick={tooltipToggler.set}>
              Add
            </Button>
          </div>
        </Tippy>
      </div>

      {!loadingAccounts ? (
        <>
          {normalAccounts?.map((a) => (
            <MainTabMemberCard key={a.id} account={a} containerClassName={s.MainTabMembers__card} />
          ))}

          {!!pendingToInviteAccounts.length && (
            <>
              <Text
                text="Pending to respond"
                variant={TextPropsVariantsEnum.CAPTION_M}
                color="textSecondary"
                className={s.MainTabMembers__cardTitle}
              />

              {pendingToInviteAccounts.map((a) => (
                <MainTabMemberCard key={a.id} account={a} containerClassName={s.MainTabMembers__card} />
              ))}
            </>
          )}
        </>
      ) : (
        renderLoader()
      )}

      {addModalType === ModalTypesEnum.ADMIN && <AdminAddDialog isOpen onClose={handleModalClose} />}

      {addModalType === ModalTypesEnum.GUEST && <GuestAddDialog isOpen onClose={handleModalClose} />}
    </div>
  );
};
