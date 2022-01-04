import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import moment from 'moment';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_EVENT_BY_ID } from 'graphql/mutations/events';
import { ContactType, HouseEventType } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { EVENTS_PAGE_ROUTE } from 'utils/routes';
import { EVENT_NOT_FOUND } from 'variables/messages';

import { EventFormFields } from '../_common/EventForm/EventForm';
import { EventView } from '../_common/EventView/EventView';
import { TEventData } from '../_common/types';

export const EventViewPrivatePage: React.FC<unknown> = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<undefined | TEventData>(undefined);

  const { data: query } = useQueryWithError<{ result: HouseEventType }, { id: string }>(QUERY_EVENT_BY_ID, {
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
          [EventFormFields.DATE]: date,
          [EventFormFields.ADDITIONAL_INFO]: result.direction?.additional_info,
          [EventFormFields.DIRECTION]: {
            ...result.direction,
            coordinates: {
              latitude: result.direction?.latitude,
              longitude: result.direction?.longitude
            }
          }
        };

        setEventData(newData as unknown as TEventData);
      }
    }
  }, [query]);

  const { accounts } = useTypedSelector((store) => store);

  useEffect(() => {
    if (query && !query.result) {
      history.push(`${EVENTS_PAGE_ROUTE}?${EVENT_NOT_FOUND}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (query && !query.result) {
    return null;
  }

  const { availableAccounts, currentAccountId } = accounts || {};

  const { user } = availableAccounts?.find((account) => account.id === currentAccountId) || {};

  const coordinates = `${eventData?.[EventFormFields.DIRECTION].coordinates?.latitude}, ${
    eventData?.[EventFormFields.DIRECTION].coordinates?.longitude
  }`;

  const endDate = moment(eventData?.[EventFormFields.ENDS_AT]);
  const startDateStr = moment(eventData?.[EventFormFields.STARTS_AT]).toISOString() || null;
  const today = moment();
  const endDateStr = endDate.toISOString() || null;
  const isExpire = endDate.isBefore(today);

  const phones =
    eventData?.[EventFormFields.CONTACTS]?.map((phone) => ({
      additional_info: phone.additional_info,
      phone: phone.phone,
      title: phone.title
    })) || [];

  const pictures = eventData?.[EventFormFields.FILES]?.length
    ? eventData?.[EventFormFields.FILES].map((f: File) => URL.createObjectURL(f))
    : [];

  const avatar = undefined;

  const handleBack = () => {
    history.push(EVENTS_PAGE_ROUTE);
  };

  return (
    <EventView
      address={eventData?.[EventFormFields.DIRECTION].address}
      avatar={avatar}
      coordinates={coordinates}
      description={eventData?.[EventFormFields.ADDITIONAL_INFO]}
      endDateStr={endDateStr || undefined}
      eventTitle={eventData?.[EventFormFields.TITLE]}
      handleBack={handleBack}
      isEditOrCreate
      isExpire={isExpire}
      isLoading={false}
      message={eventData?.[EventFormFields.DESCRIPTION]}
      name={user?.name || ''}
      phones={phones as ContactType[]}
      pictures={pictures}
      startDateStr={startDateStr || undefined}
    />
  );
};
