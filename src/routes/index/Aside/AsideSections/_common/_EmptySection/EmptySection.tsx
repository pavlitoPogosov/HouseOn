import React from 'react';

import { Banner } from 'common/components/ui/Banner/Banner';
import { ButtonLink } from 'common/components/ui/Button/Button';
import { TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './EmptySection.module.scss';

export interface IEmptySectionProps {
  buttonLink: string;
  buttonText: string;
  text: string;
  textTitle: string;
}

export const EmptySection: React.FC<IEmptySectionProps> = (props) => {
  const { buttonLink, buttonText, text, textTitle } = props;

  return (
    <Banner description={text} title={textTitle} titleVariant={TextPropsVariantsEnum.BODY_M} variant="secondary">
      <ButtonLink className={s.EmptySection__btn} color="orange" size="s" to={buttonLink} variant="secondary">
        {buttonText}
      </ButtonLink>
    </Banner>
  );
};
