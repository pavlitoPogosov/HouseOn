import React, { useRef } from 'react';

import clsx from 'clsx';

import { GoogleMap, GoogleMapProps, Marker } from '@react-google-maps/api';
import { UsualMapSkeleton } from 'common/components/ui/_skeletons/UsualMapSkeleton/UsualMapSkeleton';
import { useGoogleMapReadiness } from 'common/hooks/useGoogleMapReadiness';

import { ReactComponent as LocationIcon } from '../icons/locationIcon.svg';
import MarkerIcon from '../icons/markerIcon.svg';
import { ReactComponent as MinusIcon } from '../icons/minusIcon.svg';
import { ReactComponent as PlusIcon } from '../icons/plusIcon.svg';
import { theme } from '../theme';

import s from './UsualMap.module.scss';

type OwnProps = {
  initialZoom?: number;
  containerClassName?: string;
  isLoading?: boolean;
  center?: {
    lat: number;
    lng: number;
  } | null;
};

export type UsualMapProps = OwnProps & Omit<GoogleMapProps, 'center'>;

export const UsualMap: React.FC<UsualMapProps> = ({
  containerClassName,
  center,
  options,
  isLoading,
  zoom = 12,
  ...otherProps
}) => {
  const mapRef = useRef<GoogleMap>();
  const isMapReady = useGoogleMapReadiness();

  // подстраховка
  if (!isMapReady || isLoading || !center) {
    return <UsualMapSkeleton containerClassName={clsx(s.UsualMap__container, containerClassName)} />;
  }

  const handleZoomChange = (num: 1 | -1) => {
    return () => {
      if (mapRef.current && mapRef.current.state.map) {
        const currentZoom = mapRef.current.state.map.getZoom();

        if (currentZoom) {
          mapRef.current.state.map?.setZoom(currentZoom + num);
        }
      }
    };
  };

  const handleLocationClick = () => {
    if (mapRef.current) {
      mapRef.current.state.map?.panTo(center);
    }
  };

  return (
    <div className={clsx(s.UsualMap__container, containerClassName)}>
      <GoogleMap
        mapContainerClassName={s.UsualMap__map}
        center={center}
        zoom={zoom}
        ref={mapRef as any}
        options={{
          styles: theme,
          controlSize: 0,
          panControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          ...options
        }}
        {...otherProps}>
        <Marker position={center} icon={{ url: MarkerIcon }} />

        <div className={s.UsualMap__zoomIn} onClick={handleZoomChange(1)}>
          <PlusIcon />
        </div>

        <div className={s.UsualMap__zoomOut} onClick={handleZoomChange(-1)}>
          <MinusIcon />
        </div>

        <div className={s.UsualMap__location} onClick={handleLocationClick}>
          <LocationIcon />
        </div>
      </GoogleMap>
    </div>
  );
};
