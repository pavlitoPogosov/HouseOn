import React, { useState } from 'react';

import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';

import { PeriodicitySelect, PeriodicitySelectValue } from '../../PeriodicitySelect/PeriodicitySelect';

import s from './PeriodicityTabsDropdown.module.scss';

export interface PeriodicityTabsDropdownProps {
  value: PeriodicitySelectValue;
  onChange: (newValue: PeriodicitySelectValue) => void;
}

export const PeriodicityTabsDropdown: React.FC<PeriodicityTabsDropdownProps> = ({ value, onChange }) => {
  const [newValue, setNewValue] = useState(value);

  const handleSave = () => {
    onChange(newValue);
  };

  return (
    <div className={s.PeriodicityTabsDropdown__container}>
      <PeriodicitySelect value={newValue} onChange={setNewValue} />

      <NavigationLink isUnderline as="div" onClick={handleSave} className={s.PeriodicityTabsDropdown__save}>
        Save
      </NavigationLink>
    </div>
  );
};
