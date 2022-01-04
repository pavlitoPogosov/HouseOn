import React from 'react';
import { PropTypes as ReactPlacesPropsTypes } from 'react-places-autocomplete';

import { ISelectPrimaryOption, SelectDropdown, SelectRenderOptionProps } from 'common/components/ui/Select';
import { normalizeString } from 'utils/stringUtils';

import s from './AddressInputSuggestions.module.scss';

type AddressInputSuggestionsProps = {
  searchAddressValue: string;
  autoCompleteRenderProp: Parameters<Pick<ReactPlacesPropsTypes, 'children'>['children']>[0];
};

export const AddressInputSuggestions: React.FC<AddressInputSuggestionsProps> = ({
  autoCompleteRenderProp,
  searchAddressValue
}) => {
  let hoveredOptionIndex: number | null = null;
  const mappedSuggestions: ISelectPrimaryOption[] = autoCompleteRenderProp.suggestions.map((s, i) => {
    if (normalizeString(s.description) === normalizeString(searchAddressValue)) {
      hoveredOptionIndex = i;
    }

    return {
      text: s.description,
      value: s.description
    };
  });

  const renderOption = ({ option, optionClassName }: SelectRenderOptionProps) => {
    const suggetionToGetProps = autoCompleteRenderProp.suggestions.find((s) => s.description === option.value);

    if (!suggetionToGetProps) return null;

    const divProps = autoCompleteRenderProp.getSuggestionItemProps(suggetionToGetProps);

    return (
      <div className={optionClassName} {...divProps}>
        {option.text}
      </div>
    );
  };

  return (
    <SelectDropdown
      isOpen={!!mappedSuggestions.length}
      options={mappedSuggestions}
      hoveredOptionIndex={hoveredOptionIndex}
      containerClassName={s.AddressInputSuggestion__container}
      renderOption={renderOption}
    />
  );
};
