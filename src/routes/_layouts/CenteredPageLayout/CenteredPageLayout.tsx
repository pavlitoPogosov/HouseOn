import React from 'react';

import clsx from 'clsx';

import { Logo } from 'common/components/ui/Logo/Logo';
import { MobileMenu } from 'common/components/ui/MobileMenu/MobileMenu';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SelectHouseHoldGlobal } from 'common/components/ui/Select';
import { Sidebar } from 'common/components/ui/Sidebar/Sidebar';
import { UserControlsPanel } from 'common/components/ui/UserControlsPanel/UserControlsPanel';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './CenteredPageLayout.module.scss';

export interface CenteredPageLayoutProps {
  wrapperClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
  mobileQuery?: string;
}

export const CenteredPageLayout: React.FC<CenteredPageLayoutProps> = ({
  wrapperClassName,
  contentClassName,
  headerClassName,
  mainClassName,
  children,
  mobileQuery = '(max-width: 997px)'
}) => {
  const isMobile = useMediaQuery(mobileQuery);

  return (
    <div className={clsx(s.CenteredPageLayout__wrapper, wrapperClassName)}>
      {!isMobile && <Sidebar />}

      <div className={clsx(s.CenteredPageLayout__content, contentClassName)}>
        <header className={clsx(s.CenteredPageLayout__header, headerClassName)}>
          {isMobile ? <MobileMenu /> : <Logo isLink />}

          {!isMobile && (
            <div className={s.CenteredPageLayout__headerControls}>
              <SearchInput containerClassName={s.CenteredPageLayout__searchInput} />
              <SelectHouseHoldGlobal />
            </div>
          )}

          <UserControlsPanel isMobile={isMobile} />
        </header>

        <main className={clsx(s.CenteredPageLayout__main, mainClassName)}>{children}</main>
      </div>
    </div>
  );
};
