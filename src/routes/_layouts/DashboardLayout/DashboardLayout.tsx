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

import s from './DashboardLayout.module.scss';

export interface IDashboardLayoutProps {
  contentClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
  mobileQuery?: string;
  wrapperClassName?: string;
}

export const DashboardLayout: React.FC<IDashboardLayoutProps> = (props) => {
  const {
    children,
    contentClassName,
    headerClassName,
    mainClassName,
    mobileQuery = '(max-width: 997px)',
    wrapperClassName
  } = props;

  const isMobile = useMediaQuery(mobileQuery);

  return (
    <ErrorBoundary>
      <div className={clsx(s.DashboardLayout__wrapper, wrapperClassName)}>
        {!isMobile && <Sidebar />}

        <div className={clsx(s.DashboardLayout__content, contentClassName)}>
          <header className={clsx(s.DashboardLayout__header, headerClassName)}>
            {!isMobile ? (
              <>
                <Logo isLink />

                <div className={s.DashboardLayout__searchWrapper}>
                  <SearchInput containerClassName={s.DashboardLayout__search} />

                  <SelectHouseHoldGlobal />
                </div>
              </>
            ) : (
              <MobileMenu />
            )}

            <UserControlsPanel isMobile={isMobile} />
          </header>

          <main className={clsx(mainClassName)}>{children}</main>
        </div>
      </div>
    </ErrorBoundary>
  );
};
