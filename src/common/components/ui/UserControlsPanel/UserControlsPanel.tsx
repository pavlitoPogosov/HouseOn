import React, { useCallback, useEffect } from 'react';

import clsx from 'clsx';

// eslint-disable-next-line
import { useToggle } from '@proscom/ui-react';
// eslint-disable-next-line
import Tippy from '@tippyjs/react/headless';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { useDisableOverflow } from 'common/hooks/useDisableOverflow';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { Slide } from '../_animations/Slide/Slide';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as LiveLineIcon } from './icons/liveLine.svg';
import { notificationsData } from './temporaryData';
import { UserAvatar } from './UserAvatar/UserAvatar';
import { UserNotifications } from './UserNotifications/UserNotifications';

import s from './UserControlsPanel.module.scss';

export interface IUserControlsPanelProps {
  containerClassName?: string;
  isMobile?: boolean;
}

const windowHasOrientation = () => {
  return !!window.screen.orientation;
};

// FIX think about refactoring
export const UserControlsPanel: React.FC<IUserControlsPanelProps> = (props) => {
  const { containerClassName, isMobile } = props;

  const isTablet = useMediaQuery('(min-width: 768px)');

  const notificationsToggler = useToggle();

  const shouldDisableOverflowNotifications = !isTablet && notificationsToggler.value;
  useDisableOverflow(shouldDisableOverflowNotifications);

  useEffect(() => {
    const handleOrientationChange = () => {
      notificationsToggler.unset();
    };

    windowHasOrientation()
      ? window.screen.orientation.addEventListener('change', handleOrientationChange)
      : document.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      windowHasOrientation()
        ? window.screen.orientation.removeEventListener('change', handleOrientationChange)
        : document.removeEventListener('orientationchange', handleOrientationChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconsSize = isMobile ? 44 : 32;

  const renderNotificationsContent = useCallback(() => {
    if (isTablet) {
      const renderNotificationsDesktop = () => {
        return <UserNotifications notifications={notificationsData} />;
      };

      return (
        <Tippy
          interactive
          onClickOutside={notificationsToggler.unset}
          render={renderNotificationsDesktop}
          visible={notificationsToggler.value}
        >
          <div className={s.UserControlsPanel__iconCircle_wrapper}>
            <div
              className={clsx(s.UserControlsPanel__triangle, {
                [s.UserControlsPanel__triangle_show]: notificationsToggler.value
              })}
            />

            <IconCircle
              className={s.UserControlsPanel__iconCircle}
              height={iconsSize}
              icon={<BellIcon />}
              onClick={notificationsToggler.toggle}
              shadow="l"
              width={iconsSize}
            />
          </div>
        </Tippy>
      );
    }

    return (
      <>
        <IconCircle
          className={s.UserControlsPanel__iconCircle}
          height={iconsSize}
          icon={<BellIcon />}
          onClick={notificationsToggler.toggle}
          shadow="l"
          width={iconsSize}
        />

        <Slide
          animation="top"
          className={s.UserControlsPanel__notificationsSlide}
          isActive={notificationsToggler.value}
        >
          <div className={s.UserControlsPanel__notifications_wrapper}>
            <div className={s.UserControlsPanel__notifications_header}>
              <CloseIcon onClick={notificationsToggler.unset} />
            </div>

            <UserNotifications
              containerClassName={s.UserControlsPanel__notificationsContainer}
              notifications={notificationsData}
            />
          </div>
        </Slide>
      </>
    );
  }, [isTablet, notificationsToggler]);

  return (
    <div className={clsx(s.UserControlsPanel__container, containerClassName)}>
      {isMobile && (
        <IconCircle
          className={s.UserControlsPanel__iconCircle}
          height={44}
          icon={<SearchIcon />}
          shadow="l"
          width={44}
        />
      )}

      <IconCircle
        className={s.UserControlsPanel__iconCircle}
        height={iconsSize}
        icon={<LiveLineIcon />}
        shadow="l"
        width={iconsSize}
      />

      {renderNotificationsContent()}

      <div className={s.UserControlsPanel__divider} />

      <UserAvatar
        hideInfoBlock={isMobile}
        infoBlockClassName={s.UserControlsPanel__infoBlock}
        name="Margaret Tyrell"
        role="Administrator"
      />
    </div>
  );
};
