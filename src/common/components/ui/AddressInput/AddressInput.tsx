import React, { useEffect, useRef, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { MapWithToggler, MapWithTogglerProps } from 'common/components/ui/GoogleMap';
import { Input, TInputProps } from 'common/components/ui/Input/Input';
import { useGoogleMapReadiness } from 'common/hooks/useGoogleMapReadiness';
import { GOOGLE_MAPS_ERROR_MESSAGE } from 'utils/errorMessages';

import { AddressInputSuggestions } from './AddressInputSuggestions/AddressInputSuggestions';

import s from './AddressInput.module.scss';

export type TAddressInputValue = {
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

type TOwnProps = {
  initialAddress?: string;
  mapProps?: Omit<MapWithTogglerProps, 'center'>;
  onChange: (value: TAddressInputValue) => void;
  value: TAddressInputValue;
};

export type TAddressInputProps = TOwnProps & Omit<TInputProps, 'onChange' | 'value'>;

export const AddressInput: React.FC<TAddressInputProps> = (props) => {
  const { fieldContainerProps, initialAddress, mapProps, onChange, value, ...otherProps } = props;

  const autocompleteRef = useRef<any | null>(null);

  const loadingCoordinatesToggler = useToggle();
  const loadingCoordinatesErrorToggler = useToggle();

  const [searchAddressValue, setSearchAddressValue] = useState(value.address || '');

  const isMapsReady = useGoogleMapReadiness();

  const handleClearDropdown = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.clearSuggestions();
    }
  };

  const handleInputChange = (val: string) => {
    setSearchAddressValue(val);
  };

  const handleInputBlur = () => {
    handleClearDropdown();
    setSearchAddressValue(value.address || '');
  };

  const handleSelectOption = async (address: string) => {
    try {
      loadingCoordinatesToggler.set();

      const addressCoordinates = await geocodeByAddress(address);

      onChange({
        address,
        coordinates: {
          latitude: addressCoordinates[0].geometry.location.lat(),
          longitude: addressCoordinates[0].geometry.location.lng()
        }
      });

      setSearchAddressValue(address);
      loadingCoordinatesErrorToggler.unset();
    } catch (err) {
      loadingCoordinatesErrorToggler.set();
      setSearchAddressValue('');
    } finally {
      loadingCoordinatesToggler.unset();
      handleClearDropdown();
    }
  };

  useEffect(() => {
    if (isMapsReady && initialAddress) {
      handleSelectOption(initialAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAddress, isMapsReady]);

  if (!isMapsReady) {
    return <Input value={value.address} {...otherProps} isLoading />;
  }

  return (
    <PlacesAutocomplete
      debounce={250}
      onChange={handleInputChange}
      onError={() => ({})}
      onSelect={handleSelectOption}
      ref={autocompleteRef}
      searchOptions={{ types: ['address'] }}
      value={searchAddressValue}
    >
      {(renderProps) => (
        <>
          <Input
            {...renderProps.getInputProps()}
            {...otherProps}
            fieldContainerProps={{
              ...fieldContainerProps,
              containerClassName: clsx(
                fieldContainerProps?.containerClassName,
                value.coordinates && s.AddressInput__disableMarginBottom
              ),
              error: loadingCoordinatesErrorToggler.value ? GOOGLE_MAPS_ERROR_MESSAGE : fieldContainerProps?.error
            }}
            isLoading={loadingCoordinatesToggler.value}
            onBlur={handleInputBlur}
          >
            <AddressInputSuggestions autoCompleteRenderProp={renderProps} searchAddressValue={searchAddressValue} />
          </Input>

          {value.coordinates && (
            <MapWithToggler
              {...mapProps}
              center={{
                lat: value.coordinates.latitude,
                lng: value.coordinates.longitude
              }}
              mapContainerClassName={clsx(mapProps?.mapContainerClassName, s.AddressInput__map)}
              togglerClassName={clsx(mapProps?.togglerClassName, s.AddressInput__mapToggler)}
            />
          )}
        </>
      )}
    </PlacesAutocomplete>
  );
};
