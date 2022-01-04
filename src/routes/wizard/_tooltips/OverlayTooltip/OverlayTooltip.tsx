import React, { useRef } from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Overlay } from 'common/components/ui/Overlay/Overlay';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { ReactComponent as ShieldIcon } from './icons/shield.svg';

import s from './OverlayTooltip.module.scss';

export interface OverlayTooltipProps {
  linkCmp: React.ReactElement;
  offset: [number, number];
  content: React.ReactElement | JSX.Element | string;
  containerClassName?: string;
  contentClassName?: string;
  tooltipHeaderText: string;
}

export const OverlayTooltip: React.FC<OverlayTooltipProps> = ({
  content,
  linkCmp,
  offset,
  containerClassName,
  tooltipHeaderText,
  contentClassName
}) => {
  const tooltipToggler = useToggle();

  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = useMediaQuery('(min-width: 576px)');
  const isExtraSmall = useMediaQuery('(max-height: 410px)');

  const renderOverlayTooltip = () => (
    <div ref={tooltipContentRef} className={clsx(s.OverlayTooltip__container, containerClassName)}>
      <div className={s.OverlayTooltip__header}>
        <Text className={s.OverlayTooltip__title} variant={TextPropsVariantsEnum.BODY_L}>
          <span className={s.OverlayTooltip__shieldIcon}>
            <ShieldIcon />
          </span>
          {tooltipHeaderText}
        </Text>

        <span onClick={tooltipToggler.unset} className={s.OverlayTooltip__closeIcon}>
          <CloseIcon />
        </span>
      </div>

      <div className={clsx(s.OverlayTooltip__content, contentClassName)}>{content}</div>
    </div>
  );

  const togglerCmp = (
    <span onClick={tooltipToggler.set} className={s.OverlayTooltip__toggler}>
      {linkCmp}
    </span>
  );

  return (
    <>
      {isDesktop ? (
        <Tippy
          render={renderOverlayTooltip}
          // TODO offset on adaptive
          offset={offset}
          visible={tooltipToggler.value}
          // TODO focus, blur open/close
          onClickOutside={tooltipToggler.unset}
          interactive>
          {togglerCmp}
        </Tippy>
      ) : (
        <>
          {togglerCmp}

          <Overlay
            isOpen={tooltipToggler.value}
            onClose={tooltipToggler.unset}
            childrenWrapperClassName={s.OverlayTooltip__overlay}>
            {renderOverlayTooltip()}
          </Overlay>
        </>
      )}
    </>
  );
};
