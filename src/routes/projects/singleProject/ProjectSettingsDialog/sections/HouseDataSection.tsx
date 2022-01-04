import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HouseData } from 'routes/projects/singleProject/SingleProjectHouseData/HouseData';
import { HOUSE_DATA_FILES } from 'routes/projects/temp-data';

import s from './styles.module.scss';

type THouseDataSection = {};

export const HouseDataSection: React.FC<THouseDataSection> = (props) => {
  const {} = props;

  const intl = useIntl();

  const handleRemove = (id: string) => {};

  return (
    <div className={s.SingleProjectHouseData__container}>
      <Text
        className={s.SingleProjectHouseData__title}
        text={intl.formatMessage({
          defaultMessage: 'House Data',
          id: 'project.settings.form.houseData.title'
        })}
        variant={TextPropsVariantsEnum.H3}
      />

      <HouseData alertColor="gray" files={HOUSE_DATA_FILES} isBanner={false} isEdit onRemove={handleRemove} />
    </div>
  );
};
