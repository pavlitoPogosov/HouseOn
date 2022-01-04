import { useState } from 'react';

import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { StatusInputSaveValues } from 'common/components/ui/HomeStatus/StatusInput/StatusInput';
import { HouseStatusType } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

export const useHomeStatus = (initialValues: Pick<HouseStatusType, 'text' | 'title'>[] = []) => {
  const { authData } = useTypedSelector((s) => s.auth);

  const statusInputToggler = useToggle();
  const [statuses, setStatuses] = useState<Pick<HouseStatusType, 'text' | 'title' | 'expires_at'>[]>(initialValues);
  const [shownStatusIndex, setShownStatusIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const onAddStatus = (values: StatusInputSaveValues) => {
    setStatuses((prev) => [
      ...prev,
      {
        text: values.text,
        title: authData?.user.name || '',
        expires_at: values.expiresInDay ? moment().add(24, 'hours').startOf('day') : undefined
      }
    ]);
    setShownStatusIndex(statuses.length);
    statusInputToggler.unset();
  };

  const onEditStatus = (values: StatusInputSaveValues) => {
    setStatuses((prev) =>
      prev.map((s, i) => {
        if (i === shownStatusIndex) {
          return {
            ...s,
            text: values.text
          };
        }

        return s;
      })
    );

    setIsEdit(false);
    statusInputToggler.unset();
  };

  const onRemoveStatus = () => {
    setStatuses((prev) => prev.filter((_, i) => i !== shownStatusIndex));
    setShownStatusIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onStatusChange = (values: StatusInputSaveValues) => {
    if (isEdit) {
      onEditStatus(values);
    } else {
      onAddStatus(values);
    }
  };

  const onStatusIndexChange = (direction: number) => {
    setShownStatusIndex((prev) => prev + direction);
  };

  return {
    statuses,
    shownStatusIndex,
    setShownStatusIndex,
    isEdit,
    setIsEdit,
    onAddStatus,
    onStatusIndexChange,
    onStatusChange,
    onRemoveStatus,
    statusInputToggler,
    setStatuses
  };
};
