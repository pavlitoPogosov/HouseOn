import React from 'react';
import { useIntl } from 'react-intl';

import { useFormikContext } from 'formik';
import moment from 'moment';

import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { DateInputField } from 'common/components/ui/_formikComponents/DateInputField/DateInputField';
import { TimeInputField } from 'common/components/ui/_formikComponents/TimeInputField/TimeInputField';
import { EDatepickerCalendarTypes } from 'common/components/ui/Datepicker/Datepicker';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { TEventData } from '../../types';
import { EventFormFields } from '../EventForm';

import s from './_styles.module.scss';

export interface IEventFormDateBlockProps {
  isEdit?: boolean;
  isLoading: boolean;
}

export const EventFormDateBlock: React.FC<IEventFormDateBlockProps> = (props) => {
  const { isEdit = false, isLoading } = props;

  const { errors, values } = useFormikContext<TEventData>();

  const intl = useIntl();

  const isAllDay = values[EventFormFields.IS_ALL_DAY];
  const maxTime = values[EventFormFields.ENDS_AT];
  const minTime = values[EventFormFields.STARTS_AT];
  const startDate = values[EventFormFields.DATE]?.startDate;
  const startDateStr = startDate?.format('DD-MM-YYYY');
  const endDate = values[EventFormFields.DATE]?.endDate;
  const endDateStr = endDate?.format('DD-MM-YYYY');

  const isOnlyStartDate = startDate && !endDate;
  const isEquals = startDateStr === endDateStr;

  const disableRangeSelect = (isEdit && isOnlyStartDate) || (isEdit && isEquals) || undefined;

  return (
    <div className={s.EventForm__block}>
      <Text className={s.EventForm__title} text="Date & time" variant={TextPropsVariantsEnum.H3} />

      <div className={s.EventForm__datesControlsWrapper}>
        <DateInputField
          datepickerProps={{
            disableRangeSelect,
            disabledCalendars: [EDatepickerCalendarTypes.YEAR],
            disabledTillDate: moment().startOf('day').subtract(1, 'day'),
            isInitialMultiple: !disableRangeSelect
          }}
          disabled={isLoading}
          fieldContainerProps={{ label: intl.formatMessage({ defaultMessage: 'Date', id: 'event.form.date.label' }) }}
          name={EventFormFields.DATE}
          wrapperClassName={s.EventForm__dateInput}
        />

        {!isAllDay && (
          <div className={s.EventForm__timeWrapper}>
            <TimeInputField
              disabled={isLoading}
              fieldContainerProps={{
                containerClassName: s.EventForm__timeInput,
                label: intl.formatMessage({ defaultMessage: 'From', id: 'event.form.date.from.label' })
              }}
              maxTime={maxTime}
              name={EventFormFields.STARTS_AT}
            />

            <TimeInputField
              disabled={isLoading}
              fieldContainerProps={{
                containerClassName: s.EventForm__timeInput,
                label: intl.formatMessage({ defaultMessage: 'To', id: 'event.form.date.to.label' })
              }}
              minTime={minTime}
              name={EventFormFields.ENDS_AT}
            />
          </div>
        )}
      </div>

      <CheckboxField
        disabled={isLoading}
        name={EventFormFields.IS_ALL_DAY}
        text={intl.formatMessage({ defaultMessage: 'All Day', id: 'event.form.date.sort.allDay' })}
      />
    </div>
  );
};
