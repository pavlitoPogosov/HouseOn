import React from 'react';
import { useIntl } from 'react-intl';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { SectionWrapper } from '../_SectionWrapper/SectionWrapper';

import s from './CreatorSection.module.scss';

export interface CreatorSectionProps {}

export const CreatorSection: React.FC<CreatorSectionProps> = () => {
  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'houseData.creator.title', defaultMessage: 'Creator' })}>
      <Text className={s.CreatorSection__creatorWrapper} variant={TextPropsVariantsEnum.BODY_L} as="div">
        <Avatar containerClassName={s.CreatorSection__creatorAvatar} emptyClassName={s.CreatorSection__emptyAvatar} />
        Flores, Juan
      </Text>
    </SectionWrapper>
  );
};
