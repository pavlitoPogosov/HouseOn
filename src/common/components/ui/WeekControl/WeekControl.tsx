import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { TimeInput } from 'common/components/ui/TimeInput/TimeInput';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './WeekControl.module.scss';

export interface IWeekControl {
  isOn: boolean;
  time: {
    startTime: moment.Moment;
    endTime: moment.Moment;
  };
}

export interface WeekControlProps {
  adaptQuery?: string;
  containerClassName?: string;
  loading?: boolean;

  days: { [key in string]: IWeekControl };
  onChange: (value: { [key in string]: IWeekControl }) => void;
}

export const WeekControl: React.FC<WeekControlProps> = ({
  containerClassName,
  days,
  adaptQuery = '(max-width: 560px)',
  loading = false,
  onChange
}) => {
  const shouldAdapt = useMediaQuery(adaptQuery);

  const handleToggleSwitchChange = (dayName: string, value: boolean) => {
    return () => {
      onChange({
        ...days,
        [dayName]: {
          isOn: value,
          time: days[dayName].time
        }
      });
    };
  };

  const handleTimeChange = (dayName: string, type: 'startTime' | 'endTime') => {
    return (value: moment.Moment) => {
      onChange({
        ...days,
        [dayName]: {
          isOn: days[dayName].isOn,
          time: {
            ...days[dayName].time,
            [type]: value
          }
        }
      });
    };
  };

  return (
    <div className={clsx(containerClassName)}>
      {Object.entries(days).map(([dayName, dayData]) => (
        <div key={dayName} className={clsx(s.WeekControl__day, shouldAdapt && s.mobile)}>
          <div className={clsx(s.WeekControl__toggleContainer, shouldAdapt && s.mobile)}>
            <div className={s.WeekControl__dayName}>{dayName}</div>

            <ToggleSwitch
              checked={dayData.isOn}
              onChange={handleToggleSwitchChange(dayName, !dayData.isOn)}
              disabled={loading}
            />
          </div>

          {dayData.isOn && (
            <div className={clsx(s.WeekControl__timeWrapper, shouldAdapt && s.mobile)}>
              <TimeInput
                value={dayData.time.startTime}
                onChange={handleTimeChange(dayName, 'startTime')}
                inputClassName={s.WeekControl__timeInput}
                maxTime={dayData.time.endTime}
                fieldContainerProps={{
                  containerClassName: s.WeekControl__timeInputContainer
                }}
                disabled={loading}
              />

              <span className={s.WeekControl__to}>to:</span>

              <TimeInput
                value={dayData.time.endTime}
                onChange={handleTimeChange(dayName, 'endTime')}
                inputClassName={s.WeekControl__timeInput}
                minTime={dayData.time.startTime}
                fieldContainerProps={{
                  containerClassName: s.WeekControl__timeInputContainer
                }}
                disabled={loading}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
