import moment from 'moment';

import { TDataItem, TUpcomingEventsWidgetProps } from './types.UpcomingEventsWidget';

const fakeDataGenerator = (n: number) => {
  const getRandomNumber = () => Math.floor(Math.random() * 10);
  const getDateRandom = () => new Date(+new Date() - Math.floor(Math.random() * 100));

  return Array(n)
    .fill(null)
    .map((_, id) => ({
      author: 'Ben Affleck',
      date: moment(getDateRandom()).format('MMMM DD, hh:mm A'),
      id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgF8uhC7o6A1vXBOf0a45bDY1CJMHbzerNg&usqp=CAU',
      imagesNumber: getRandomNumber(),
      location: 'Los Angeles, California',
      title: 'Some event'
    }));
};

/* TODO: подключить API */
export const useUpcomingEventsWidgetData = (): TUpcomingEventsWidgetProps => {
  const title = 'Upcoming events';
  const isDataLoading = false;

  const data: TDataItem[] = fakeDataGenerator(10);

  return {
    data,
    isDataLoading,
    title
  };
};
