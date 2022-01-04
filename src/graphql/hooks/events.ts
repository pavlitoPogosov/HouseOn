import moment from 'moment';

import { QueryHookOptions } from '@apollo/client';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_HOUSE_EVENTS_PAGE } from 'graphql/queries/events';
import { HouseEventPageInput, HouseEventsPageType } from 'graphql/types';

export const useGetTodayEvents = (
  hookOptions?: Omit<QueryHookOptions<{ result: HouseEventsPageType }, { input: HouseEventPageInput }>, 'variables'>
) => {
  const options = useQueryWithError<{ result: HouseEventsPageType }, { input: HouseEventPageInput }>(
    QUERY_HOUSE_EVENTS_PAGE,
    {
      ...hookOptions,
      variables: {
        input: {
          filter: {
            ends_at: moment().add(1, 'day').startOf('day'),
            starts_at: moment().startOf('day')
          },
          pagination: {
            onePage: 3,
            page: 1
          }
        }
      }
    }
  );

  return options;
};
