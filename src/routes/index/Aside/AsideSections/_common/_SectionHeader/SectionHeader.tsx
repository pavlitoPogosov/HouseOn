import React from 'react';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ViewAllLink } from 'routes/index/_common/ViewAllLink/ViewAllLink';

import s from './SectionHeader.module.scss';

export interface SectionHeaderProps {
  title: string;
  to: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, to }) => {
  return (
    <div className={s.SectionHeader__container}>
      <Text variant={TextPropsVariantsEnum.BODY_L} as="h5" text={title} className={s.SectionHeader__title} />

      <ViewAllLink to={to} />
    </div>
  );
};
