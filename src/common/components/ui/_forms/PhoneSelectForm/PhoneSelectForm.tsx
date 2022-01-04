import React, { useEffect } from 'react';

import { Loader } from 'common/components/ui/Loader/Loader';
import { PhoneBlock } from 'common/components/ui/PhoneBlock/PhoneBlock';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ContactType } from 'graphql/types';

import s from './PhoneSelectForm.module.scss';

export type TContactsGroup = {
  cells: ContactType[];
  title: string;
};

export type TContactsGroups = TContactsGroup[];

export interface IPhoneSelectFormProps {
  contacts?: TContactsGroups;
  hiddenPhones: ContactType[];
  isLoading?: boolean;
  selectedPhones: ContactType[];
  setSelectedPhones: React.Dispatch<React.SetStateAction<ContactType[]>>;
}

const commonFind = (array: ContactType[], item: ContactType) => {
  return array.find((phone) => phone.id === item.id);
};

const EmptyMessage = () => (
  <div className={s.PhoneSelectForm__empty_message}>
    The current House account
    <br />
    does not have any previously added contacts
  </div>
);

const uniqueReducer = (arr: ContactType[], curr: ContactType) => {
  const isExists = arr.find((p) => p.id === curr.id);
  if (isExists) {
    return arr;
  }

  return [...arr, curr];
};

export const PhoneSelectForm: React.FC<IPhoneSelectFormProps> = (props) => {
  const { contacts = [], hiddenPhones, isLoading, selectedPhones, setSelectedPhones } = props;

  const phonesArr = contacts.flatMap((phoneBlock) =>
    phoneBlock?.cells?.filter((p) => !commonFind(hiddenPhones || [], p))
  );

  const handlePhoneSelect = (newPhone: ContactType) => {
    return () => {
      setSelectedPhones((prev) => {
        const isCurrentSelected = !!prev.find((p) => p.id === newPhone.id);
        const common = phonesArr?.filter((phone) => phone.phone === newPhone.phone && phone.id !== newPhone.id);
        const group = [...common, newPhone].reduce(uniqueReducer, [] as ContactType[]);
        const groupPhones = [...group.map((p) => p.id)];

        if (isCurrentSelected) {
          return prev.filter((phone) => !groupPhones.includes(phone.id));
        }

        return [...prev, ...group].reduce(uniqueReducer, [] as ContactType[]);
      });
    };
  };

  useEffect(() => {
    return () => {
      setSelectedPhones([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {!contacts.length && <EmptyMessage />}

      {contacts.map((phoneBlock) => {
        const phonesToMap = phoneBlock?.cells?.filter((p) => !commonFind(hiddenPhones || [], p));

        return (
          <div key={phoneBlock.title}>
            <Text
              className={s.PhoneSelectForm__title}
              color="textTretiary"
              text={phoneBlock.title}
              variant={TextPropsVariantsEnum.CAPTION_M}
            />

            {phonesToMap.map((p) => {
              const isActive = !!selectedPhones.find((phone) => phone.id === p.id);

              return (
                <PhoneBlock
                  additionalInfo={p.additional_info || undefined}
                  containerClassName={s.PhoneSelectForm__phone}
                  contentClassName={s.PhoneSelectForm__phone_content}
                  disableCopy
                  isActive={isActive}
                  key={`phone-block-${p.id}`}
                  onClick={handlePhoneSelect(p)}
                  phone={p.phone}
                  title={p.title}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
