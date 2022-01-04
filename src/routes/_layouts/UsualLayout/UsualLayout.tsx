import React from 'react';

import clsx from 'clsx';

import { Logo } from 'common/components/ui/Logo/Logo';
import { MobileMenu } from 'common/components/ui/MobileMenu/MobileMenu';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SelectHouseHoldGlobal } from 'common/components/ui/Select';
import { Sidebar } from 'common/components/ui/Sidebar/Sidebar';
import { UserControlsPanel } from 'common/components/ui/UserControlsPanel/UserControlsPanel';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './UsualLayout.module.scss';

export interface UsualLayoutProps {
  wrapperClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
  mobileQuery?: string;
  hideSearchBlock?: boolean;
}

export const UsualLayout: React.FC<UsualLayoutProps> = ({
  contentClassName,
  headerClassName,
  mainClassName,
  wrapperClassName,
  children,
  hideSearchBlock,
  mobileQuery = '(max-width: 997px)'
}) => {
  const isMobile = useMediaQuery(mobileQuery);

  return (
    <div className={clsx(s.UsualLayout__wrapper, wrapperClassName)}>
      {!isMobile && <Sidebar />}

      <div className={clsx(s.UsualLayout__content, contentClassName)}>
        <header className={clsx(s.UsualLayout__header, headerClassName)}>
          {!isMobile ? (
            <>
              <Logo isLink />

              {!hideSearchBlock && (
                <div className={s.UsualLayout__searchWrapper}>
                  <SearchInput containerClassName={s.UsualLayout__search} />
                  <SelectHouseHoldGlobal />
                </div>
              )}
            </>
          ) : (
            <MobileMenu />
          )}

          <UserControlsPanel isMobile={isMobile} />
        </header>

        <main className={clsx(mainClassName)}>{children}</main>
      </div>
    </div>
  );
};
