import React, { useCallback, PropsWithChildren } from 'react';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as TimesIcon } from 'assets/icons/close.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import s from 'common/components/ui/PreviewMedia/ViewerWrapper.module.scss';
import { TextPropsVariantsEnum, Text } from 'common/components/ui/Text/Text';
import { useDisableOverflow } from 'common/hooks/useDisableOverflow';
import { useKeyPress } from 'common/hooks/useKeyPress';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

type TViewerWrapper = {
  author?: string;
  date?: string;
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
};

export const ViewerWrapper = React.forwardRef<any, PropsWithChildren<TViewerWrapper>>((props, ref) => {
  const { author, children, date, onBack, onClose, title } = props;

  const shouldAdapt = useMediaQuery('(max-width: 375px)');

  useDisableOverflow();

  const closeDialogHandler = useCallback(() => {
    onBack?.();
    onClose?.();
  }, []);

  useKeyPress({
    handler: closeDialogHandler,
    targetKey: 'escape'
  });

  return (
    <div className={s.ViewerWrapper__wrapper}>
      <div className={s.ViewerWrapper__overflow} onClick={closeDialogHandler} />

      <div className={s.ViewerWrapper__container}>
        <div className={s.ViewerWrapper__header}>
          <IconCircle className={s.header__button_back} height={40} onClick={onBack} shadow="m" width={40}>
            <ChevronLeftIcon />
          </IconCircle>

          {title && (
            <Text className={s.header__title} color="white" text={title} variant={TextPropsVariantsEnum.BODY_L} />
          )}

          <div className={s.header__button_close} onClick={onClose}>
            <TimesIcon height={shouldAdapt ? 12 : 16} width={shouldAdapt ? 12 : 16} />
          </div>
        </div>

        <div className={s.ViewerWrapper__children_container} ref={ref}>
          {children}
        </div>

        {(author || date) && (
          <div className={s.ViewerWrapper__footer}>
            {author && (
              <Text className={s.header__author} color="white" text={author} variant={TextPropsVariantsEnum.BODY_M} />
            )}

            {date && (
              <Text className={s.header__date} color="white" text={date} variant={TextPropsVariantsEnum.CAPTION_R} />
            )}
          </div>
        )}
      </div>
    </div>
  );
});
