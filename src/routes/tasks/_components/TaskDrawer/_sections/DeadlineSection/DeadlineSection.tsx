import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

import { DateInput } from 'common/components/ui/DateInput/DateInput';
import { EDatepickerCalendarTypes, IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { useToggleable } from 'common/hooks/useToggleable';

import s from './DeadlineSection.module.scss';

export interface DeadlineSectionProps {}

export const DeadlineSection: React.FC<DeadlineSectionProps> = () => {
  const [dateInputValue, setDateInputValue] = useState<IDatepickerValue>({
    endDate: null,
    isChosenMonth: false,
    startDate: moment()
  });

  const { isOpen, onToggle, refCallback, setStyles, styles } = useToggleable();

  const intl = useIntl();

  const handleOpenPicker = () => {
    setStyles((prev) => ({
      ...prev,
      overflow: 'visible'
    }));
  };

  return (
    <div className={s.DeadlineSection__container}>
      <Text className={s.DeadlineSection__title} variant={TextPropsVariantsEnum.H3}>
        {intl.formatMessage({ defaultMessage: 'Deadline', id: 'tasks.deadline.title' })}

        <ToggleSwitch checked={isOpen} containerClassName={s.DeadlineSection__toggler} onChange={onToggle} size="md" />
      </Text>

      <div ref={refCallback} style={styles}>
        <DateInput
          datepickerProps={{
            disableRangeSelect: true,
            disabledCalendars: [EDatepickerCalendarTypes.YEAR],
            disabledTillDate: moment().startOf('day')
          }}
          fieldContainerProps={{
            containerClassName: s.DeadlineSection__inputContainer,
            label: intl.formatMessage({ defaultMessage: 'Deadline', id: 'tasks.form.deadline.label' })
          }}
          onChange={setDateInputValue}
          onOpenDatepicker={handleOpenPicker}
          value={dateInputValue}
        />
      </div>
    </div>
  );
};
