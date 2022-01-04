import React, { useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { FormattedMessage, useIntl } from 'react-intl';

import clsx from 'clsx';

import { ButtonLink } from 'common/components/ui/Button/Button';
import { useGetTodayEvents } from 'graphql/hooks/events';
import { CREATE_EVENT_PAGE_ROUTE, EVENTS_PAGE_ROUTE } from 'utils/routes';

import { EmptySection } from '../_common/_EmptySection/EmptySection';
import { SectionHeader } from '../_common/_SectionHeader/SectionHeader';

import { EventsSectionCard } from './EventsSectionCard/EventsSectionCard';

import s from './EventsSection.module.scss';

export const EventsSection: React.FC = () => {
  const { data: eventsResp, loading: loadingEvents, refetch: refetchTodayEvents } = useGetTodayEvents();
  const intl = useIntl();

  useEffect(() => {
    refetchTodayEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (loadingEvents) {
      return (
        <>
          {new Array(3).fill(1).map((_, i) => (
            <ContentLoader
              backgroundColor="#e0e0e0"
              className={s.EventsSection__card}
              foregroundColor="#ede8e8"
              height="70"
              key={i}
              preserveAspectRatio="none"
              viewBox="0 0 100 70"
              width="100%">
              <rect height="70" rx="2" ry="2" width="100%" x="0" y="0" />
            </ContentLoader>
          ))}
        </>
      );
    }

    if (!eventsResp?.result.list.length) {
      return (
        <EmptySection
          buttonLink={CREATE_EVENT_PAGE_ROUTE}
          buttonText={intl.formatMessage({
            defaultMessage: 'Create an event',
            id: 'index.event.create'
          })}
          text="Meet special people in your life to  feel unforgettable moments of happiness"
          textTitle="Events for happy moments"
        />
      );
    }

    const eventToViewMore = eventsResp.result.header.totalCount - eventsResp.result.list.length;

    return (
      <>
        {eventsResp.result.list.map((e) => (
          <EventsSectionCard containerClassName={s.EventsSection__card} event={e} key={e.id} />
        ))}

        <div className={s.EventsSection__buttons}>
          <ButtonLink
            className={s.EventsSection__button}
            color="orange"
            size="s"
            to={CREATE_EVENT_PAGE_ROUTE}
            variant="secondary">
            <FormattedMessage defaultMessage="Add a new event" id="index.event.addNew" />
          </ButtonLink>

          {eventToViewMore > 0 && (
            <ButtonLink
              className={clsx(s.EventsSection__button, s.buttonViewMore)}
              color="orange"
              size="s"
              to={EVENTS_PAGE_ROUTE}
              variant="secondary">
              <FormattedMessage
                defaultMessage="View {count} more"
                id="index.event.viewMore"
                values={{ count: eventToViewMore }}
              />
            </ButtonLink>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <SectionHeader
        title={intl.formatMessage({
          defaultMessage: 'Today events',
          id: 'index.event.link.today'
        })}
        to={EVENTS_PAGE_ROUTE}
      />

      {renderContent()}
    </>
  );
};
