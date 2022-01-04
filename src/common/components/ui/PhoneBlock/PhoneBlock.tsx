import React, { useMemo } from 'react';

import clsx from 'clsx';

// eslint-disable-next-line import/order
import Tippy from '@tippyjs/react/headless';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { PhoneViewer } from 'common/components/ui/PhoneViewer/PhoneViewer';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { ReactComponent as EllipsisIcon } from './icons/ellipsis.svg';

import s from './PhoneBlock.module.scss';

export interface IPhoneBlockData {
  additionalInfo?: string;
  phone: number | string;
  title?: string;
}
export interface IPhoneBlockProps extends IPhoneBlockData {
  adaptQuery?: string;
  containerClassName?: string;
  contentClassName?: string;
  disableCopy?: boolean;
  disableHover?: boolean;
  isActive?: boolean;

  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

interface IPhoneBlockIcon {
  icon: JSX.Element;
  onClick: () => void;
  text: string;
}

export const PhoneBlock: React.FC<IPhoneBlockProps> = (props) => {
  const {
    adaptQuery = '(max-width: 520px)',
    additionalInfo,
    containerClassName,
    contentClassName,
    disableCopy,
    disableHover,
    isActive,
    onClick,
    onDelete,
    onEdit,
    phone,
    title
  } = props;

  const shouldAdapt = useMediaQuery(adaptQuery);

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText(String(phone));
  };

  const otherIconProps = {
    className: s.PhoneBlock__icon,
    height: 32,
    shadow: 'm' as const,
    width: 32
  };

  const controls = useMemo(() => {
    return [
      onEdit && {
        icon: <PencilIcon />,
        onClick: onEdit,
        text: 'Edit'
      },
      onDelete && {
        icon: <CloseIcon height={14} width={14} />,
        onClick: onDelete,
        text: 'Delete'
      }
    ].filter(Boolean) as IPhoneBlockIcon[];
  }, [onEdit, onDelete]);

  const renderControlsTooltip = () => (
    <div className={s.PhoneBlock__tooltip}>
      {controls.map((c, i) => (
        <div className={s.PhoneBlock__tooltipRow} key={i} onClick={c.onClick}>
          {c.text}
        </div>
      ))}
    </div>
  );

  const hasControls = Boolean(!disableCopy || controls.length);

  return (
    <div
      className={clsx(
        s.PhoneBlock__container,
        !disableHover && s.enableHover,
        isActive && s.active,
        containerClassName
      )}
      onClick={onClick}>
      <div className={clsx(s.PhoneBlock__content, contentClassName)}>
        <PhoneViewer className={s.PhoneBlock__phone} phone={String(phone)} />

        {(additionalInfo || title) && (
          <div className={s.PhoneBlock__description}>
            {title && <Text color="textSecondary" text={title} variant={TextPropsVariantsEnum.CAPTION_M} />}

            {additionalInfo && title && <span>&#8226;</span>}

            {additionalInfo && (
              <Text color="textTretiary" text={additionalInfo} variant={TextPropsVariantsEnum.CAPTION_M} />
            )}
          </div>
        )}
      </div>

      {hasControls && (
        <div className={s.PhoneBlock__controls}>
          {!disableCopy && <IconCircle icon={<CopyIcon />} onClick={handlePhoneCopy} {...otherIconProps} />}

          {shouldAdapt && controls.length > 1 ? (
            <Tippy interactive offset={[-20, 10]} render={renderControlsTooltip}>
              <IconCircle icon={<EllipsisIcon />} {...otherIconProps} />
            </Tippy>
          ) : (
            <>
              {controls.map((c, i) => (
                <IconCircle icon={c.icon} key={i} onClick={c.onClick} {...otherIconProps} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
