import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import moment from 'moment';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_PUBLIC_EVENT_BY_ID } from 'graphql/mutations/events';
import { ContactType, HouseEventPublicType } from 'graphql/types';
import { INDEX_PAGE_ROUTE } from 'utils/routes';
import { EVENT_NOT_FOUND } from 'variables/messages';

import { EventFormFields } from '../../events/_common/EventForm/EventForm';
import { EventView } from '../../events/_common/EventView/EventView';

export const EventViewPublicPage: React.FC<unknown> = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<undefined | HouseEventPublicType>(undefined);

  const {
    data: query,
    error,
    loading: isQueryLoading
  } = useQueryWithError<{ result: HouseEventPublicType }, { id: string }>(QUERY_PUBLIC_EVENT_BY_ID, {
    variables: { id }
  });

  useEffect(() => {
    if (query) {
      const { result } = query;
      if (result) {
        const date = result?.starts_at
          ? ({ startDate: moment(result.starts_at).startOf('day') } as IDatepickerValue)
          : {
              startDate: moment().add(1, 'day').startOf('day')
            };
        const newData = {
          ...result,
          [EventFormFields.DATE]: date
        };

        setEventData(newData);
      }
    }
  }, [query]);

  useEffect(() => {
    const isNoResult = query && !query.result;

    if (error || isNoResult) {
      history.push(`${INDEX_PAGE_ROUTE}?${EVENT_NOT_FOUND}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, error]);

  if ((query && !query.result) || error) {
    return null;
  }

  const coordinates = `${eventData?.[EventFormFields.DIRECTION]?.latitude}, ${
    eventData?.[EventFormFields.DIRECTION]?.longitude
  }`;

  const endDate = moment(eventData?.[EventFormFields.ENDS_AT]);
  const startDateStr = moment(eventData?.[EventFormFields.STARTS_AT]).toISOString() || null;
  const endDateStr = endDate.toISOString() || null;

  const phones =
    eventData?.[EventFormFields.CONTACTS]?.map((phone) => ({
      additional_info: undefined,
      phone: phone.phone,
      title: phone.title
    })) || [];

  const pictures: [] = [];
  const avatar = undefined;
  const message = eventData?.description || '';

  const handleBack = () => {
    history.push(INDEX_PAGE_ROUTE);
  };

  return (
    <EventView
      address={eventData?.[EventFormFields.DIRECTION]?.address as string}
      avatar={avatar}
      coordinates={coordinates}
      description={eventData?.[EventFormFields.DIRECTION]?.[EventFormFields.ADDITIONAL_INFO] as string}
      endDateStr={endDateStr || undefined}
      eventTitle={eventData?.[EventFormFields.TITLE]}
      handleBack={handleBack}
      isEditOrCreate
      isLoading={false}
      isPublic
      message={message as string}
      name={query?.result?.creator?.name || ''}
      phones={phones as ContactType[]}
      pictures={pictures}
      startDateStr={startDateStr || undefined}
    />
  );
};
