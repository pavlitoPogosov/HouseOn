import React from 'react';

import Tippy from '@tippyjs/react/headless';
import { ReactComponent as IconHint } from 'assets/icons/question.svg';

import s from './HintIcon.module.scss';

export interface HintIconProps {
  hint: string;
}

export const HintIcon: React.FC<HintIconProps> = ({ hint }) => {
  const renderTooltip = () => <div className={s.HintIcon__tooltip}>{hint}</div>;

  return (
    <Tippy render={renderTooltip} offset={[0, 10]}>
      <IconHint className={s.HintIcon__icon} />
    </Tippy>
  );
};
