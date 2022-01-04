import React, {
  useEffect,
  useRef,
  useState, 
} from 'react';
import isEquals from 'react-fast-compare';
import {
  useHistory,
  useParams, 
} from 'react-router';

import { FormikProps } from 'formik';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { useUpdateEffect } from 'common/hooks/useUpdateEffect';
import { QUERY_EVENT_BY_ID } from 'graphql/mutations/events';
import {
  ContactType,
  HouseEventType, 
} from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import {
  CREATE_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE, 
} from 'utils/routes';
import { EVENT_NOT_FOUND } from 'variables/messages';

import {
  EventForm,
  EventFormFields, 
} from '../_common/EventForm/EventForm';
import { EventView } from '../_common/EventView/EventView';
import { useUpdateEvent } from '../_common/hooks/useUpdateEvent';
import { TEventData } from '../_common/types';

export const EventEditPage: React.FC<unknown> = () => {
  const [ previewData, setPreviewData ] = useState<null | TEventData>(null);
  const [ eventData, setEventData ] = useState<undefined | TEventData>(undefined);
  const [ isPreview, setPreview ] = useState<boolean>(false);
  const linkModalToggler = useToggle();
  const { accounts } = useTypedSelector(store => store);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const {
    data: query,
    loading: isQueryLoading,
  } = useQueryWithError<{ result: HouseEventType }, { id: string }>(QUERY_EVENT_BY_ID,
    { variables: { id } });

  useEffect(() => {
    if (query) {
      const { result } = query;
      if (result) {
        const date = {
          endDate: result?.ends_at,
          startDate: result?.starts_at ? moment(result.starts_at).startOf('day') : moment().add(1, 'day')
            .startOf('day'),
        };

        const newData = {
          ...result,
          [EventFormFields.DATE]: date,
          [EventFormFields.ADDITIONAL_INFO]: result.direction?.additional_info,
        };

        setEventData(newData as unknown as TEventData);
      }
    }
  }, [ query ]);

  const {
    error,
    loading: isMutationLoading,
    updateEvent,
  } = useUpdateEvent({ id });

  const formikRef = useRef<FormikProps<TEventData> | null>(null);

  useUpdateEffect(() => {
    window.scrollTo(0, 0);
  }, [ previewData ]);

  useEffect(() => {
    if (query && !query.result) {
      history.push(`${CREATE_EVENT_PAGE_ROUTE}?${EVENT_NOT_FOUND}`);
    }
  }, [ query ]);

  if (query && !query.result) {
    return null;
  }

  const {
    availableAccounts,
    currentAccountId,
  } = accounts || {};

  const update = (values: TEventData) => {
    if (!isEquals(values, eventData)) {
      updateEvent(values);
    } else {
      history.push(EVENTS_PAGE_ROUTE);
    }
  };

  const handleClickPreview = () => {
    submitFormikFormWithRef(formikRef, (values: TEventData) => {
      setPreviewData(values);
      setPreview(true);
    });
  };

  const handleForward = () => {
    if (previewData) {
      update(previewData);
    }
  };

  const handleSubmit = (values: TEventData) => {
    update(values);
  };

  const handleBack = () => {
    setPreview(false);
  };

  const data = previewData || eventData;

  const coordinates = `${previewData?.[EventFormFields.DIRECTION].coordinates?.latitude}, ${
    previewData?.[EventFormFields.DIRECTION].coordinates?.longitude
  }`;

  const endDate = moment(previewData?.[EventFormFields.ENDS_AT]);
  const startDateStr = moment(previewData?.[EventFormFields.STARTS_AT]).toISOString() || null;
  const today = moment();
  const endDateStr = endDate.toISOString() || null;
  const isExpire = endDate.isBefore(today);

  const phones =
    previewData?.[EventFormFields.CONTACTS]?.map(phone => ({
      additional_info: phone.additional_info,
      phone: phone.phone,
      title: phone.title,
    })) || [];

  const pictures = previewData?.[EventFormFields.FILES]?.length
    ? previewData?.[EventFormFields.FILES].map((f: File) => URL.createObjectURL(f))
    : [];

  const avatar = undefined;

  const { user } = availableAccounts?.find(account => account.id === currentAccountId) || {};

  return !isPreview ? (
    <CenteredPageLayout>
      <EventForm
        error={Boolean(error)}
        event={data}
        isEdit
        isLoading={isMutationLoading}
        onClickPreview={handleClickPreview}
        onSubmit={handleSubmit}
        ref={formikRef}
      />
    </CenteredPageLayout>
  ) : (
    <EventView
      address={previewData?.[EventFormFields.DIRECTION].address}
      avatar={avatar}
      coordinates={coordinates}
      description={previewData?.[EventFormFields.ADDITIONAL_INFO]}
      endDateStr={endDateStr || undefined}
      eventTitle={previewData?.[EventFormFields.TITLE]}
      handleBack={handleBack}
      handleForward={handleForward}
      isEditOrCreate
      isExpire={isExpire}
      isLoading={false}
      linkModalToggler={linkModalToggler}
      message={previewData?.[EventFormFields.DESCRIPTION]}
      name={user?.name || ''}
      phones={phones as ContactType[]}
      pictures={pictures}
      startDateStr={startDateStr || undefined}
    />
  );
};
