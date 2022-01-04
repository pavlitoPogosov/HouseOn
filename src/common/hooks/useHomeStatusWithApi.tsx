import React, { useState } from 'react';

import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { StatusInputSaveValues } from 'common/components/ui/HomeStatus/StatusInput/StatusInput';
import {
  MUTATION_CREATE_HOUSE_STATUS,
  MUTATION_DELETE_HOUSE_STATUS,
  MUTATION_UPDATE_HOUSE_STATUS
} from 'graphql/mutations/house';
import { QUERY_HOUSE_STATUSES } from 'graphql/queries/house';
import { HouseStatusCreateInput, HouseStatusType, HouseStatusUpdateInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import { useMutationWithError } from './useMutationWithError';
import { useQueryWithError } from './useQueryWithError';

type TStatusInputToggler = {
  change: React.Dispatch<React.SetStateAction<boolean>>;
  set: () => void;
  toggle: () => void;
  unset: () => void;
  value: boolean;
};

export type TUseHomeStatusWithApiData = {
  isEdit: boolean;
  isErrorStatusInput: boolean;
  isInitiallyLoading: boolean;
  isLoadingStatusInput: boolean;
  onAddStatus: (values: StatusInputSaveValues) => void;
  onEditStatus: (values: StatusInputSaveValues) => void;
  onRemoveStatus: () => void;
  onStatusChange: (values: StatusInputSaveValues) => void;
  onStatusIndexChange: (direction: number) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShownStatusIndex: React.Dispatch<React.SetStateAction<number>>;
  shownStatusIndex: number;
  statusInputToggler: TStatusInputToggler;
  statuses: HouseStatusType[];
};

export const useHomeStatusWithApi = () => {
  const { availableAccounts, currentAccountId } = useTypedSelector((s) => s.accounts);
  const dispatch = useTypedDispatch();

  const statusInputToggler = useToggle();
  const [shownStatusIndex, setShownStatusIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: statusesResp,
    loading: isInitiallyLoading,
    updateQuery: updateStatusesQuery
  } = useQueryWithError<{ result: HouseStatusType[] }, {}>(QUERY_HOUSE_STATUSES);

  const [createStatus, { error: isErrorCreatingStatus, loading: isCreatingStatus }] = useMutationWithError<
    { result: HouseStatusType },
    { input: HouseStatusCreateInput }
  >(MUTATION_CREATE_HOUSE_STATUS, {
    onError() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: 'Failed to create status. Please, try again',
          title: 'Oops!',
          type: 'error'
        })
      );
    },
    update(_, { data }) {
      if (data?.result) {
        updateStatusesQuery((prev) => {
          const newStatuses = prev.result.concat([data.result]);
          setShownStatusIndex(newStatuses.length - 1);

          return { result: newStatuses };
        });

        statusInputToggler.unset();
      }
    }
  });

  const [updateStatus, { loading: isUpdatingStatus }] = useMutationWithError<
    { result: HouseStatusType },
    { input: HouseStatusUpdateInput }
  >(MUTATION_UPDATE_HOUSE_STATUS, {
    onCompleted() {
      setIsEdit(false);
      statusInputToggler.unset();
    },
    onError() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: 'Failed to create status. Please, try again',
          title: 'Oops!',
          type: 'error'
        })
      );
    }
  });

  const [deleteStatus] = useMutationWithError<{ result: boolean }, { id: string }>(MUTATION_DELETE_HOUSE_STATUS);

  const onAddStatus = (values: StatusInputSaveValues) => {
    const currentAccount = availableAccounts?.find((a) => a.id === currentAccountId);

    const input: HouseStatusCreateInput = {
      expires_at: values.expiresInDay ? moment().add(24, 'hours').startOf('day') : undefined,
      text: values.text,
      title: currentAccount?.name || ''
    };

    createStatus({ variables: { input } });
  };

  const onEditStatus = (values: StatusInputSaveValues) => {
    const statusToEdit = statuses[shownStatusIndex];

    if (statusToEdit) {
      const input = {
        ...statusToEdit,
        expires_at: statusToEdit.expires_at && !values.expiresInDay ? undefined : statusToEdit.expires_at,
        text: values.text
      };

      delete input.__typename;

      updateStatus({ variables: { input } });
    }
  };

  const onRemoveStatus = () => {
    let id = '';

    updateStatusesQuery((prev) => ({
      result: prev.result.filter((s, i) => {
        if (i === shownStatusIndex) {
          id = s.id;
        }

        return i !== shownStatusIndex;
      })
    }));
    setShownStatusIndex((prev) => (prev > 0 ? prev - 1 : 0));

    if (id) {
      deleteStatus({ variables: { id } });
    }
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

  const statuses = statusesResp?.result || ([] as HouseStatusType[]);

  return {
    isEdit,
    isErrorStatusInput: Boolean(isErrorCreatingStatus),
    isInitiallyLoading,
    onEditStatus,
    isLoadingStatusInput: isCreatingStatus || isUpdatingStatus,
    onRemoveStatus,
    onAddStatus,
    onStatusIndexChange,
    onStatusChange,
    statusInputToggler,
    setIsEdit,
    statuses,
    setShownStatusIndex,
    shownStatusIndex
  };
};
