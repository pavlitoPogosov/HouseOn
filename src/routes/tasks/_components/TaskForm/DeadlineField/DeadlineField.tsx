import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

import { DateInput } from 'common/components/ui/DateInput/DateInput';
import { EDatepickerCalendarTypes, IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { useToggleable } from 'common/hooks/useToggleable';

import s from './DeadlineField.module.scss';

export interface DeadlineFieldProps {}

export const DeadlineField: React.FC<DeadlineFieldProps> = () => {
  const [dateInputValue, setDateInputValue] = useState<IDatepickerValue>({
    startDate: moment(),
    endDate: null,
    isChosenMonth: false
  });

  const { isOpen, styles, setStyles, onToggle, refCallback } = useToggleable();

  const intl = useIntl();

  const handleOpenPicker = () => {
    setStyles((prev) => ({
      ...prev,
      overflow: 'visible'
    }));
  };

  return (
    <div className={s.DeadlineField__container}>
      <Text as="div" variant={TextPropsVariantsEnum.BODY_M} color="textSecondary" className={s.DeadlineField__title}>
        {intl.formatMessage({ id: 'tasks.deadline.title', defaultMessage: 'Deadline' })}
        <ToggleSwitch onChange={onToggle} checked={isOpen} containerClassName={s.DeadlineField__toggler} size="md" />
      </Text>
      <Text variant={TextPropsVariantsEnum.BODY_M} color="textTretiary">
        You can set a deadline for a single task or for a periodicity.
      </Text>

      <div ref={refCallback} style={styles}>
        <DateInput
          fieldContainerProps={{
            label: intl.formatMessage({ id: 'tasks.form.until.label', defaultMessage: 'Until' }),
            containerClassName: s.DeadlineField__inputContainer
          }}
          value={dateInputValue}
          onChange={setDateInputValue}
          datepickerProps={{
            disabledCalendars: [EDatepickerCalendarTypes.YEAR],
            disableRangeSelect: true,
            disabledTillDate: moment().startOf('day')
          }}
          onOpenDatepicker={handleOpenPicker}
        />
      </div>
    </div>
  );
};
