import React from 'react';

import clsx from 'clsx';

import { Logo } from 'common/components/ui/Logo/Logo';
import { MobileMenu } from 'common/components/ui/MobileMenu/MobileMenu';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SelectHouseHoldGlobal } from 'common/components/ui/Select';
import { Sidebar } from 'common/components/ui/Sidebar/Sidebar';
import { UserControlsPanel } from 'common/components/ui/UserControlsPanel/UserControlsPanel';
import { ErrorBoundary } from 'common/components/utils/ErrorBoundary';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './AsideLayoutLeft.module.scss';

export interface IAsideLayoutLeftProps {
  asideClassName?: string;
  asideCmp: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  isHouseSelectHidden?: boolean;
  isSearchHidden?: boolean;
  logoClassName?: string;
  mainClassName?: string;
  mainCmp: React.ReactNode;
  mobileQuery?: string;
  sidebarQuery?: string;
  wrapperClassName?: string;
}

export const AsideLayoutLeft: React.FC<IAsideLayoutLeftProps> = (props) => {
  const {
    asideClassName,
    asideCmp,
    contentClassName,
    headerClassName,
    isHouseSelectHidden,
    isSearchHidden,
    logoClassName,
    mainClassName,
    mainCmp,
    mobileQuery = '(max-width: 1199px)',
    sidebarQuery = '(max-width: 1199px)',
    wrapperClassName
  } = props;

  const isMobile = useMediaQuery(mobileQuery);
  const isSidebarHidden = useMediaQuery(sidebarQuery);

  return (
    <ErrorBoundary>
      <div className={clsx(s.AsideLayoutLeft__wrapper, wrapperClassName)}>
        {!isSidebarHidden && <Sidebar />}

        {!isMobile && (
          <aside className={clsx(s.AsideLayoutLeft__aside, asideClassName)}>
            <Logo className={logoClassName} isLink />

            {asideCmp}
          </aside>
        )}

        <div className={clsx(s.AsideLayoutLeft__main, isMobile && s.mobile, mainClassName)}>
          <header className={clsx(s.AsideLayoutLeft__header, headerClassName)}>
            {!isMobile ? (
              <div className={s.AsideLayoutLeft__searchWrapper}>
                {!isSearchHidden && <SearchInput containerClassName={s.AsideLayoutLeft__search} />}

                {!isHouseSelectHidden && <SelectHouseHoldGlobal />}
              </div>
            ) : (
              <MobileMenu />
            )}

            <UserControlsPanel isMobile={isMobile} />
          </header>

          <main className={clsx(contentClassName)}>{mainCmp}</main>
        </div>
      </div>
    </ErrorBoundary>
  );
};
