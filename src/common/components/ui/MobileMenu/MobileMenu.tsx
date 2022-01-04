import React from 'react';

import clsx from 'clsx';

// eslint-disable-next-line
import { useToggle } from '@proscom/ui-react';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Drawer } from 'common/components/ui//Drawer/Drawer';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Sidebar } from 'common/components/ui/Sidebar/Sidebar';
import { useDisableOverflow } from 'common/hooks/useDisableOverflow';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { ReactComponent as BarsIcon } from './icons/bars.svg';
import { MobileMenuDrawer } from './MobileMenuDrawer/MobileMenuDrawer';

import s from './MobileMenu.module.scss';

export interface IMobileMenuProps {
  containerClassName?: string;
}

export const MobileMenu: React.FC<IMobileMenuProps> = ({ containerClassName }) => {
  const drawerToggler = useToggle();

  const isTablet = useMediaQuery('(min-width: 768px)');
  const isSmallHeight = useMediaQuery('(max-height: 682px)');
  const shouldOverlapDrawer = !isTablet && drawerToggler.value && !isSmallHeight;

  useDisableOverflow(drawerToggler.value);

  return (
    <>
      <div
        className={clsx(s.MobileMenu__container, { [s.mobileDrawer]: shouldOverlapDrawer }, containerClassName)}
        onClick={shouldOverlapDrawer ? drawerToggler.unset : drawerToggler.set}
      >
        <IconCircle
          className={s.MobileMenu__icon}
          height={44}
          icon={shouldOverlapDrawer ? <CloseIcon /> : <BarsIcon />}
          shadow="l"
          width={44}
        />
      </div>

      {isTablet && (
        <Drawer animation="left" isOpen={drawerToggler.value} onClose={drawerToggler.unset}>
          <Sidebar isTablet={isTablet} onClickCloseIcon={drawerToggler.unset} />
        </Drawer>
      )}

      {!isTablet && (
        <MobileMenuDrawer isOpen={drawerToggler.value} isSmallHeight={isSmallHeight} onClose={drawerToggler.unset} />
      )}
    </>
  );
};
