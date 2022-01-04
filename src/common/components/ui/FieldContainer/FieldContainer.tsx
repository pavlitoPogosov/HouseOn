import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Spinner } from '../Spinner/Spinner';

import s from './FieldContainer.module.scss';

export interface FieldContainerProps {
  label?: string;
  id?: string;
  labelClassName?: string;
  containerClassName?: string;
  helpTextClassName?: string;
  helpText?: string;
  helpTextHref?: string;
  error?: string;
  helpTextCmp?: JSX.Element;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
  onLabelClick?: () => void;
  onClick?: () => void;
}

export const FieldContainer = React.forwardRef<HTMLDivElement, FieldContainerProps>(
  (
    {
      containerClassName,
      error,
      helpText,
      helpTextClassName,
      helpTextHref,
      id,
      label,
      labelClassName,
      helpTextCmp,
      variant,
      children,
      disabled,
      isLoading,
      onClick,
      onLabelClick
    },
    ref
  ) => {
    const hasHelpText = helpText || helpTextCmp;

    const renderHelpText = () => {
      if (!hasHelpText) {
        return null;
      }

      return (
        <>
          {helpTextHref ? (
            <Link to={helpTextHref} className={clsx(s.FieldContainer__helpText, helpTextClassName)}>
              {helpTextCmp ?? helpText}
            </Link>
          ) : (
            <span className={clsx(s.FieldContainer__helpText, helpTextClassName)}>{helpTextCmp ?? helpText}</span>
          )}
        </>
      );
    };

    return (
      <div
        className={clsx(
          s.FieldContainer__container,
          {
            [s.FieldContainer__container_primary]: variant === 'primary',
            [s.FieldContainer__container_secondary]: variant === 'secondary',
            [s.FieldContainer__container_withSpinner]: isLoading
          },
          containerClassName
        )}
        onClick={onClick}
        ref={ref}>
        {(label || hasHelpText) && (
          <div className={clsx(s.FieldContainer__labelWrapper, { [s.FieldContainer__labelWrapper_noLabel]: !label })}>
            {label && (
              <label
                htmlFor={id}
                onClick={onLabelClick}
                className={clsx(
                  s.FieldContainer__label,
                  { [s.FieldContainer__labelDisabled]: disabled },
                  labelClassName
                )}>
                {label[label.length - 1] === '*' ? (
                  <>
                    {label.slice(0, label.length - 1)}

                    <span className={s.FieldContainer__requiredSign}>*</span>
                  </>
                ) : (
                  label
                )}
              </label>
            )}

            {renderHelpText()}
          </div>
        )}

        <div className={s.FieldContainer__children}>
          {children}

          {isLoading && (
            <div className={s.FieldContainer__spinner}>
              <Spinner size="sm" />
            </div>
          )}
        </div>

        <ErrorMessage error={error} className={s.FieldContainer__error} />
      </div>
    );
  }
);
