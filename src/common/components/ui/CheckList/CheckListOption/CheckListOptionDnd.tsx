import React, { useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

import clsx from 'clsx';

import { useToggleable } from '../../../../hooks/useToggleable';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Text, TextPropsVariantsEnum } from '../../Text/Text';
import { ReactComponent as DotsIcon } from '../icons/dots.svg';

import s from './CheckListOption.module.scss';

interface CardProps {
  id: number;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface CheckListOptionProps extends CardProps {
  containerClassName?: string;
  children?: React.ReactNode;
  isChecked: boolean;
  isHidden: boolean;
  isDragging?: boolean;
  isHideCheckbox?: boolean;
  isHideRemove?: boolean;
  droppableProvidedPlaceholder?: Node;
  onToggleIsChecked: (isChecked: boolean) => void;
  onDelete: () => void;
}

const ItemTypes = { CARD: 'card' };

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const CheckListOptionDnd = React.forwardRef<HTMLDivElement, CheckListOptionProps>((props, ref) => {
  const {
    isChecked,
    isHidden,
    isHideCheckbox,
    isHideRemove,
    text,
    containerClassName,
    children,
    onToggleIsChecked,
    onDelete,
    droppableProvidedPlaceholder,
    moveCard,
    index = 0,
    id = 0
  } = props;

  const { styles: collapseStyles, onToggle, refCallback } = useToggleable({ isInitialOpen: isHidden });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleIsChecked(e.target.checked);
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = cardRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(cardRef));

  useEffect(() => {
    onToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHidden]);

  return (
    <div ref={refCallback} style={collapseStyles}>
      <div ref={cardRef} style={{ opacity }} data-handler-id={handlerId}>
        <div ref={ref} className={clsx(s.CheckListOption__container, containerClassName)}>
          <div ref={drag} className={s.CheckListOption__dots}>
            <DotsIcon />
          </div>

          {!isHideCheckbox && (
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              containerClassName={s.CheckListOption__cbxContainer}
              checkboxClassName={s.CheckListOption__cbx}
            />
          )}

          {children || <Text variant={TextPropsVariantsEnum.BODY_L} text={text} className={s.CheckListOption__text} />}

          {!isHideRemove && (
            <div className={s.CheckListOption__minusIconWrapper} onClick={onDelete}>
              <div className={s.CheckListOption__minusIcon} />
            </div>
          )}

          {droppableProvidedPlaceholder}
        </div>
      </div>
    </div>
  );
});
