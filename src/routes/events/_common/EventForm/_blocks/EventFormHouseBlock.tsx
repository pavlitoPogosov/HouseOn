import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useFormikContext } from 'formik';

import { SelectTextualField } from 'common/components/ui/_formikComponents/SelectField/SelectTextualField';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { ISelectTextualOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

import { EventFormFields } from '../EventForm';

import s from './_styles.module.scss';

export interface IEventFormHouseBlockProps {
  houseId: string;
  title: string | undefined;
}

export const EventFormHouseBlock: React.FC<IEventFormHouseBlockProps> = (props) => {
  const { houseId, title } = props;

  const { availableAccounts, currentHouseId } = useTypedSelector((state) => state.accounts);

  const { setFieldValue } = useFormikContext();

  const intl = useIntl();

  useEffect(() => {
    const id = houseId?.length ? houseId : currentHouseId;
    setFieldValue(EventFormFields.HOUSE_ID, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseId]);

  const selectOptions: ISelectTextualOption[] = useMemo(() => {
    return (availableAccounts || []).map((a) => ({
      text: a.house.title,
      value: a.house_id
    }));
  }, [houseId]);

  return (
    <div className={s.EventForm__houseBlockWrapper}>
      {/* TODO add real house img, when backend ready */}

      <Avatar
        containerClassName={s.EventForm__houseBlockAvatar}
        emptyClassName={s.EventForm__houseBlockEmptyAvatar}
        height={56}
        width={56}
      />

      <div>
        <Text
          text={intl.formatMessage({ defaultMessage: title || 'New event', id: 'event.form.house.newEvent' })}
          variant={TextPropsVariantsEnum.H2}
        />

        <SelectTextualField
          name={EventFormFields.HOUSE_ID}
          options={selectOptions}
          prefix={intl.formatMessage({ defaultMessage: 'Create in:', id: 'event.form.house.houseIdField' })}
        />
      </div>
    </div>
  );
};
