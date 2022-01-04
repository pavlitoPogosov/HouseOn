import { range, intersection, last } from 'lodash';
import moment from 'moment';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { HouseEventType } from 'graphql/types';

export type TCalendarDayCell = {
  fullDate: moment.Moment;
};

export const getEventsCalendarDays = (props: IDatepickerValue): TCalendarDayCell[] => {
  const { endDate, startDate } = props;

  if (!endDate) {
    return [];
  }

  const diffInDays = Math.abs(startDate.diff(endDate, 'days'));

  return Array(diffInDays + 1)
    .fill(null)
    .map((_, i) => ({ fullDate: moment(startDate).add(i, 'days') }));
};

export type THouseEventWithStyles = {
  end?: number;
  gridRow: string;
  start: number;
} & HouseEventType;

export type THouseEventsRows = {
  [row: string]: {
    occupiedCells: number[];
    order: number;
  };
};

export const getEventsRows = (
  events: HouseEventType[],
  currentDate: IDatepickerValue
): { events: THouseEventWithStyles[]; rowsCount: number } => {
  if (!currentDate.endDate) {
    return {
      events: [],
      rowsCount: 0
    };
  }

  const eventsRows: THouseEventsRows = {};
  const eventsWithStyles = events.map((e, eIndex) => {
    const eventStartDate = e.starts_at.startOf('day');
    const eventEndDate = e.ends_at.startOf('day');

    // начальные стили
    let start = Math.abs(eventStartDate.diff(currentDate.startDate, 'days')) + 1;
    let end = Math.abs(eventEndDate.diff(currentDate.startDate, 'days')) + 1;

    const eventEndDateIsOver = eventEndDate.isSameOrAfter(currentDate.endDate);
    const eventStartDateIsOver = eventStartDate.isSameOrBefore(currentDate.startDate);

    if (eventStartDateIsOver) {
      start = 1;

      if (eventEndDateIsOver) {
        end = 7;
      }
    }

    if (eventEndDateIsOver && !eventStartDateIsOver) {
      end = Math.abs(currentDate.startDate.diff(currentDate.endDate, 'days'));
    }

    const event = {
      ...e,
      end,
      start
    } as THouseEventWithStyles;

    if (!Object.keys(eventsRows).length) {
      const gridRow = `${eIndex + 2}/${eIndex + 3}`;

      eventsRows[gridRow] = {
        occupiedCells: range(start, end + 1),
        order: 1
      };
      event.gridRow = gridRow;
    } else {
      const rowsEntries = Object.entries(eventsRows);
      const cellsEventNeeds = range(start, end + 1);

      let isEventSuitable = false;

      for (const entry of rowsEntries) {
        const [gridRow, { occupiedCells }] = entry;
        const rowHasFreeCells = !intersection(occupiedCells, cellsEventNeeds).length;

        if (rowHasFreeCells) {
          eventsRows[gridRow].occupiedCells = [...occupiedCells, ...cellsEventNeeds];
          event.gridRow = gridRow;
          isEventSuitable = true;
        }
      }

      if (!isEventSuitable) {
        const lastRowOrder = last(rowsEntries)![1].order;
        const gridRow = `${lastRowOrder + 2}/${lastRowOrder + 3}`;
        eventsRows[gridRow] = {
          occupiedCells: cellsEventNeeds,
          order: lastRowOrder + 1
        };
        event.gridRow = gridRow;
      }
    }

    return event;
  });

  return {
    events: eventsWithStyles,
    rowsCount: Object.keys(eventsRows).length
  };
};

export const getEventsSkeletons = (
  currentDate: IDatepickerValue
): {
  end: number;
  maxRange: number;
  start: number;
}[] => {
  const daysRange = Math.abs(currentDate.startDate.startOf('day').diff(currentDate.endDate?.startOf('day'), 'day')) + 1;

  return [
    {
      end: 2,
      maxRange: 2,
      start: 1
    },
    {
      end: 5,
      maxRange: 5,
      start: 3
    },
    {
      end: 7,
      maxRange: 6,
      start: 6
    },
    {
      end: 7,
      maxRange: 6,
      start: 5
    },
    {
      end: 4,
      maxRange: 3,
      start: 2
    }
  ].filter((s) => s.maxRange <= daysRange);
};
