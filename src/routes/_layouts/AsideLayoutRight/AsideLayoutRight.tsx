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

import s from './AsideLayoutRight.module.scss';

export interface AsideLayoutRightProps {
  mainClassName?: string;
  asideClassName?: string;
  mobileQuery?: string;
  disableLogoLink?: boolean;
  mainCmp: React.ReactNode;
  asideCmp: React.ReactNode;
}

export const AsideLayoutRight: React.FC<AsideLayoutRightProps> = ({
  mainClassName,
  asideClassName,
  mainCmp,
  asideCmp,
  disableLogoLink,
  mobileQuery = '(max-width: 1199px)'
}) => {
  const isMobile = useMediaQuery(mobileQuery);

  return (
    <ErrorBoundary>
      <div className={s.AsideLayoutRight__wrapper}>
        {!isMobile && <Sidebar />}

        <div className={clsx(s.AsideLayoutRight__main, isMobile && s.mobile, mainClassName)}>
          <header className={s.AsideLayoutRight__header}>
            {!isMobile ? (
              <>
                <Logo isLink={!disableLogoLink} />

                <div className={s.AsideLayoutRight__searchWrapper}>
                  <SearchInput containerClassName={s.AsideLayoutRight__search} />
                  <SelectHouseHoldGlobal />
                </div>
              </>
            ) : (
              <MobileMenu />
            )}

            {isMobile && <UserControlsPanel containerClassName={s.AsideLayoutRight__mobileControlsPanel} isMobile />}
          </header>

          <main>{mainCmp}</main>
        </div>

        {!isMobile && (
          <aside className={clsx(s.AsideLayoutRight__aside, asideClassName)}>
            <UserControlsPanel />

            {asideCmp}
          </aside>
        )}
      </div>
    </ErrorBoundary>
  );
};
