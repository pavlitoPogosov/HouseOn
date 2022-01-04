import React, { useMemo } from 'react';

import clsx from 'clsx';

import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { SortByPopup } from 'common/components/ui/SortByPopup/SortByPopup';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { setCurrentAccountIdAC } from 'redux/slices/accountsSlice/actionCreators';

import s from './SelectHouseHoldGlobal.module.scss';

export type HouseHold = {
  id: string;
  avatar: string;
  name: string;
};

export interface SelectHouseHoldGlobalProps {
  containerClassName?: string;
}

export const SelectHouseHoldGlobal: React.FC<SelectHouseHoldGlobalProps> = ({ containerClassName }) => {
  const { currentAccountId, availableAccounts } = useTypedSelector((s) => s.accounts);
  const dispatch = useTypedDispatch();

  const mappedHouses: ISelectPrimaryOption[] = useMemo(() => {
    return (availableAccounts || []).map((a) => ({
      text: a?.house.title || '',
      value: a?.id || '',
      image: ''
    }));
  }, [availableAccounts]);

  const handleHouseSelect = (option: ISelectPrimaryOption) => {
    if (option.value === currentAccountId) return;

    dispatch(setCurrentAccountIdAC(option.value));
  };

  const currentHouse = mappedHouses?.find((h) => h.value === currentAccountId);

  return (
    <SortByPopup
      onChange={handleHouseSelect}
      selectedOption={{
        text: currentHouse?.text || '',
        value: currentHouse?.value || '',
        image: ''
      }}
      options={mappedHouses}
      containerClassName={clsx(s.SelectHouseHoldGlobal__container, containerClassName)}
      size="sm"
    />
  );
};
