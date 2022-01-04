import React from 'react';
import { useIntl } from 'react-intl';

import { NBSP } from '@proscom/ui-utils';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './WorkList.module.scss';

export enum WorkListEnums {
  STARTED = 'started',
  STOPPED = 'stopped'
}

export type IWorkListItem = {
  type: WorkListEnums;
  time: string;
};

export interface WorkListProps {
  list: IWorkListItem[];
}

export const WorkList: React.FC<WorkListProps> = ({ list }) => {
  const intl = useIntl();

  const started = (time: string) =>
    intl.formatMessage(
      {
        id: 'houseTeam.finance.workList.started',
        defaultMessage: 'Started at {time}'
      },
      {
        time: (
          <Text className={s.WorkList__time} variant={TextPropsVariantsEnum.BODY_M}>
            {NBSP}
            {time}
          </Text>
        )
      }
    );

  const stopped = (time: string) =>
    intl.formatMessage(
      {
        id: 'houseTeam.finance.workList.stopped',
        defaultMessage: 'Stopped at {time}'
      },
      {
        time: (
          <Text className={s.WorkList__time} variant={TextPropsVariantsEnum.BODY_M}>
            {NBSP}
            {time}
          </Text>
        )
      }
    );

  return (
    <div className={s.WorkList}>
      {list.map(({ type, time }, index) => (
        <div key={index} className={s.WorkList__item}>
          <div className={s.WorkList__iconWrapper}>
            <div className={s.WorkList__icon} />
          </div>
          <Text className={s.WorkList__text} variant={TextPropsVariantsEnum.CAPTION_R}>
            {type === WorkListEnums.STARTED ? started(time) : stopped(time)}
          </Text>
        </div>
      ))}
    </div>
  );
};
