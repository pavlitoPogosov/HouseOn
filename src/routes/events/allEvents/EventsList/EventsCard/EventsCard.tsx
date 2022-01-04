import React from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { useHistory } from 'react-router';

import clsx from 'clsx';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { ReactComponent as PinIcon } from 'assets/icons/geomark.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { CreatedEntityLinkDialogContent } from 'common/components/ui/_dialogs/CreatedEntityLinkDialogContent/CreatedEntityLinkDialogContent';
import { Button } from 'common/components/ui/Button/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { SelectDropdown } from 'common/components/ui/Select/SelectDropdown/SelectDropdown';
import {
  Text,
  TextPropsVariantsEnum,
} from 'common/components/ui/Text/Text';
import { HouseEventType } from 'graphql/types';
import { useDeleteEvent } from 'routes/events/_common/hooks/useDeleteEvent';
import { getDateString } from 'utils/getDateString';
import {
  EDIT_EVENT_PAGE_ROUTE,
  PUBLIC_EVENTS_VIEW,
} from 'utils/routes';

import { ReactComponent as ImgIcon } from './icons/img.svg';

import s from './EventsCard.module.scss';

enum PopupValues {
  DELETE = 'Delete',
  EDIT = 'Edit',
}
export interface IEventsCardProps {
  event: HouseEventType;
  onClick: () => void;
  onDeleteEvent: (id: string) => void;
}

export const EventsCard: React.FC<IEventsCardProps> = props => {
  const {
    event,
    onClick,
    onDeleteEvent,
  } = props;

  const { deleteEvent } = useDeleteEvent();

  const handleDeleteEvent = () => {
    deleteEvent(event.id);
    deleteModalToggler.unset();
    onDeleteEvent(event.id);
  };

  const intl = useIntl();

  const history = useHistory();

  const linkModalToggler = useToggle();
  const deleteModalToggler = useToggle();
  const tooltipToggler = useToggle();

  const isDateExpired = event.ends_at.isBefore(moment());

  const handleModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    linkModalToggler.set();
  };

  const handleOptionClick = (selectedOption: ISelectPrimaryOption) => {
    if (selectedOption.value === PopupValues.EDIT) {
      history.push(EDIT_EVENT_PAGE_ROUTE.replace(':id(\\d+)', event.id));
      return;
    }

    if (selectedOption.value === PopupValues.DELETE) {
      deleteModalToggler.set();
      return;
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    tooltipToggler.toggle();
  };

  const POPUP_OPTIONS = [ { text: PopupValues.EDIT, value: PopupValues.EDIT }, { text: PopupValues.DELETE, value: PopupValues.DELETE } ].filter(Boolean) as ISelectPrimaryOption[];

  const renderTooltip = () => {
    return (
      <SelectDropdown
        containerClassName={s.EventsCard__menuPopup}
        isOpen={!deleteModalToggler.value}
        onClickOption={handleOptionClick}
        options={POPUP_OPTIONS}
        stopPropogationOnOptionClick
      />
    );
  };

  const inviteLink = window.origin + PUBLIC_EVENTS_VIEW.replace(':id', event.public_uuid);
  const hasNoImage = true;

  const eventDate = getDateString(event.starts_at, event.ends_at);

  const creatorName = event.creator?.name;

  return (
    <>
      <div
        className={clsx(s.EventsCard__event, hasNoImage && s.withoutImage)}
        onClick={onClick}
        onMouseLeave={tooltipToggler.unset}
        // style={{ backgroundImage: `url(${poster})` }}
      >
        <div className={s.EventsCard__event_info_top} />

        <div className={s.EventsCard__event_info_bottom}>
          <div className={s.EventsCard__event_info}>
            <div>
              <div className={s.EventsCard__event_header}>
                <Text
                  className={s.EventsCard__event_title}
                  variant={TextPropsVariantsEnum.BODY_M}
                >
                  {event.title || 'No name'}
                </Text>

                {
                  creatorName && (
                    <div className={s.EventsCard__event_author_wrapper}>
                      <Text className={s.EventsCard__event_author}>
                        <FormattedMessage
                          defaultMessage="Author:"
                          id="event.card.author"
                        />
                      </Text>

                      <Text className={s.EventsCard__event_authorName}>{creatorName}</Text>
                    </div>
                  )
                }
              </div>
              {
                !isDateExpired && (
                  <Tippy
                    interactive
                    offset={[ -104, -40 ]}
                    onClickOutside={tooltipToggler.unset}
                    render={renderTooltip}
                    visible={tooltipToggler.value}
                  >
                    <div
                      className={s.EventsCard__menuIcon}
                      onClick={handleMenuClick}
                    >
                      <IconCircle
                        height={32}
                        icon={<EllipsisMenuIcon />}
                        width={32}
                      />
                    </div>
                  </Tippy>
                )
              }
              <div className={s.EventsCard__date}>{eventDate}</div>
            </div>

            <div className={s.EventsCard__footer}>
              <div className={s.EventsCard__footer_actions}>
                <PinIcon className={s.EventsCard__icon_map} />

                <div className={s.EventsCard__images}>
                  <ImgIcon className={s.EventsList__icon_img} />

                  <div className={s.EventsCard__imagesCount_wrapper}>
                    <Text
                      className={s.EventsCard__imagesCount}
                      color="textSecondary"
                      variant={TextPropsVariantsEnum.CAPTION_ALL_CAPS_SMALL}
                    >
                      1
                    </Text>
                  </div>
                </div>
              </div>

              {
                !isDateExpired && (
                  <Button
                    color="orange"
                    onClick={handleModalOpen}
                    rightIcon={<PlusIcon />}
                    size="s"
                    variant="secondary"
                  >
                    <FormattedMessage
                      defaultMessage="Invite guests"
                      id="event.card.button.invite"
                    />
                  </Button>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Dialog
        childrenWrapperClassName={s.EventsCard__modalContainer}
        icon={ColorfulIconTypes.GUEST_SETTINGS}
        isOpen={linkModalToggler.value}
        onClose={linkModalToggler.unset}
        title={
          intl.formatMessage({
            defaultMessage: 'Invite new guests to «{event}»',
            id: 'event.card.modal.invite.title',
          },
          { event: event.title || 'Event' })
        }
      >
        <CreatedEntityLinkDialogContent
          description={
            intl.formatMessage({
              defaultMessage: 'Copy link in order to send it to your guest',
              id: 'event.card.invite.link',
            })
          }
          descriptionClassName={s.EventsCard__modalTitle}
          hideAvatar
          link={inviteLink}
        />
      </Dialog>

      <Dialog
        cancelBtnText={intl.formatMessage({ defaultMessage: 'No, don’t remove', id: 'app.dialog.cancelRemove' })}
        isOpen={deleteModalToggler.value}
        onClickCancelBtn={deleteModalToggler.unset}
        onClickSaveBtn={handleDeleteEvent}
        onClose={deleteModalToggler.unset}
        saveBtnText={intl.formatMessage({ defaultMessage: 'Yes, remove', id: 'app.dialog.remove' })}
      >
        <div className={s.EventsCard__deleteModal}>
          <div className={s.EventsCard__deleteModalPicture} />

          <Text
            text={
              intl.formatMessage({
                defaultMessage: 'Are you sure you want to delete event “{event}”?',
                id: 'event.dialog.confirm.remove.text',
              },
              { event: event.title })
            }
            variant={TextPropsVariantsEnum.H3}
          />
        </div>
      </Dialog>
    </>
  );
};
