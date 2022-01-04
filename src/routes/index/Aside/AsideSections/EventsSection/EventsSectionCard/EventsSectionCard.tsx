import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HouseEventType } from 'graphql/types';
import { VIEW_EVENT_PAGE_ROUTE } from 'utils/routes';

import s from './EventsSectionCard.module.scss';

export interface EventsSectionCardProps {
  containerClassName: string;
  event: HouseEventType;
}

export const EventsSectionCard: React.FC<EventsSectionCardProps> = ({ containerClassName, event }) => {
  const isAllDay = event.starts_at.format('HH:mm') === '00:00' && event.ends_at.format('HH:mm') === '23:59';
  const eventStartEnd = `${event.starts_at.format('HH:mm')} - ${event.ends_at.format('HH:mm')}`;
  const eventDate = `Today, ${isAllDay ? 'All day' : eventStartEnd}`;

  return (
    <Link
      to={VIEW_EVENT_PAGE_ROUTE.replace(':id(\\d+)', event.id)}
      className={clsx(s.EventsSectionCard__container, containerClassName)}>
      <article>
        <div className={s.EventsSectionCard__header}>
          <Text as="div" className={s.EventsSectionCard__title} variant={TextPropsVariantsEnum.BODY_M}>
            <span className={s.EventsSectionCard__circle} />

            {event.title}
          </Text>

          {event.creator?.name && (
            <div className={s.EventsSectionCard__creator}>
              <span>Creator: &thinsp;</span>

              <span>{event.creator.name}</span>
            </div>
          )}
        </div>

        <Text color="textTretiary" text={eventDate} variant={TextPropsVariantsEnum.CAPTION_R} />
      </article>
    </Link>
  );
};
