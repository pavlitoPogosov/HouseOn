import React from 'react';

import clsx from 'clsx';

import { EColors } from 'variables/colors';

import s from './IconStatic.module.scss';

type TIconStaticProps = {
  backgroundColor?: EColors;
  className?: string;
  icon?: JSX.Element;
  isCircle?: boolean;
};

export const IconStatic: React.FC<TIconStaticProps> = (props) => {
  const { backgroundColor, children, className, icon, isCircle = true } = props;

  const containerStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <div className={clsx(s.IconStatic__container, className, isCircle && s.icon_circle)} style={containerStyle}>
      {children || icon}
    </div>
  );
};
