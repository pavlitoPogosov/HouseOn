import React from 'react';

import { ReactComponent as GeoIcon } from 'assets/icons/geoIconSmall.svg';
import { Button } from 'common/components/ui/Button/Button';
import { DropzonePreview } from 'common/components/ui/DropzonePreview/DropzonePreview';
import { FieldContainer } from 'common/components/ui/FieldContainer/FieldContainer';
import { UsualMap } from 'common/components/ui/GoogleMap';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { DIRECTIONS_FORM_INITIAL_VALUES } from '../DirectionsEdit/DirectionsEdit';

import s from './DirectionsView.module.scss';

export interface IDirectionsViewProps {
  values: typeof DIRECTIONS_FORM_INITIAL_VALUES;
}

export const DirectionsView: React.FC<IDirectionsViewProps> = ({ values }) => {
  const { additional, address, pictures } = values;

  const handleAddressCopy = (stringToCopy: string) => {
    return () => {
      navigator.clipboard.writeText(stringToCopy);
    };
  };

  return (
    <div className={s.DirectionsView__container}>
      {address.coordinates && (
        <UsualMap
          center={{
            lat: address.coordinates.latitude,
            lng: address.coordinates.longitude
          }}
          containerClassName={s.DirectionView__map}
        />
      )}

      {address.address && (
        <div className={s.DirectionsView__address}>
          <address>
            <Text color="textSecondary" variant={TextPropsVariantsEnum.BODY_M}>
              <GeoIcon />

              {address.address}
            </Text>
          </address>

          <Button color="orange" onClick={handleAddressCopy(address.address)} size="s">
            Copy adress
          </Button>
        </div>
      )}

      {!!pictures.length && <DropzonePreview fieldContainerProps={{ label: 'Additional pictures' }} value={pictures} />}

      {additional && (
        <FieldContainer containerClassName={s.DirectionsView__additional} label="Additional info" variant="primary">
          <Text text={additional} variant={TextPropsVariantsEnum.BODY_M} />
        </FieldContainer>
      )}
    </div>
  );
};
