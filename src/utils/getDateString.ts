import { Moment } from 'moment';

export const getDateString = (startDate: Moment, endDate?: Moment) => {
  const startsAtYear = startDate.format('YYYY');
  const startsAtMonth = startDate.format('MMMM');
  const startsAtDay = startDate.format('D');
  const startsAtTime = startDate.format('HH:mm');

  const endDateYear = endDate?.format('YYYY');
  const endDateMonth = endDate?.format('MMMM');
  const endDateDay = endDate?.format('D');
  const endDateTime = endDate?.format('HH:mm');

  const isSameYear = startsAtYear === endDateYear;
  const isSameMonth = startsAtMonth === endDateMonth;
  const isSameDay = startsAtDay === endDateDay;
  const isSameTime = startsAtTime === endDateTime;

  let dateStr;

  if (endDate) {
    if (isSameYear) {
      if (isSameMonth) {
        if (isSameDay) {
          if (isSameTime) {
            dateStr = `${startDate.format('MMMM D HH:mm')}`;
          } else {
            dateStr = `${startDate.format('MMMM D HH:mm')} - ${endDate.format('HH:mm')}`;
          }
        } else {
          dateStr = `${startDate.format('MMMM D HH:mm')} - ${endDate.format('D HH:mm')}`;
        }
      } else {
        dateStr = `${startDate.format('MMMM D HH:mm')} - ${endDate.format('MMMM D HH:mm')}`;
      }
    } else {
      dateStr = `${startDate.format('MM/DD/YYYY HH:mm')} - ${endDate.format('M/DD/YYYY HH:mm')}`;
    }
  } else {
    dateStr = `${startDate.format('MMMM D HH:mm')}`;
  }

  return dateStr;
};
