import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { HouseDataFolderAside } from '../HouseDataFolderAside/HouseDataFolderAside';
import { HouseDataFolderControls } from '../HouseDataFolderControls/HouseDataFolderControls';

import { FolderCard } from './FolderCard/FolderCard';

import s from './HouseDataFolderMain.module.scss';

export interface HouseDataFolderMainProps {
  selectedCard: number | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
}

export const HouseDataFolderMain: React.FC<HouseDataFolderMainProps> = ({ selectedCard, setSelectedCard }) => {
  const history = useHistory();
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const intl = useIntl();

  const handleBackIconClick = () => {
    if (isAsideShown) {
      setSelectedCard(null);
    } else {
      history.goBack();
    }
  };

  const handleSelectedCardChange = (cardId: number) => {
    return () => {
      setSelectedCard(cardId);
    };
  };

  const isAsideShown = Boolean(!isDesktop && selectedCard);

  return (
    <>
      <HouseDataFolderControls
        title={intl.formatMessage({ id: 'houseData.layoutScheme.title', defaultMessage: 'Layout schemes' })}
        onClickBack={handleBackIconClick}
      />

      <Fade key={isAsideShown ? 'shown' : 'notShown'} isActive>
        {isAsideShown ? (
          <HouseDataFolderAside selectedCard={selectedCard} isMobile />
        ) : (
          <div className={s.HouseDataFolderMain__content}>
            {new Array(5).fill(1).map((_, i) => (
              <FolderCard
                key={i}
                containerClassName={s.HouseDataFolderMain__card}
                onClick={handleSelectedCardChange(i + 1)}
                isActive={selectedCard === i + 1}
                shouldAdapt={!isDesktop}
              />
            ))}
          </div>
        )}
      </Fade>
    </>
  );
};
