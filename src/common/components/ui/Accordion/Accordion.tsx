import React, { useEffect } from 'react';

import clsx from 'clsx';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { useToggleable, UseToggleableProps } from 'common/hooks/useToggleable';

import { Text, TextPropsVariantsEnum } from '../Text/Text';

import s from './Accordion.module.scss';

export interface IAccordionRenderTitleOptions {
  handleToggleAccordion: () => void;
  isOpen: boolean;
  title?: string;
}
export interface AccordionProps {
  checkBoxDisabled?: boolean;
  checkBoxName?: string;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  disableHover?: boolean;
  headerCheckboxClassName?: string;
  headerCheckboxTextClassName?: string;
  headerIconClassName?: string;
  isOpen?: boolean;
  title?: string;
  titleClassName?: string;
  toggleableClassName?: string;
  toggleableProps?: UseToggleableProps;

  renderTitle?: (options: IAccordionRenderTitleOptions) => void;
  setRef?: (el: HTMLDivElement | null) => void;
}

export const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    checkBoxDisabled = false,
    checkBoxName,
    children,
    containerClassName,
    contentClassName,
    disableHover,
    headerCheckboxClassName,
    headerCheckboxTextClassName,
    headerClassName,
    headerIconClassName,
    isOpen: isOpenProp,
    renderTitle,
    title,
    titleClassName,
    toggleableClassName,
    toggleableProps,
    setRef
  } = props;

  const { isOpen, onToggle, refCallback, setIsOpen, styles } = useToggleable(toggleableProps);

  useEffect(() => {
    if (typeof isOpenProp === 'boolean') {
      if (isOpenProp && !isOpen) {
        setIsOpen(true);
      } else if (!isOpenProp && isOpen) {
        setIsOpen(false);
      }
    }
  }, [isOpenProp]);

  const initRef = (node: HTMLDivElement | null) => {
    refCallback(node);
    if (setRef) {
      setRef(node);
    }
  };

  return (
    <div className={clsx(s.Accordion__container, containerClassName)}>
      {!renderTitle ? (
        <div className={clsx(s.Accordion__header, headerClassName, disableHover && s.disableHover)} onClick={onToggle}>
          {checkBoxName && (
            <CheckboxField
              containerClassName={clsx(s.header__checkbox_container, headerCheckboxClassName)}
              disabled={checkBoxDisabled}
              name={checkBoxName}
              text={title}
              textClassName={headerCheckboxTextClassName}
            />
          )}

          {!checkBoxName && title && (
            <Text
              className={clsx(s.Accordion__title, titleClassName)}
              text={title}
              variant={TextPropsVariantsEnum.H3}
            />
          )}

          <div className={clsx(s.Accordion__headerIcon, headerIconClassName, isOpen && s.up)}>
            <ChevronDownIcon />
          </div>
        </div>
      ) : (
        renderTitle({
          handleToggleAccordion: onToggle,
          isOpen,
          title
        })
      )}

      <div className={clsx(s.Accordion__content, contentClassName)} ref={initRef} style={styles}>
        <div className={clsx(s.Accordion__toggleable, toggleableClassName)}>{children}</div>
      </div>
    </div>
  );
};
