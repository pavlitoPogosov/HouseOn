import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { AboutSection } from './_sections/AboutSection/AboutSection';
import { CreatorSection } from './_sections/CreatorSection/CreatorSection';
import { FilesSection } from './_sections/FilesSection/FilesSection';
import { LastActivities } from './_sections/LastActivities/LastActivities';
import { TagsSection } from './_sections/TagsSection/TagsSection';
import { VisibilitySection } from './_sections/VisibilitySection/VisibilitySection';

import s from './HouseDataFolderAside.module.scss';

export interface HouseDataFolderAsideProps {
  isMobile?: boolean;
  selectedCard: number | null;
}

export const HouseDataFolderAside: React.FC<HouseDataFolderAsideProps> = ({ isMobile, selectedCard }) => {
  const intl = useIntl();

  if (!selectedCard && !isMobile) {
    return (
      <div className={s.HouseDataFolderAside__emptyMessage}>
        <div className={s.HouseDataFolderAside__emptyImage} />

        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'houseData.section.mobileHint',
            defaultMessage: 'Choose section from the list to view full information'
          })}
          color="textSecondary"
        />
      </div>
    );
  }

  return (
    <div className={s.HouseDataFolderAside__container}>
      <AboutSection isMobile={isMobile} />
      <CreatorSection />
      <TagsSection />
      <VisibilitySection />
      <FilesSection />
      <LastActivities />
    </div>
  );
};
