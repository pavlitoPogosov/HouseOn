import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './LocationLabel.module.scss';

export interface ILocationLabel {
  className?: string;
  linkTo?: string;
  locationName: string;
}

export const LocationLabel: React.FC<ILocationLabel> = (props) => {
  const { className, linkTo, locationName } = props;

  const commonClassName = clsx(s.LocationLabel__container, className);

  const content = (
    <div className={commonClassName}>
      <LocationIcon className={s.LocationLabel__icon} />

      <Text
        className={clsx(s.LocationLabel__text)}
        color="white"
        text={locationName}
        variant={TextPropsVariantsEnum.CAPTION_M}
      />
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};
