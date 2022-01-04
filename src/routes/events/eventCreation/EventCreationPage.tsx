import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { FormikProps } from 'formik';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { useUpdateEffect } from 'common/hooks/useUpdateEffect';
import { ContactType, HouseEventType } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { submitFormikFormWithRef } from 'utils/formikUtils';
import { CREATE_EVENT_PAGE_ROUTE, EVENTS_PAGE_ROUTE } from 'utils/routes';

import { EventForm, EventFormFields } from '../_common/EventForm/EventForm';
import { EventView } from '../_common/EventView/EventView';
import { useCreateEvent } from '../_common/hooks/useCreateEvent';
import { useEventToast } from '../_common/hooks/useEventToast';
import { SuccessfullyCreatedModal } from '../_common/modals/SuccessfullyCreatedModal/SuccessfullyCreatedModal';
import { TEventData } from '../_common/types';

export const EventCreationPage: React.FC<unknown> = () => {
  const history = useHistory();

  const [eventLink, setEventLink] = useState<null | string>(null);
  const [previewData, setPreviewData] = useState<null | TEventData>(null);
  const [isPreview, setPreview] = useState<boolean>(false);
  const linkModalToggler = useToggle();
  const { accounts } = useTypedSelector((store) => store);
  const { availableAccounts, currentAccountId } = accounts || {};
  const { user } = availableAccounts?.find((account) => account.id === currentAccountId) || {};

  useEventToast({ replaceTo: CREATE_EVENT_PAGE_ROUTE });

  const onCreate = (result: HouseEventType) => {
    setEventLink(result.public_uuid);
    linkModalToggler.set();
  };

  const { createEvent, error, loading } = useCreateEvent({ onCreate });

  const formikRef = useRef<FormikProps<TEventData> | null>(null);

  const handleClickPreview = () => {
    submitFormikFormWithRef(formikRef, (values: TEventData) => {
      setPreviewData(values);
      setPreview(true);
    });
  };

  const handleForward = () => {
    if (previewData) {
      createEvent(previewData);
    }
  };

  const handleBack = () => {
    setPreview(false);
  };

  const onModalClose = () => {
    linkModalToggler.unset();
    history.push(EVENTS_PAGE_ROUTE);
  };

  const coordinates = `${previewData?.[EventFormFields.DIRECTION].coordinates?.latitude}, ${
    previewData?.[EventFormFields.DIRECTION].coordinates?.longitude
  }`;

  const endDate = moment(previewData?.[EventFormFields.ENDS_AT]);
  const startDateStr = moment(previewData?.[EventFormFields.STARTS_AT]).toISOString() || null;
  const today = moment();
  const endDateStr = endDate.toISOString() || null;
  const isExpire = endDate.isBefore(today);

  const phones =
    previewData?.[EventFormFields.CONTACTS]?.map((phone) => ({
      additional_info: phone.additional_info,
      phone: phone.phone,
      title: phone.title
    })) || [];

  const pictures = previewData?.[EventFormFields.FILES]?.length
    ? previewData?.[EventFormFields.FILES].map((f: File) => URL.createObjectURL(f))
    : [];

  const avatar = undefined;

  useUpdateEffect(() => {
    window.scrollTo(0, 0);
  }, [previewData]);

  return !isPreview ? (
    <CenteredPageLayout>
      <EventForm
        error={Boolean(error)}
        event={previewData || undefined}
        isLoading={loading}
        onClickPreview={handleClickPreview}
        onSubmit={createEvent}
        ref={formikRef}
      />

      <SuccessfullyCreatedModal eventLink={eventLink} isOpen={linkModalToggler.value} onClose={onModalClose} />
    </CenteredPageLayout>
  ) : (
    <EventView
      address={previewData?.[EventFormFields.DIRECTION].address}
      avatar={avatar}
      coordinates={coordinates}
      description={previewData?.[EventFormFields.ADDITIONAL_INFO]}
      endDateStr={endDateStr || undefined}
      eventLink={eventLink || undefined}
      eventTitle={previewData?.[EventFormFields.TITLE]}
      handleBack={handleBack}
      handleForward={handleForward}
      isEditOrCreate
      isExpire={isExpire}
      isLoading={false}
      isPreviewCreate
      linkModalToggler={linkModalToggler}
      message={previewData?.[EventFormFields.DESCRIPTION]}
      name={user?.name || ''}
      phones={phones as ContactType[]}
      pictures={pictures}
      startDateStr={startDateStr || undefined}
    />
  );
};
