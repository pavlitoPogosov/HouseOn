import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { AccountType } from 'graphql/types';
import { getAmpluaName } from 'utils/houseTeam';

import s from './PersonalInfo.module.scss';

export interface PersonalInfoProps {
  selectedMember: AccountType;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ selectedMember }) => {
  const intl = useIntl();

  return (
    <div>
      <div className={s.PersonalInfo__row}>
        <div className={s.PersonalInfo__rowItem}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage({ id: 'houseTeam.form.name.label', defaultMessage: 'Full name' })}
            color="textSecondary"
          />

          <Text variant={TextPropsVariantsEnum.BODY_M} text={selectedMember.name || ''} />
        </div>

        <div className={s.PersonalInfo__rowItem}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage({ id: 'houseTeam.form.role.label', defaultMessage: 'Member role' })}
            color="textSecondary"
          />

          <Text variant={TextPropsVariantsEnum.BODY_M} text={getAmpluaName(selectedMember.amplua || '', intl)} />
        </div>

        <div className={s.PersonalInfo__rowItem}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage({ id: 'houseTeam.form.phone.label', defaultMessage: 'Phone' })}
            color="textSecondary"
          />

          <Text variant={TextPropsVariantsEnum.BODY_M} text={selectedMember.user?.phone || ''} />
        </div>

        <div className={s.PersonalInfo__rowItem}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text="E-mail"
            color="textSecondary"
          />

          <Text variant={TextPropsVariantsEnum.BODY_M} text={selectedMember.user?.email || ''} />
        </div>
      </div>

      <div className={s.PersonalInfo__row}>
        <div className={s.PersonalInfo__rowItem}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage({ id: 'houseTeam.form.citizenship.label', defaultMessage: 'Citizenship' })}
            color="textSecondary"
          />

          <Text variant={TextPropsVariantsEnum.BODY_M} text={'United States'} />
        </div>

        <div className={clsx(s.PersonalInfo__rowItem, s.PersonalInfo__rowItemLarge)}>
          <Text
            className={s.PersonalInfo__itemName}
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage({ id: 'houseTeam.form.residence.label', defaultMessage: 'Residence' })}
            color="textSecondary"
          />

          <Text
            variant={TextPropsVariantsEnum.BODY_M}
            text={'South Hope Street, 333, Los Angeles, Los Angeles County, California'}
          />
        </div>
      </div>

      {/* {!!selectedMember.files.length && ( */}
      {/*  <>*/}
      {/*    <Text*/}
      {/*      className={s.PersonalInfo__itemName}*/}
      {/*      variant={TextPropsVariantsEnum.CAPTION_M}*/}
      {/*      text={intl.formatMessage({ id: 'houseTeam.form.files.label', defaultMessage: 'Files' })}*/}
      {/*      color="textSecondary"*/}
      {/*    />*/}

      {/*    <div className={s.PersonalInfo__imagesWrapper}>*/}
      {/*      {selectedMember.files.map((f, index) => (*/}
      {/*        <img key={index} src={f} alt="" className={s.PersonalInfo__img} />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};
