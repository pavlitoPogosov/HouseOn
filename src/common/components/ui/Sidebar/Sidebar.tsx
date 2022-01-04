import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { pathToRegexp } from 'path-to-regexp';

import Tippy from '@tippyjs/react/headless';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { CircleProgress, ECircleProgressStates } from 'common/components/ui/CircleProgress/CircleProgress';
import { HouseDataBlock } from 'common/components/ui/HouseDataBlock/HouseDataBlock';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import {
  CHAT_PAGE_ROUTE,
  HOUSE_DATA_DOCUMENTS_ROUTE,
  HOUSE_DATA_FOLDER_PAGE_ROUTE,
  HOUSE_DATA_INBOX_ROUTE,
  HOUSE_DATA_INDEX_PAGE_ROUTE,
  HOUSE_PAGE_ROUTE,
  HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE,
  HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE,
  HOUSE_TEAM_PAGE_ROUTE,
  INDEX_PAGE_ROUTE,
  PROJECTS_PAGE_ROUTE,
  PROJECTS_PAGE_SINGLE_PROJECT,
  SETTINGS_PROFILE_PAGE_ROUTE,
  SUBSCRIPTION_PAGE_ROUTE,
  SUPPORT_PAGE_ROUTE,
  TASKS_CREATE_ROUTE,
  TASKS_PAGE_ROUTE
} from 'utils/routes';

import { ReactComponent as ArrowLeftIcon } from './icons/arrowLeft.svg';
import { ReactComponent as ChatIcon } from './icons/chat.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as HouseDataIcon } from './icons/houseData.svg';
import { ReactComponent as HouseTeamIcon } from './icons/houseTeam.svg';
import { ReactComponent as ProfileIcon } from './icons/profile.svg';
import { ReactComponent as ProjectsIcon } from './icons/projects.svg';
import { ReactComponent as SubscriptionIcon } from './icons/subscription.svg';
import { ReactComponent as SupportIcon } from './icons/support.svg';

import s from './Sidebar.module.scss';

export interface SidebarLink {
  activeRegexp: ReturnType<typeof pathToRegexp>;
  href: string;
  icon: JSX.Element;
  tooltipText: string;
  topDivider?: boolean;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    activeRegexp: pathToRegexp([INDEX_PAGE_ROUTE, HOUSE_PAGE_ROUTE]),
    href: INDEX_PAGE_ROUTE,
    icon: <HomeIcon />,
    tooltipText: 'Home'
  },
  {
    activeRegexp: pathToRegexp([
      PROJECTS_PAGE_ROUTE,
      PROJECTS_PAGE_SINGLE_PROJECT,
      TASKS_PAGE_ROUTE,
      TASKS_CREATE_ROUTE
    ]),
    href: PROJECTS_PAGE_ROUTE,
    icon: <ProjectsIcon />,
    tooltipText: 'Projects and Tasks'
  },
  {
    activeRegexp: pathToRegexp([
      HOUSE_TEAM_PAGE_ROUTE,
      HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE,
      HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE
    ]),
    href: HOUSE_TEAM_PAGE_ROUTE,
    icon: <HouseTeamIcon />,
    tooltipText: 'HouseTeam'
  },
  {
    activeRegexp: pathToRegexp([CHAT_PAGE_ROUTE]),
    href: CHAT_PAGE_ROUTE,
    icon: <ChatIcon />,
    tooltipText: 'Chat'
  },
  {
    activeRegexp: pathToRegexp([SUBSCRIPTION_PAGE_ROUTE]),
    href: SUBSCRIPTION_PAGE_ROUTE,
    icon: <SubscriptionIcon />,
    tooltipText: 'Subscription'
  },
  {
    activeRegexp: pathToRegexp([
      HOUSE_DATA_INDEX_PAGE_ROUTE,
      HOUSE_DATA_FOLDER_PAGE_ROUTE,
      HOUSE_DATA_INBOX_ROUTE,
      HOUSE_DATA_DOCUMENTS_ROUTE
    ]),
    href: HOUSE_DATA_INDEX_PAGE_ROUTE,
    icon: <HouseDataIcon />,
    tooltipText: 'HouseData'
  },
  {
    activeRegexp: pathToRegexp([SETTINGS_PROFILE_PAGE_ROUTE]),
    href: SETTINGS_PROFILE_PAGE_ROUTE,
    icon: <ProfileIcon />,
    tooltipText: 'Profile',
    topDivider: true
  },
  {
    activeRegexp: pathToRegexp([SUPPORT_PAGE_ROUTE]),
    href: SUPPORT_PAGE_ROUTE,
    icon: <SupportIcon />,
    tooltipText: 'Support'
  }
];

export interface SidebarProps {
  isTablet?: boolean;
  onClickCloseIcon?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isTablet, onClickCloseIcon }) => {
  const location = useLocation();

  const renderTooltipContent = (text: string) => {
    return () => (
      <div className={s.Sidebar__itemTootlipWrapper}>
        <div className={s.Sidebar__itemTootlip}>
          <ArrowLeftIcon className={s.Sidebar__itemArrow} />

          {text}
        </div>
      </div>
    );
  };

  const renderSidebarItem = (item: SidebarLink) => {
    const icon = (
      <span className={clsx(s.Sidebar__icon, item.activeRegexp.test(location.pathname) && s.Sidebar__icon_active)}>
        {item.icon}
      </span>
    );

    if (isTablet) {
      return (
        <>
          {icon}

          <Text
            as="span"
            className={s.Sidebar__itemText}
            color="white"
            text={item.tooltipText}
            variant={TextPropsVariantsEnum.BODY_L}
          />
        </>
      );
    }

    return (
      <Tippy offset={[0, -38]} render={renderTooltipContent(item.tooltipText)}>
        {icon}
      </Tippy>
    );
  };

  return (
    <aside
      className={clsx(s.Sidebar__container, {
        [s.desktop]: !isTablet,
        [s.tablet]: isTablet
      })}>
      <nav
        className={clsx(s.Sidebar__inner, {
          [s.desktop]: !isTablet,
          [s.tablet]: isTablet
        })}>
        {isTablet && (
          <IconCircle
            className={s.Sidebar__closeIcon}
            height={32}
            icon={<CloseIcon />}
            onClick={onClickCloseIcon}
            width={32}
          />
        )}

        <ul>
          {SIDEBAR_LINKS.map((item) => (
            <React.Fragment key={item.href}>
              {item.topDivider && <div className={s.Sidebar__divider} />}

              <li className={s.Sidebar__item}>
                <Link className={s.Sidebar__itemLink} to={item.href}>
                  {renderSidebarItem(item)}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>

        {isTablet && (
          <HouseDataBlock containerClassName={s.Sidebar__houseDataBlock}>
            <div className={s.Sidebar__houseDataBlockHeader}>
              <Text
                className={s.Sidebar__houseDataBlockTitle}
                color="white"
                text="Fill in HouseData with data"
                variant={TextPropsVariantsEnum.BODY_L}
              />

              <CircleProgress
                color={ECircleProgressStates.GREEN}
                percentage={20}
                size={52}
                strokeWidth={6}
                textClassName={s.Sidebar__houseDataProgressText}
              />
            </div>

            <Text
              as="div"
              className={s.Sidebar__houseDataBlockFooter}
              color="white"
              variant={TextPropsVariantsEnum.BODY_M}>
              Start
              <ChevronRightIcon />
            </Text>
          </HouseDataBlock>
        )}
      </nav>
    </aside>
  );
};
