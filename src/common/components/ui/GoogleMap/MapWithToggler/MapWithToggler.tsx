import React, { useState } from 'react';

import clsx from 'clsx';

import { ReactComponent as GeomarkIcon } from 'assets/icons/geomark.svg';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';

import { UsualMap, UsualMapProps } from '../UsualMap/UsualMap';

import s from './MapWithToggler.module.scss';

type OwnProps = {
  isInitiallyVisible?: boolean;
  mapContainerClassName?: string;
  togglerClassName?: string;
  isLoading?: boolean;
};

export type MapWithTogglerProps = OwnProps & Omit<UsualMapProps, 'center'> & Partial<Pick<UsualMapProps, 'center'>>;

export const MapWithToggler: React.FC<MapWithTogglerProps> = ({
  isInitiallyVisible,
  mapContainerClassName,
  togglerClassName,
  center,
  ...otherProps
}) => {
  const [isMapVisible, setMapVisibility] = useState(!!isInitiallyVisible);
  const toggleVisibility = () => setMapVisibility((prev) => !prev);

  return (
    <>
      <div onClick={toggleVisibility} className={clsx(s.MapWithToggler, togglerClassName)}>
        <div className={s.MapWithToggler__mapIcon}>
          <GeomarkIcon />
        </div>
        {isMapVisible ? 'Hide map' : 'Show map'}
      </div>

      {isMapVisible && (
        <Fade className={clsx(mapContainerClassName)} isActive>
          <UsualMap center={center} {...otherProps} />
        </Fade>
      )}
    </>
  );
};
