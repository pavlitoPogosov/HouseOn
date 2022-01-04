import React from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Alert } from 'common/components/ui/Alert/Alert';
import { Logo } from 'common/components/ui/Logo/Logo';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { ReactComponent as CalendarIcon } from './calendar.svg';

import s from './EventViewPageHeader.module.scss';

export interface IEventViewPageHeaderProps {
  endDate: string | null;
  isPreview?: boolean;
  startDate: string | null;
}

export const EventViewPageHeader: React.FC<IEventViewPageHeaderProps> = props => {
  const {
    endDate,
    isPreview,
    startDate,
  } = props;

  const wasAlertClosedToggler = useToggle();
  const isTablet = useMediaQuery('(min-width: 768px)');

  const intl = useIntl();

  const renderAlert = () => {
    if (!isPreview) {
      return null;
    }

    return (
      <Fade
        className={s.EventViewPageHeader__alert}
        isActive={!wasAlertClosedToggler.value}
      >
        <Alert
          color="green"
          onClose={wasAlertClosedToggler.set}
          text={
            intl.formatMessage({
              defaultMessage: 'This is a preview of the event view page.',
              id: 'event.view.alert.text',
            })
          }
        />
      </Fade>
    );
  };

  const getDateText = () => {
    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);

    if (!endDateMoment.isValid()) {
      return startDateMoment.format('MMMM DD');
    }

    if (startDateMoment.clone().startOf('day')
      .isSame(endDateMoment.clone().startOf('day'))) {
      return (
        startDateMoment.format('MMMM DD') + ' at ' + startDateMoment.format('h:mma - ') + endDateMoment.format('h:mma')
      );
    }

    return startDateMoment.format('MMMM DD h:mma') + ' - ' + endDateMoment.format('MMMM DD h:mma');
  };

  return (
    <header className={s.EventViewPageHeader__container}>
      <div className={s.EventViewPageHeader__inner}>
        <Logo isLink />

        {!isTablet && renderAlert()}

        {
          startDate && (
            <div className={s.EventViewPageHeader__eventInfo}>
              <div className={s.EventViewPageHeader__calendar}>
                <CalendarIcon />

                {getDateText()}
              </div>
            </div>
          )
        }
      </div>

      {isTablet && renderAlert()}
    </header>
  );
};
