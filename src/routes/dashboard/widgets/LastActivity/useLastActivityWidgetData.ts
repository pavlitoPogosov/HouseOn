import React, { LegacyRef, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { TLastActivityWidgetProps } from './types.LastActivityWidget';

const fakeDataGenerator = () => {
  return MEMBERS.map((member, i) => ({
    activityAuthor: member,
    activityDate: 'Time ago',
    activityTarget: 'Target',
    activityText: 'activity description',
    comment:
      i % 3 !== 0
        ? undefined
        : "I won't take the time to tell you who Nietzsche was, but he was right. The world belongs to the strong - to the strong who are noble as well and who do not wallow in the swine-trough of trade and exchange"
  }));
};

/* TODO: подключить API */
export const useLastActivityWidgetData = (): TLastActivityWidgetProps => {
  const newActivityNumber = Math.floor(Math.random() * 10);
  /* TODO: заменить на автоматическое определение множественной формы из библиотеки локализации */
  const activityPlural = newActivityNumber === 1 ? 'activity' : 'activities';
  const buttonNewActivityLabel = `${newActivityNumber} ${activityPlural}`;

  const data = fakeDataGenerator();

  const [isScrolled, setScrolled] = useState(false);
  const [isButtonClicked, setButtonClicked] = useState(newActivityNumber === 0);
  const scrollRef = useRef<React.RefObject<Scrollbars> | null>(null) as React.RefObject<Scrollbars>;

  const onActivityButtonClick = () => {
    scrollRef?.current?.scrollToBottom?.();
    setButtonClicked(true);
  };
  const onScroll = () => setScrolled(true);

  return {
    buttonNewActivityLabel,
    data,
    isButtonClicked,
    isScrolled,
    onActivityButtonClick,
    onScroll,
    scrollRef: scrollRef as LegacyRef<Scrollbars> | null
  };
};
