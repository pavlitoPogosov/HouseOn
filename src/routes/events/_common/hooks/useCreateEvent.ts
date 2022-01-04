import { useIntl } from 'react-intl';

import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_CREATE_HOUSE_EVENT } from 'graphql/mutations/events';
import { QUERY_EVENTS_VIEW } from 'graphql/queries/events';
import { HouseEventCreateInput, HouseEventsPageType, HouseEventType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import { mapFormValuesToServer } from '../helpers/mapFormValuesToServer';
import { TEventData } from '../types';

type TUseCreateEventProps = {
  onCreate?: (result: HouseEventType) => void;
};

export const useCreateEvent = ({ onCreate }: TUseCreateEventProps) => {
  const dispatch = useTypedDispatch();
  const intl = useIntl();

  const [createEventMutation, { error, loading }] = useMutationWithError<
    { result: HouseEventType },
    { input: HouseEventCreateInput }
  >(MUTATION_CREATE_HOUSE_EVENT, {
    onCompleted(data) {
      const { result } = data;

      onCreate?.(result);
    },
    onError() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: intl.formatMessage({
            defaultMessage: 'Failed to create event. Please, try again',
            id: 'event.create.update.error.text'
          }),
          title: intl.formatMessage({
            defaultMessage: 'Oops',
            id: 'event.create.update.error.title'
          }),
          type: 'error'
        })
      );
    },
    update(cache, req, ctx) {
      const { result } = req.data || {};

      const variables = {
        input: {
          pagination: {
            onePage: 12,
            page: 1
          }
        }
      };

      const prevEvents = cache.readQuery({
        query: QUERY_EVENTS_VIEW,
        variables
      }) as { result: HouseEventsPageType };

      if (prevEvents) {
        const data = {
          result: {
            ...prevEvents.result,
            list: [...prevEvents.result.list, result]
          }
        };

        cache.writeQuery({
          data,
          query: QUERY_EVENTS_VIEW,
          variables
        });
      }
    }
  });

  const createEvent = async (values: TEventData) => {
    return createEventMutation({ variables: { input: mapFormValuesToServer(values) } });
  };

  return {
    createEvent,
    error,
    loading
  };
};
