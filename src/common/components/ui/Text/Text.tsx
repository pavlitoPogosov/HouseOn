import React from 'react';

import clsx from 'clsx';

import s from './Text.module.scss';

export enum TextPropsVariantsEnum {
  BODY_L = 'bodyL',
  BODY_M = 'bodyM',
  CAPTION_ALL_CAPS = 'captionAllCaps',
  CAPTION_ALL_CAPS_SMALL = 'captionAllCapsSmall',
  CAPTION_M = 'captionM',
  CAPTION_R = 'captionR',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4'
}

const DEFAULT_VARIANTS_TAGS = {
  [TextPropsVariantsEnum.H1]: 'h1',
  [TextPropsVariantsEnum.H2]: 'h2',
  [TextPropsVariantsEnum.H3]: 'h3',
  [TextPropsVariantsEnum.H4]: 'h4',
  [TextPropsVariantsEnum.BODY_L]: 'p',
  [TextPropsVariantsEnum.BODY_M]: 'p',
  [TextPropsVariantsEnum.CAPTION_M]: 'div',
  [TextPropsVariantsEnum.CAPTION_R]: 'div',
  [TextPropsVariantsEnum.CAPTION_ALL_CAPS]: 'div',
  [TextPropsVariantsEnum.CAPTION_ALL_CAPS_SMALL]: 'div'
};

export enum ETextColors {
  ORANGE = 'orange',
  SECONDARY = 'textSecondary',
  TRETIARY = 'textTretiary',
  WHITE = 'white'
}

export interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: 'white' | 'textSecondary' | 'textTretiary' | 'textBrand' | 'orange' | 'gray';
  onClick?: (e: React.MouseEvent) => void;
  text?: string;
  variant?: TextPropsVariantsEnum;
}

export const Text: React.FC<TextProps> = ({ as, children, className, color, onClick, text, variant = 'h1' }) => {
  const isH1 = variant === TextPropsVariantsEnum.H1;
  const isH2 = variant === TextPropsVariantsEnum.H2;
  const isH3 = variant === TextPropsVariantsEnum.H3;
  const isH4 = variant === TextPropsVariantsEnum.H4;
  const isBodyL = variant === TextPropsVariantsEnum.BODY_L;
  const isBodyM = variant === TextPropsVariantsEnum.BODY_M;
  const isCaptionM = variant === TextPropsVariantsEnum.CAPTION_M;
  const isCaptionR = variant === TextPropsVariantsEnum.CAPTION_R;
  const isCaptionAllCaps = variant === TextPropsVariantsEnum.CAPTION_ALL_CAPS;
  const isCaptionAllCapsS = variant === TextPropsVariantsEnum.CAPTION_ALL_CAPS_SMALL;

  // @ts-ignore
  const CustomTag = as ?? DEFAULT_VARIANTS_TAGS[variant];

  return (
    <CustomTag
      className={clsx(
        {
          [s.Text__h1]: isH1,
          [s.Text__h2]: isH2,
          [s.Text__h3]: isH3,
          [s.Text__h4]: isH4,
          [s.Text__bodyL]: isBodyL,
          [s.Text__bodyM]: isBodyM,
          [s.Text__captionM]: isCaptionM,
          [s.Text__captionR]: isCaptionR,
          [s.Text__captionAllCaps]: isCaptionAllCaps,
          [s.Text__captionAllCapsS]: isCaptionAllCapsS,
          [s.Text__secondary]: color === 'textSecondary',
          [s.Text__tretiary]: color === 'textTretiary',
          [s.Text__brand]: color === 'textBrand',
          [s.Text__orange]: color === 'orange',
          [s.Text__white]: color === 'white',
          [s.Text__gray]: color === 'gray'
        },
        className
      )}
      onClick={onClick}
    >
      {children ?? text}
    </CustomTag>
  );
};
