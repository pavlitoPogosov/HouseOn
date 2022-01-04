import React from 'react';
import { useHistory } from 'react-router';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HOUSE_DATA_FOLDER_PAGE_ROUTE } from 'utils/routes';

import { ReactComponent as HistoryIcon } from '../_icons/history.svg';

import s from './DocumentTypeCard.module.scss';

export interface IDocumentTypeCard {
  title: string;
  tags: string[];
}
export interface DocumentTypeCardProps {
  containerClassName?: string;
  card: IDocumentTypeCard;
}

export const DocumentTypeCard: React.FC<DocumentTypeCardProps> = ({ card, containerClassName }) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(HOUSE_DATA_FOLDER_PAGE_ROUTE.replace(':id(\\d+)', '1'));
  };

  return (
    <div onClick={handleCardClick} className={clsx(s.DocumentTypeCard__container, containerClassName)}>
      <div className={s.DocumentTypeCard__iconWrapper}>
        <HistoryIcon />
      </div>

      <div>
        <Text variant={TextPropsVariantsEnum.BODY_L} className={s.DocumentTypeCard__title} text={card.title} />
        {card.tags.map((t, i) => (
          <Text
            key={i}
            className={s.DocumentTypeCard__tag}
            variant={TextPropsVariantsEnum.CAPTION_M}
            color="textSecondary">
            {t}
          </Text>
        ))}
      </div>
    </div>
  );
};
