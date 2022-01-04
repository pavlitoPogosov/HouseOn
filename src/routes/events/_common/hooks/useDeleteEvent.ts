import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_DELETE_HOUSE_EVENT } from 'graphql/mutations/events';
import { QUERY_EVENTS_VIEW } from 'graphql/queries/events';
import { HouseEventsPageType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { EVENTS_PAGE_ROUTE } from 'utils/routes';
import { EVENT_UPDATED } from 'variables/messages';

type TUseDeleteEventProps = {
  onUpdate?: () => void;
};

export const useDeleteEvent = (props?: TUseDeleteEventProps) => {
  const { onUpdate } = props || {};

  const dispatch = useTypedDispatch();
  const history = useHistory();
  const intl = useIntl();

  const [deleteEventMutation, { error, loading }] = useMutationWithError<{ result: boolean }, { id: string }>(
    MUTATION_DELETE_HOUSE_EVENT,
    {
      onCompleted(data) {
        onUpdate?.();
        if (history.location.pathname !== EVENTS_PAGE_ROUTE) {
          history.push(`${EVENTS_PAGE_ROUTE}?${EVENT_UPDATED}`);
        }
      },
      onError() {
        dispatch(
          createToast({
            dismissTimeout: 3000,
            text: intl.formatMessage({
              defaultMessage: 'Failed to delete event. Please, try again',
              id: 'event.edit.delete.error.text'
            }),
            title: intl.formatMessage({
              defaultMessage: 'Oops',
              id: 'event.delete.error.title'
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
    }
  );

  const deleteEvent = (id: string) => {
    return deleteEventMutation({ variables: { id } });
  };

  return {
    deleteEvent,
    error,
    loading
  };
};
