import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { Button } from 'common/components/ui/Button';
import { EDatepickerCalendarTypes, IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { DatepickerInput } from 'common/components/ui/DatepickerInput/DatepickerInput';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TaskCreateModal } from 'routes/tasks/_components/TaskCreateModal/TaskCreateModal';
import { TaskEditModal } from 'routes/tasks/_components/TaskEditModal/TaskEditModal';
import { TASK_STATUS_TEXT_MAP } from 'routes/tasks/_components/TaskViewModal/Status/Status';
import { TaskViewModal } from 'routes/tasks/_components/TaskViewModal/TaskViewModal';
import { cardsTemp } from 'routes/tasks/allTasks/TaskCard/cardTemp';
import { TaskCard, TaskCardVariant } from 'routes/tasks/allTasks/TaskCard/TaskCard';

import s from './Tasks.module.scss';

export interface TasksProps {}

enum TabsValues {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month'
}

const STATUS_TASK_OPTIONS = Object.keys(TASK_STATUS_TEXT_MAP)
  // @ts-ignore
  .map((key) => ({ text: TASK_STATUS_TEXT_MAP[key] as string, value: key }));

const STARTED_BY_OPTIONS = [
  { text: 'Jonh', value: '1' },
  { text: 'Maria Ankerville', value: '2' },
  { text: 'Jonh', value: '3' },
  { text: 'Maria Ankerville', value: '4' }
];

export const Tasks: React.FC<TasksProps> = () => {
  const intl = useIntl();

  const [date, setDate] = useState<IDatepickerValue>({
    endDate: null,
    isChosenMonth: true,
    startDate: moment()
  });
  const [selectedStatus, setSelectedStatus] = useState<SortByPopupOption>(STATUS_TASK_OPTIONS[0]);
  const [selectedStarted, setSelectedStarted] = useState<SortByPopupOption>(STARTED_BY_OPTIONS[0]);

  const viewModal = useToggle();
  const createModal = useToggle();
  const editModal = useToggle();

  const datepickerToggler = useToggle();

  return (
    <div className={s.Tasks}>
      <div className={s.Tasks__actions}>
        <DatepickerInput
          containerClassName={s.Tasks__mr}
          disabledCalendars={[EDatepickerCalendarTypes.MONTH]}
          enableSwap
          isOpen={datepickerToggler.value}
          onChange={setDate}
          onClose={datepickerToggler.unset}
          onOpen={datepickerToggler.set}
          value={date}
        />
        <SortByPopup
          containerClassName={s.Tasks__mr}
          options={STATUS_TASK_OPTIONS}
          selectedOption={selectedStatus}
          onChange={setSelectedStatus}
        />
        <SortByPopup options={STARTED_BY_OPTIONS} selectedOption={selectedStarted} onChange={setSelectedStarted} />
        <Button className={s.Tasks__ml} onClick={createModal.set} color="orange">
          <Text variant={TextPropsVariantsEnum.BODY_M}>+ New Task</Text>
        </Button>
      </div>
      <Text className={s.Tasks__title} variant={TextPropsVariantsEnum.BODY_L}>
        {intl.formatMessage({ id: 'tasks.title', defaultMessage: 'Tasks' })}
      </Text>
      <Text className={s.Tasks__dividerText} variant={TextPropsVariantsEnum.CAPTION_M} color="textSecondary">
        August 30 Text
      </Text>
      <div className={s.Tasks__divider} />
      <div className={s.Tasks__items}>
        {cardsTemp.map((card, index) => (
          <TaskCard
            key={index}
            card={card}
            containerClassName={s.Tasks__item}
            variant={TaskCardVariant.SECONDARY}
            onClick={viewModal.set}
          />
        ))}
      </div>
      <TaskViewModal
        isOpen={viewModal.value}
        onClose={viewModal.unset}
        onEdit={() => {
          editModal.set();
          viewModal.unset();
        }}
      />
      <TaskCreateModal isOpen={createModal.value} onClose={createModal.unset} />
      <TaskEditModal
        isOpen={editModal.value}
        onClose={editModal.unset}
        onBack={() => {
          editModal.unset();
          viewModal.set();
        }}
      />
    </div>
  );
};
