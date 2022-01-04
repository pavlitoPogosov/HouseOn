import React from 'react';

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { IPeriodicityTab } from 'variables/periodicityTabs';

import s from './PeriodicityTabsHint.module.scss';

export interface PeriodicityTabsHintProps {
  selectedTab: IPeriodicityTab;
  onEdit: () => void;
}

const PERIODICITY_HINT_TEXT = 'This task will be made once | since today';

export const PeriodicityTabsHint: React.FC<PeriodicityTabsHintProps> = ({ selectedTab, onEdit }) => {
  if (selectedTab.isDifferent) {
    return (
      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
        {PERIODICITY_HINT_TEXT.split('|')[0]}

        <span className={s.PeriodicityTabsHint__highlitedText}>
          {`every ${selectedTab.value.amount} ${selectedTab.value.period}${selectedTab.value.amount > 1 ? 's' : ''}`}
        </span>

        {PERIODICITY_HINT_TEXT.split('|')[1]}

        <span onClick={onEdit} className={s.PeriodicityTabsHint__link}>
          Edit
          <PencilIcon width={18} height={18} />
        </span>
      </Text>
    );
  }

  return (
    <Text variant={TextPropsVariantsEnum.BODY_M} color="textTretiary">
      {PERIODICITY_HINT_TEXT.replace('|', 'every ' + selectedTab.captionText)}
    </Text>
  );
};
