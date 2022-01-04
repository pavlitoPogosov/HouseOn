import React, { useState } from 'react';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './LastActivities.module.scss';

export interface LastActivitiesProps {}

export const LastActivities: React.FC<LastActivitiesProps> = () => {
  const [showCount, setShowCount] = useState<number>(4);

  const items = new Array(showCount).fill(1).map((_, i) => (
    <div key={i} className={s.LastActivities__item}>
      <NavigationLink href="#" className={s.LastActivities__link}>
        Mikhail Karlov
      </NavigationLink>
      <Text className={s.LastActivities__text} variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
        has changed the periodicity to every month
      </Text>
      <div className={s.LastActivities__dot} />
      <Text className={s.LastActivities__time} variant={TextPropsVariantsEnum.BODY_M} color="gray">
        1 hour ago
      </Text>
    </div>
  ));

  return (
    <div className={s.LastActivities}>
      {items}
      <div className={s.LastActivities__footer}>
        <NavigationLink onClick={() => setShowCount(12)} isUnderline>
          Show all <ArrowIcon className={s.LastActivities__icon} />
        </NavigationLink>
      </div>
    </div>
  );
};
