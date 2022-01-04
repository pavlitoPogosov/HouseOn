import React from 'react';

import { PhoneBlock } from 'common/components/ui/PhoneBlock/PhoneBlock';
import { ContactType } from 'graphql/types';

import s from './PhoneView.module.scss';

export interface PhoneViewProps {
  onDeletePhone: (phone: ContactType) => void;
  onEditPhone: (phone: ContactType) => void;
  phones: ContactType[];
}

export const PhoneView: React.FC<PhoneViewProps> = ({ onDeletePhone, onEditPhone, phones }) => {
  const handlePhoneEdit = (phone: ContactType) => {
    return () => {
      onEditPhone(phone);
    };
  };

  const handlePhoneDelete = (phone: ContactType) => {
    return () => {
      onDeletePhone(phone);
    };
  };

  return (
    <>
      {phones.map((c, i) => (
        <PhoneBlock
          additionalInfo={c.additional_info || ''}
          containerClassName={s.PhoneView__phone}
          disableHover
          key={`phone-${i}`}
          onDelete={handlePhoneDelete(c)}
          onEdit={handlePhoneEdit(c)}
          phone={c.phone}
          title={c.title}
        />
      ))}
    </>
  );
};
