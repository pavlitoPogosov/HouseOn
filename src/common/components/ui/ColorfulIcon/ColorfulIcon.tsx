import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as CaseIcon } from 'assets/icons/case.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg';
import { ReactComponent as ExclamationPointIcon } from 'assets/icons/exclamationPoint.svg';
import { ReactComponent as GeomarkIcon } from 'assets/icons/geomark.svg';
import { ReactComponent as GuestIcon } from 'assets/icons/guest.svg';
import { ReactComponent as GuestSettingsIcon } from 'assets/icons/guestSettings.svg';
import { ReactComponent as LightningIcon } from 'assets/icons/lightning.svg';
import { ReactComponent as PencilSecondaryIcon } from 'assets/icons/pencil-secondary.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as RocketIcon } from 'assets/icons/rocket.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as StarsIcon } from 'assets/icons/stars.svg';
import { ReactComponent as StopIcon } from 'assets/icons/stop.svg';
import { ReactComponent as TaskIcon } from 'assets/icons/task.svg';

import { ReactComponent as CheckListIcon } from './icons/checkList.svg';
import { ReactComponent as HistoryIcon } from './icons/historyTab.svg';
import { ReactComponent as InstructionIcon } from './icons/instructions.svg';
import { ReactComponent as LetterIcon } from './icons/letter.svg';

import s from './ColorfulIcon.module.scss';

// FIX stars icon, refactor icons system
export enum ColorfulIconTypes {
  CHECKLIST = 'CHECKLIST',
  CLOCK = 'CLOCK',
  CLOSE = 'CLOSE',
  COMMENT = 'COMMENT',
  EXCLAMATION_POINT = 'EXCLAMATION_POINT',
  GEOMARK = 'GEOMARK',
  GUEST = 'GUEST',
  GUEST_SETTINGS = 'GUEST_SETTINGS',
  HISTORY = 'HISTORY',
  INSTRUCTION = 'INSTRUCTION',
  LETTER = 'LETTER',
  LIGHTNING = 'LIGHTNING',
  CASE = 'CASE',
  DASHBOARD = 'DASHBOARD',
  PLAY = 'PLAY',
  STOP = 'STOP',
  PENCIL = 'PENCIL',
  PENCIL_SECONDARY = 'PENCIL_SECONDARY',
  BACK = 'BACK',
  PHONE = 'PHONE',
  PLUS = 'PLUS',
  ROCKET = 'ROCKET',
  SETTINGS = 'SETTINGS',
  STARS = 'STARS',
  TASK = 'TASK'
}

export enum ColorfulIconVariants {
  BLUE = 'blue',
  BROWN = 'brown',
  GRAY = 'gray',
  GREEN = 'green',
  PURPLE = 'purple',
  GRAY_SECONDARY = 'gray_secondary',
  ORANGE = 'orange',
  RED = 'red',
  YELLOW = 'yellow'
}

const ICONS_MAP = {
  [ColorfulIconTypes.ROCKET]: <RocketIcon />,
  [ColorfulIconTypes.PHONE]: <PhoneIcon />,
  [ColorfulIconTypes.GEOMARK]: <GeomarkIcon />,
  [ColorfulIconTypes.HISTORY]: <HistoryIcon />,
  [ColorfulIconTypes.COMMENT]: <CommentIcon />,
  [ColorfulIconTypes.INSTRUCTION]: <InstructionIcon />,
  [ColorfulIconTypes.SETTINGS]: <SettingsIcon />,
  [ColorfulIconTypes.STARS]: <StarsIcon />,
  [ColorfulIconTypes.GUEST]: <GuestIcon />,
  [ColorfulIconTypes.GUEST_SETTINGS]: <GuestSettingsIcon />,
  [ColorfulIconTypes.LETTER]: <LetterIcon />,
  [ColorfulIconTypes.EXCLAMATION_POINT]: <ExclamationPointIcon />,
  [ColorfulIconTypes.CLOSE]: <CloseIcon />,
  [ColorfulIconTypes.CHECKLIST]: <CheckListIcon />,
  [ColorfulIconTypes.TASK]: <TaskIcon />,
  [ColorfulIconTypes.LIGHTNING]: <LightningIcon />,
  [ColorfulIconTypes.CLOCK]: <ClockIcon />,
  [ColorfulIconTypes.PLUS]: <PlusIcon />,
  [ColorfulIconTypes.CASE]: <CaseIcon />,
  [ColorfulIconTypes.DASHBOARD]: <DashboardIcon />,
  [ColorfulIconTypes.PLAY]: <PlayIcon />,
  [ColorfulIconTypes.STOP]: <StopIcon />,
  [ColorfulIconTypes.PENCIL]: <PencilIcon />,
  [ColorfulIconTypes.PENCIL_SECONDARY]: <PencilSecondaryIcon />,
  [ColorfulIconTypes.BACK]: <ArrowIcon />
};

export interface ColorfulIconProps {
  className?: string;
  icon: ColorfulIconTypes;
  isInActive?: boolean;
  onClick?: () => void;

  style?: React.CSSProperties;

  variant?: ColorfulIconVariants;
}

export const ColorfulIcon: React.FC<ColorfulIconProps> = ({ className, icon, isInActive, onClick, style, variant }) => {
  const isPhone = icon === ColorfulIconTypes.PHONE;
  const isGeomark = icon === ColorfulIconTypes.GEOMARK;
  const isHistory = icon === ColorfulIconTypes.HISTORY;
  const isComment = icon === ColorfulIconTypes.COMMENT;
  const isInstruction = icon === ColorfulIconTypes.INSTRUCTION;
  const isSettings = icon === ColorfulIconTypes.SETTINGS;
  const isGuest = icon === ColorfulIconTypes.GUEST;
  const isGuestSettings = icon === ColorfulIconTypes.GUEST_SETTINGS;
  const isLetter = icon === ColorfulIconTypes.LETTER;
  const isStars = icon === ColorfulIconTypes.STARS;
  const isClose = icon === ColorfulIconTypes.CLOSE;
  const isCheckList = icon === ColorfulIconTypes.CHECKLIST;
  const isExclamationPoint = icon === ColorfulIconTypes.EXCLAMATION_POINT;
  const isTask = icon === ColorfulIconTypes.TASK;
  const isLightning = icon === ColorfulIconTypes.LIGHTNING;
  const isBack = icon === ColorfulIconTypes.BACK;

  const correctClassName = variant
    ? s[variant]
    : clsx(
        isInActive
          ? s.default
          : {
              [s.green]: isPhone || isLetter || isStars,
              [s.darkGreen]: isCheckList,
              [s.blue]: isGeomark,
              [s.brown]: isHistory,
              [s.yellow]: isComment || isLightning,
              [s.purple]: isInstruction || isGuest || isGuestSettings,
              [s.gray]: isSettings || isClose || isTask,
              [s.red]: isExclamationPoint,
              [s.back]: isBack
            }
      );

  return (
    <div className={clsx(s.ColorfulIcon__container, correctClassName, className)} onClick={onClick} style={style}>
      {ICONS_MAP[icon]}
    </div>
  );
};
