import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as ArrowDiagonalIcon } from 'assets/icons/arrowDiagonal.svg';
import { Alert } from 'common/components/ui/Alert/Alert';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HouseData } from 'routes/projects/singleProject/SingleProjectHouseData/HouseData';
import { HOUSE_DATA_FILES } from 'routes/projects/temp-data';

import s from './SingleProjectHouseData.module.scss';

export const SingleProjectHouseData: React.FC<unknown> = () => {
  const isRunning = false;

  const intl = useIntl();

  return (
    <div className={s.SingleProjectHouseData__container}>
      {isRunning && (
        <div className={s.SingleProjectHouseData__about}>
          <Text text="About the project" variant={TextPropsVariantsEnum.H3} />

          <Text
            color="textSecondary"
            text="This is a project that will allow you to keep everything in order so that you have it in predictable places."
            variant={TextPropsVariantsEnum.BODY_M}
          />
        </div>
      )}

      <div className={s.SingleProjectHouseData__title}>
        <Text
          text={intl.formatMessage({
            defaultMessage: 'House Data',
            id: 'projects.houseData.title'
          })}
          variant={TextPropsVariantsEnum.H3}
        />

        <IconCircle
          className={s.SingleProjectHouseData__iconCircle}
          height={32}
          icon={<ArrowDiagonalIcon />}
          width={32}
        />
      </div>

      {!isRunning && <HouseData files={HOUSE_DATA_FILES} />}

      {isRunning && (
        <Alert
          color="white"
          onClose={() => ({})}
          // TODO add onClose
          text={intl.formatMessage({
            defaultMessage:
              'There is a place where all data about the house collects. You can open access to data or add some files so your house team could see it.',
            id: 'projects.houseData.alert.text.place'
          })}
        />
      )}
    </div>
  );
};
