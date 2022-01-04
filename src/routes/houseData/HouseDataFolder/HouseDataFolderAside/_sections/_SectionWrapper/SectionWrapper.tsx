import React from 'react';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './SectionWrapper.module.scss';

export interface SectionWrapperProps {
  title: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, title }) => {
  return (
    <section className={s.SectionWrapper__container}>
      <Text text={title} variant={TextPropsVariantsEnum.BODY_L} className={s.SectionWrapper__title} />

      {children}
    </section>
  );
};
