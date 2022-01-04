import React from 'react';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './SectionWrapper.module.scss';

export interface SectionWrapperProps {
  containerClassName?: string;
  title: string;
  titleCmp?: React.ReactElement;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, titleCmp, containerClassName, children }) => {
  return (
    <div className={clsx(s.SectionWrapper__container, containerClassName)}>
      <div className={s.SectionWrapper__titleWrapper}>
        <Text variant={TextPropsVariantsEnum.H3} className={s.SectionWrapper__title} text={title} />

        {titleCmp}
      </div>

      {children}
    </div>
  );
};
