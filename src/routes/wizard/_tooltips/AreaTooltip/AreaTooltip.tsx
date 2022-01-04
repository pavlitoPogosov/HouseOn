import React from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';

import s from './AreaTooltip.module.scss';

export interface AreaTooltipProps {}

export const AreaTooltip: React.FC<AreaTooltipProps> = () => {
  const toggler = useToggle();

  const intl = useIntl();

  const renderAreaTooltip = () => <div className={s.AreaTooltip}>Multiply the width by the height :)</div>;

  return (
    <Tippy
      render={renderAreaTooltip}
      offset={[-15, 20]}
      visible={toggler.value}
      onClickOutside={toggler.unset}
      interactive>
      <NavigationLink as="div" onClick={toggler.set} onFocus={toggler.set} onBlur={toggler.unset} isUnderline>
        {intl.formatMessage({ id: 'wizard.step.area.tooltip.link', defaultMessage: 'Don`t know your area?' })}
      </NavigationLink>
    </Tippy>
  );
};
