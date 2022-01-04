import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { INDEX_PAGE_ROUTE } from 'utils/routes';
import { EVENT_CREATED, EVENT_NOT_FOUND, EVENT_UPDATED } from 'variables/messages';

type TUseEventNotFoundToast = {
  replaceTo: string;
};

const publicErrorNotFoundMessage = 'Event not found. Please, try to request another one';
const privateErrorNotFoundMessage = 'Event not found. Please, try to create new or request another one';
const successfullyCreatedMessage = 'Event created successfully';
const successfullyUpdatedMessage = 'Event updated successfully';

export const useEventToast = (props: TUseEventNotFoundToast): void => {
  const { replaceTo } = props;

  const dispatch = useTypedDispatch();
  const intl = useIntl();
  const history = useHistory();

  const isPublic = replaceTo === INDEX_PAGE_ROUTE;

  useEffect(() => {
    if (typeof window === 'object') {
      const { href } = window?.location || {};
      if (href?.includes(EVENT_NOT_FOUND)) {
        history.replace(replaceTo);
        dispatch(
          createToast({
            dismissTimeout: 5000,
            text: intl.formatMessage({
              defaultMessage: isPublic ? publicErrorNotFoundMessage : privateErrorNotFoundMessage,
              id: 'event.found.error.text'
            }),
            title: intl.formatMessage({
              defaultMessage: 'Oops',
              id: 'event.found.error.title'
            }),
            type: 'error'
          })
        );
      } else if (href?.includes(EVENT_CREATED)) {
        history.replace(replaceTo);
        dispatch(
          createToast({
            dismissTimeout: 3000,
            text: intl.formatMessage({
              defaultMessage: successfullyCreatedMessage,
              id: 'event.create.success.text'
            })
          })
        );
      } else if (href?.includes(EVENT_UPDATED)) {
        history.replace(replaceTo);
        dispatch(
          createToast({
            dismissTimeout: 3000,
            text: intl.formatMessage({
              defaultMessage: successfullyUpdatedMessage,
              id: 'event.update.success.text'
            })
          })
        );
      }
    }
  }, []);
};
