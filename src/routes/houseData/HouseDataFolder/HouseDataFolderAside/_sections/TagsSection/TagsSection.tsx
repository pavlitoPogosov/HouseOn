import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { ISelectUsualMultipleOption, SelectUsualMultiple } from 'common/components/ui/Select';

import { SectionWrapper } from '../_SectionWrapper/SectionWrapper';

import s from './TagsSection.module.scss';

export interface TagsSectionProps {}

// TODO remove useless data
const TAGS_OPTIONS: ISelectUsualMultipleOption[] = [
  { text: 'Tag 1', value: '1' },
  { text: 'Tag 2', value: '2' },
  { text: 'Tag 3', value: '3' },
  { text: 'Tag 4', value: '4' },
  { text: 'Tag 5', value: '5' },
  { text: 'Tag 6', value: '6' },
  { text: 'Tag 7', value: '7' }
];

export const TagsSection: React.FC<TagsSectionProps> = () => {
  const [selectedTags, setSelectedTags] = useState<ISelectUsualMultipleOption[]>([]);

  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'houseData.tags.title', defaultMessage: 'Tags' })}>
      <SelectUsualMultiple
        value={selectedTags}
        options={TAGS_OPTIONS}
        onChange={setSelectedTags}
        label={intl.formatMessage({
          id: 'houseData.form.tag.label',
          defaultMessage: 'Typing tag'
        })}
        placeholder="text..."
        dropdownClassName={s.TagsSections__dropdown}
        fieldContainerProps={{ containerClassName: s.TagsSections__inputContainer }}
      />
    </SectionWrapper>
  );
};
