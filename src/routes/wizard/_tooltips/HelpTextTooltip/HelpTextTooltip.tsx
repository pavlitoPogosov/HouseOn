import React from 'react';

import { OverlayTooltip } from '../OverlayTooltip/OverlayTooltip';

import s from './HelpTextTooltip.module.scss';

export interface HelpTextTooltipProps {
  content: string;
}

export const HelpTextTooltip: React.FC<HelpTextTooltipProps> = ({ content }) => {
  return (
    <OverlayTooltip
      offset={[220, -56]}
      linkCmp={<span>What it means?</span>}
      content={content}
      containerClassName={s.HelpTextTooltip__container}
      contentClassName={s.HelpTextTooltip__content}
      tooltipHeaderText="What it means?"
    />
  );
};
