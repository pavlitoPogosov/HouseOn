import { useEffect } from 'react';

import {
  MutationHookOptions,
  QueryHookOptions, 
} from '@apollo/client';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import {
  MUTATION_UPDATE_HOUSE,
  MUTATION_UPDATE_HOUSE_CONTACTS,
  MUTATION_UPDATE_HOUSE_INSTRUCTIONS,
} from 'graphql/mutations/house';
import {
  QUERY_HOUSE,
  QUERY_HOUSE_CONTACTS, 
} from 'graphql/queries/house';
import {
  ContactType,
  HouseType,
  HouseUpdateInput,
  HouseInstructionsUpdateInput,
  UpdateHouseContactsInput,
} from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

export const useGetHouseQuery = (hookOptions?: Omit<QueryHookOptions<{ result: HouseType }, { houseId: string }>, 'variables'>) => {
  const { currentHouseId } = useTypedSelector(s => s.accounts);

  const options = useQueryWithError<{ result: HouseType }, { houseId: string }>(QUERY_HOUSE, { ...hookOptions });

  useEffect(() => {
    options.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentHouseId ]);

  return options;
};

export const useUpdateHouseInstructions = (hookOptions?: MutationHookOptions<{ result: HouseType }, { input: HouseInstructionsUpdateInput }>) => {
  const options = useMutationWithError<{ result: HouseType }, { input: HouseInstructionsUpdateInput }>(MUTATION_UPDATE_HOUSE_INSTRUCTIONS,
    {
      ...hookOptions,
      update(cache, req, ctx) {
        if (hookOptions?.update) {
          hookOptions.update(cache, req, ctx);
        }

        cache.modify({
          fields: {
            house() {
              return req.data?.result;
            },
          },
        });
      },
    });

  return options;
};

export const useUpdateHouse = (hookOptions?: MutationHookOptions<{ result: HouseType }, { input: HouseUpdateInput }>) => {
  const options = useMutationWithError<{ result: HouseType }, { input: HouseUpdateInput }>(MUTATION_UPDATE_HOUSE, {
    ...hookOptions,
    update(cache, req, ctx) {
      if (hookOptions?.update) {
        hookOptions.update(cache, req, ctx);
      }

      cache.modify({
        fields: {
          house() {
            return req.data?.result;
          },
        },
      });
    },
  });

  return options;
};

export const useUpdateHouseContacts = (hookOptions?: MutationHookOptions<{ result: ContactType[] }, { input: UpdateHouseContactsInput }>) => {
  const options = useMutationWithError<{ result: ContactType[] }, { input: UpdateHouseContactsInput }>(MUTATION_UPDATE_HOUSE_CONTACTS,
    {
      ...hookOptions,
      update(cache, req, ctx) {
        if (hookOptions?.update) {
          hookOptions.update(cache, req, ctx);
        }

        cache.modify({
          fields: {
            house() {
              return req.data?.result;
            },
          },
        });
      },
    });

  return options;
};

export const useGetHouseContacts = (hookOptions?: QueryHookOptions<{ result: ContactType[] }, { houseId: string }>) =>
  useQueryWithError<{ result: ContactType[] }, { houseId: string }>(QUERY_HOUSE_CONTACTS, { ...hookOptions });
