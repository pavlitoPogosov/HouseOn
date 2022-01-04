import React from 'react';
import { useIntl } from 'react-intl';

import Avatar from 'assets/images/eventInvitation/avatar.png';
import HouseImg from 'assets/images/eventInvitation/houseImg.png';
import { Button } from 'common/components/ui/Button';
import { ContactType } from 'graphql/types';

import { SuccessfullyCreatedModal } from '../modals/SuccessfullyCreatedModal/SuccessfullyCreatedModal';

import { EventViewPageHeader } from './EventViewPageHeader/EventViewPageHeader';
import { EventViewPageHouse } from './EventViewPageHouse/EventViewPageHouse';
import { EventViewPageIntro } from './EventViewPageIntro/EventViewPageIntro';
import { EventViewPageUser } from './EventViewPageUser/EventViewPageUser';

import s from './EventViewPage.module.scss';

type TEventViewContentProps = {
  address?: string;
  avatar?: string;
  coordinates?: any;
  description?: string;
  endDateStr?: string;
  eventLink?: string;
  eventTitle?: string;
  handleBack: () => void;
  handleForward?: () => void;
  isEditOrCreate?: boolean;
  isExpire?: boolean;
  isLoading?: boolean;
  isPreviewCreate?: boolean;
  isPublic?: boolean;
  linkModalToggler?: {
    change: React.Dispatch<React.SetStateAction<boolean>>;
    set: () => void;
    toggle: () => void;
    unset: () => void;
    value: boolean;
  };
  message?: string;
  name?: string;
  phones?: Omit<ContactType, 'id'>[];
  pictures?: string[];
  startDateStr?: string;
};

export const EventView = (props: TEventViewContentProps): JSX.Element => {
  const intl = useIntl();

  const {
    address,
    avatar,
    coordinates,
    description,
    endDateStr,
    eventLink,
    eventTitle,
    handleBack,
    handleForward,
    isEditOrCreate,
    isExpire,
    isLoading,
    isPreviewCreate,
    isPublic,
    linkModalToggler,
    message,
    name,
    phones,
    pictures,
    startDateStr
  } = props;

  return (
    <main className={s.EventEventViewPage__container}>
      <EventViewPageHeader endDate={endDateStr || null} isPreview={isPreviewCreate} startDate={startDateStr || null} />

      <div className={s.EventEventViewPage__inner}>
        <EventViewPageIntro
          title={intl.formatMessage(
            {
              defaultMessage: '{inviteFrom} invited you to «{inviteTo}»',
              id: 'event.view.invite.title'
            },
            {
              inviteFrom: name || 'The owner of this house',
              inviteTo: eventTitle || 'Event'
            }
          )}
        />

        <EventViewPageUser
          avatar={avatar || Avatar || null}
          message={message || ''}
          username={name || 'Event Creator'}
        />

        <EventViewPageHouse
          address={address || ''}
          coordinates={coordinates}
          description={description || ''}
          houseImg={HouseImg}
          phones={phones || []}
          pictures={pictures || []}
        />

        {!isPublic && (
          <div className={s.EventEventViewPage__controls}>
            <Button
              color="orange"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={handleBack}
              size="s"
              variant="secondary">
              {intl.formatMessage({ defaultMessage: 'Back', id: 'app.back' })}
            </Button>

            {handleForward && isEditOrCreate && !isExpire && (
              <Button color="orange" disabled={isLoading} isLoading={isLoading} onClick={handleForward} size="s">
                {isPreviewCreate
                  ? intl.formatMessage({ defaultMessage: 'Create event', id: 'app.button.create_event' })
                  : intl.formatMessage({ defaultMessage: 'Update event', id: 'app.button.update_event' })}
              </Button>
            )}
          </div>
        )}
      </div>

      {linkModalToggler && (
        <SuccessfullyCreatedModal
          eventLink={eventLink || null}
          isOpen={linkModalToggler.value}
          onClose={linkModalToggler.unset}
        />
      )}
    </main>
  );
};
