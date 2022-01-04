import { IWeekControl } from 'common/components/ui/WeekControl/WeekControl';
import { AccountScheduleCreateInput, AccountScheduleUpdateInput, WeekDaysEnum } from 'graphql/types';

export function mapAccountSchedules(workingHours: { [key: string]: IWeekControl }) {
  const accountSchedules: AccountScheduleUpdateInput[] | AccountScheduleCreateInput[] = [];

  Object.keys(workingHours).forEach((key) => {
    const item = workingHours[key];
    if (item.isOn) {
      accountSchedules.push({
        end_time: item.time.endTime.clone(),
        start_time: item.time.startTime.clone(),
        weekday: key.toUpperCase() as WeekDaysEnum
      });
    }
  });

  return accountSchedules;
}
