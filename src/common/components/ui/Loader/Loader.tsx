import React from 'react';

import clsx from 'clsx';

import s from './Loader.module.scss';

type TLoaderProps = {
  containerClassName?: string;
  wrapperClassName?: string;
};

export const Loader = (props: TLoaderProps): JSX.Element => {
  const { containerClassName, wrapperClassName } = props;

  return (
    <div className={clsx(s.Loader__wrapper, wrapperClassName)}>
      <div className={clsx(s.Loader__container, containerClassName)} />
    </div>
  );
};
