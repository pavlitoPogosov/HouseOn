import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { CreatedEntityLinkDialogContent } from 'common/components/ui/_dialogs/CreatedEntityLinkDialogContent/CreatedEntityLinkDialogContent';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { EVENTS_PAGE_ROUTE, PUBLIC_EVENTS_VIEW } from 'utils/routes';

import s from './SuccessfullyCreatedModal.module.scss';

export type TSuccessfullyCreatedModal = {
  description?: string;
  eventLink: string | null;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
};

export const SuccessfullyCreatedModal = (props: TSuccessfullyCreatedModal): JSX.Element => {
  const { description, eventLink: eventLinkProp, isOpen, onClose: onCloseProp, title } = props;

  const intl = useIntl();
  const history = useHistory();

  const titleDefault = intl.formatMessage({
    defaultMessage: 'Event successfully created',
    id: 'events.common.modals.successfully_created.title'
  });

  const descriptionDefault = intl.formatMessage({
    defaultMessage:
      'Now you can share invite link with guests. In case you’ll need to copy the link again it will be on the event page',
    id: 'events.common.modals.successfully_created.description'
  });

  const onClose = () => {
    history.push(EVENTS_PAGE_ROUTE);
    onCloseProp?.();
  };

  const eventLink = eventLinkProp ? window.origin + PUBLIC_EVENTS_VIEW.replace(':id', eventLinkProp) : undefined;

  return (
    <Dialog
      childrenWrapperClassName={s.content__container}
      icon={ColorfulIconTypes.GUEST}
      isOpen={isOpen}
      onClose={onClose}
      title="New event">
      <CreatedEntityLinkDialogContent
        description={description || descriptionDefault}
        descriptionClassName={s.content__description}
        link={eventLink || ''}
        title={title || titleDefault}
      />
    </Dialog>
  );
};
