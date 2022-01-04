import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_UPDATE_HOUSE_EVENT } from 'graphql/mutations/events';
import { QUERY_EVENTS_VIEW } from 'graphql/queries/events';
import { HouseEventUpdateInput, HouseEventType, HouseEventsPageType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { EVENTS_PAGE_ROUTE } from 'utils/routes';
import { EVENT_UPDATED } from 'variables/messages';

import { mapFormValuesToServer } from '../helpers/mapFormValuesToServer';
import { TEventData } from '../types';

type TUseUpdateEventProps = {
  id: string;
  onUpdate?: (result: HouseEventType) => void;
};

export const useUpdateEvent = (props: TUseUpdateEventProps) => {
  const { id, onUpdate } = props;

  const dispatch = useTypedDispatch();
  const history = useHistory();
  const intl = useIntl();

  const [updateEventMutation, { error, loading }] = useMutationWithError<
    { result: HouseEventType },
    { input: HouseEventUpdateInput }
  >(MUTATION_UPDATE_HOUSE_EVENT, {
    onCompleted(data) {
      const { result } = data;

      onUpdate?.(result);
      history.push(`${EVENTS_PAGE_ROUTE}?${EVENT_UPDATED}`);
    },
    onError() {
      dispatch(
        createToast({
          dismissTimeout: 3000,
          text: intl.formatMessage({
            defaultMessage: 'Failed to edit event. Please, try again',
            id: 'event.edit.update.error.text'
          }),
          title: intl.formatMessage({
            defaultMessage: 'Oops',
            id: 'event.edit.update.error.title'
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

  const updateEvent = (values: TEventData) => {
    return updateEventMutation({ variables: { input: { ...mapFormValuesToServer(values), id } } });
  };

  return {
    error,
    loading,
    updateEvent
  };
};
