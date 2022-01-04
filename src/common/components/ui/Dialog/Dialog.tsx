import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as TimesIcon } from 'assets/icons/close.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { CounterBadge } from '../_badges/CounterBadge/CounterBadge';
import { Button } from '../Button';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from '../ColorfulIcon/ColorfulIcon';
import { Overlay } from '../Overlay/Overlay';

import s from './Dialog.module.scss';

export interface IDialogProps {
  blackoutClassName?: string;
  cancelBtnText?: string;
  cancelClassName?: string;
  childrenClassName?: string;
  childrenWrapperClassName?: string;
  closeClassName?: string;
  counterBadgeNumber?: number;
  disableOverflowControl?: boolean;
  footerClassName?: string;
  headerBtnClassName?: string;
  headerBtnText?: string;
  headerClassName?: string;
  icon?: ColorfulIconTypes;
  iconClassName?: string;
  iconVariant?: ColorfulIconVariants;
  isCloseButton?: boolean;
  isHeaderBackButton?: boolean;
  isHeaderShown?: boolean;
  isLoading?: boolean;
  isOpen: boolean;
  isSaveDisabled?: boolean;
  maxWidth?: number;
  newDesign?: boolean;
  onClickBackBtn?: () => void;
  onClickCancelBtn?: () => void;
  onClickHeaderBtn?: () => void;
  onClickSaveBtn?: () => void;
  onClose: () => void;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  saveBtnText?: string;
  saveClassName?: string;
  title?: string;
  titleClassName?: string;
}

export const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    blackoutClassName,
    cancelBtnText = 'Cancel',
    cancelClassName,
    children,
    childrenClassName,
    childrenWrapperClassName,
    closeClassName,
    counterBadgeNumber,
    disableOverflowControl,
    footerClassName,
    headerBtnClassName,
    headerBtnText,
    headerClassName,
    icon,
    iconClassName,
    iconVariant,
    isCloseButton = true,
    isHeaderBackButton = false,
    isHeaderShown = true,
    isLoading,
    isOpen,
    isSaveDisabled,
    maxWidth = 532,
    newDesign = false,
    onClickBackBtn,
    onClickCancelBtn,
    onClickHeaderBtn,
    onClickSaveBtn,
    onClose,
    onScroll,
    saveBtnText = 'Save',
    saveClassName,
    title,
    titleClassName
  } = props;

  const shouldAdapt = useMediaQuery('(max-width: 375px)');

  const showCancelBtn = Boolean(onClickCancelBtn && cancelBtnText);
  const showSaveBtn = Boolean(onClickSaveBtn && saveBtnText);
  const isFooterShown = showCancelBtn || showSaveBtn;

  return (
    <Overlay
      blackoutClassName={blackoutClassName}
      childrenStyles={{ maxWidth }}
      childrenWrapperClassName={clsx(s.Dialog__content, childrenWrapperClassName, newDesign && s.new_design)}
      disableClose={isLoading}
      disableOverflowControl={disableOverflowControl}
      isOpen={isOpen}
      onClose={onClose}
      onScroll={onScroll}>
      {isHeaderShown && (
        <div className={clsx(s.Dialog__header, headerClassName, newDesign && s.new_design)}>
          <div className={s.Dialog__flexContainer}>
            {isHeaderBackButton && (
              <IconCircle className={s.header__backIcon} height={40} onClick={onClickBackBtn} shadow="m" width={40}>
                <ChevronLeftIcon />
              </IconCircle>
            )}

            {!isHeaderBackButton && icon && (
              <ColorfulIcon className={clsx(s.Dialog__headerIcon, iconClassName)} icon={icon} variant={iconVariant} />
            )}

            {title && (
              <h6 className={clsx(s.Dialog__headerTitle, titleClassName, newDesign && s.new_design)}>
                {title}

                {counterBadgeNumber && (
                  <CounterBadge
                    className={s.Dialog__counterBadge}
                    color="lightgray"
                    text={String(counterBadgeNumber)}
                  />
                )}
              </h6>
            )}
          </div>

          <div className={s.Dialog__flexContainer}>
            {headerBtnText && onClickHeaderBtn && (
              <Button
                className={clsx(s.Dialog__headerBtn, headerBtnClassName, newDesign && s.new_design)}
                color="orange"
                disabled={isLoading}
                onClick={onClickHeaderBtn}
                size={newDesign ? 'm' : 's'}
                variant={newDesign ? 'primary' : 'secondary'}>
                {headerBtnText}
              </Button>
            )}

            {isCloseButton && (
              <div
                className={clsx(s.Dialog__headerCloseBtn, closeClassName, newDesign && s.new_design)}
                onClick={!isLoading ? onClose : undefined}>
                <TimesIcon height={shouldAdapt ? 12 : 16} width={shouldAdapt ? 12 : 16} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className={clsx(s.Dialog__childrenWrapper, childrenClassName)}>{children}</div>

      {isFooterShown && (
        <div className={clsx(s.Dialog__footer, footerClassName, newDesign && s.new_design)}>
          {showCancelBtn && (
            <Button
              className={clsx(s.Dialog__cancelBtn, cancelClassName, newDesign && s.new_design)}
              color={newDesign ? 'grey' : 'orange'}
              disabled={isLoading}
              onClick={onClickCancelBtn}
              size={newDesign ? 'm' : 's'}
              variant={newDesign ? 'primary' : 'secondary'}>
              {cancelBtnText}
            </Button>
          )}

          {showSaveBtn && (
            <Button
              className={clsx(s.Dialog__saveBtn, saveClassName, newDesign && s.new_design)}
              color="orange"
              disabled={isSaveDisabled}
              isLoading={isLoading}
              onClick={onClickSaveBtn}
              size={newDesign ? 'm' : 's'}>
              {saveBtnText}
            </Button>
          )}
        </div>
      )}
    </Overlay>
  );
};
