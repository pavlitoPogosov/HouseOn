import React, { useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ETextColors, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useHorizontalDragRCS2 } from 'common/hooks/useHorizontalDragRCS2';

import { MenuItem } from './MenuItem';

import s from './HorizontalScrollingMenu.module.scss';

export type THorizontalScrollingMenuItem = {
  id: string;
  title: string;
};

export type THorizontalScrollingMenu = {
  items: THorizontalScrollingMenuItem[];
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  selected: string | null;
  textClassName?: string;
  textColor?: ETextColors;
  textContainerClassName?: string;
  textVariant?: TextPropsVariantsEnum;
};

export const HorizontalScrollingMenu = (props: THorizontalScrollingMenu): JSX.Element => {
  const { items, onSelect, selected, textClassName, textColor, textContainerClassName, textVariant } = props;

  const [isDragging, setDragging] = useState(false);

  const ref = useRef<React.RefObject<Scrollbars> | null>(null) as React.RefObject<Scrollbars>;

  const handleItemClick = (itemId: string) => {
    onSelect?.((prev) => (prev !== itemId ? itemId : ''));
  };

  const handleMouseDown = () => {
    if (!isDragging) {
      setDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setDragging(false);
    }
  };

  const renderThumbHorizontal = (p: any) => <div {...p} className={s.scroll__thumb} />;

  const renderTrackHorizontal = (p: any) => <div {...p} className={s.scroll__track} />;

  useHorizontalDragRCS2(ref);

  return (
    <Scrollbars
      className={s.HorizontalScrollingMenu__scrollContainer}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
      renderThumbHorizontal={renderThumbHorizontal}
      renderTrackHorizontal={renderTrackHorizontal}
    >
      {items.map((item) => {
        const { id, title } = item;

        return (
          <MenuItem
            className={textClassName}
            color={textColor}
            containerClassName={clsx(
              s.HorizontalScrollingMenu__scrollItem,
              isDragging && s.active,
              textContainerClassName
            )}
            key={id}
            onClick={() => handleItemClick(id)}
            selected={id === selected}
            title={title}
            variant={textVariant}
          />
        );
      })}
    </Scrollbars>
  );
};
