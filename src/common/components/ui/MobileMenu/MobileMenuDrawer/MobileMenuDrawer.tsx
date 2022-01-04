import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { SIDEBAR_LINKS } from 'common/components/ui/Sidebar/Sidebar';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { MobileMenuHouseTabs } from './MobileMenuHouseTabs/MobileMenuHouseTabs';

import s from './MobileMenuDrawer.module.scss';

export interface MobileMenuDrawerProps {
  isOpen: boolean;
  isSmallHeight: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, isSmallHeight, onClose }) => {
  const location = useLocation();

  return (
    <Drawer
      animation="bottom"
      onClose={onClose}
      isOpen={isOpen}
      containerClassName={clsx(s.MobileMenuDrawer__container, isSmallHeight && s.smallHeight)}>
      {isSmallHeight && (
        <IconCircle
          width={32}
          height={32}
          icon={<CloseIcon />}
          onClick={onClose}
          shadow="l"
          className={s.MobileMenuDrawer__closeIcon}
        />
      )}

      <MobileMenuHouseTabs onSelect={onClose} />

      <nav>
        <ul>
          {SIDEBAR_LINKS.map((item) => (
            <React.Fragment key={item.href}>
              {item.topDivider && <div className={s.MobileMenuDrawer__divider} />}

              <li className={s.MobileMenuDrawer__listItem}>
                <Link
                  to={item.href}
                  className={clsx(s.MobileMenuDrawer__listItemLink, {
                    [s.active]: item.activeRegexp.test(location.pathname)
                  })}
                  onClick={onClose}>
                  {item.icon}

                  <Text
                    text={item.tooltipText}
                    as="span"
                    variant={TextPropsVariantsEnum.BODY_M}
                    className={s.MobileMenuDrawer__listItemText}
                  />
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
};
