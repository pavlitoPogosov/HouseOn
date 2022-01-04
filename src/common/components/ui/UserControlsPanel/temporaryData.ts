import moment from 'moment';

import Avatar from './images/avatar.jpg';
import { INotification, NotificationTypesEnum } from './UserNotifications/UserNotification/UserNotification';

export const notificationsData: INotification[] = [
  {
    id: '1',
    date: moment().toISOString(),
    avatar: Avatar,
    type: NotificationTypesEnum.MESSAGE,
    messagesCount: 1,
    source: 'Seryozha Ivanov',
    message: {
      chat: 'cleaners',
      text: 'HouseOn offers a set of task in order to manage yours finance wast...'
    }
  },
  {
    id: '2',
    date: moment().toISOString(),
    avatar: Avatar,
    type: NotificationTypesEnum.TASK,
    tasksCount: 1,
    task: {
      to: 'wash the dishes',
      project: 'cleaning project'
    }
  },
  {
    id: '3',
    date: moment().toISOString(),
    avatar: Avatar,
    type: NotificationTypesEnum.OVERSUE_TASK,
    overdueTask: {
      name: 'wash the dishes',
      deadline: 1632733221
    }
  },
  {
    id: '4',
    date: moment().toISOString(),
    avatar: Avatar,
    type: NotificationTypesEnum.COMMENT,
    commentsCount: 1,
    comment: {
      avatar: Avatar,
      text: "I'm tired!"
    }
  },
  {
    id: '5',
    date: moment().toISOString(),
    avatar: Avatar,
    type: NotificationTypesEnum.OVERSUE_TASK,
    overdueTask: {
      name: 'wash the dishes',
      deadline: 1632639621
    }
  },
  {
    id: '6',
    avatar: '',
    date: moment().toISOString(),
    type: NotificationTypesEnum.APP,
    source: 'HouseOn'
  }
];
