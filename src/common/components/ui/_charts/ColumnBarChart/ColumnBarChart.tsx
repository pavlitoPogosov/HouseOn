import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useScreenSize } from 'common/hooks/useScreenSize';
import { EColors } from 'variables/colors';

import s from './ColumnBarChart.module.scss';

export type TDataItem = {
  color: EColors;
  group: string;
  label: string;
  value: number;
};

export type TColumnBarChartProps = {
  colInnerPadding?: number;
  data: TDataItem[];
  freeSpace?: number;
  labelHeight?: number;
  labelsPadding?: number;
  popoverHeight?: number;
  popoverPaddingBottom?: number;
  popoverWidth?: number;
  rowHeight?: number;
  tableRowsNumber?: number;
};

export const ColumnBarChart: React.FC<TColumnBarChartProps> = (props): JSX.Element => {
  const {
    colInnerPadding = 8,
    data,
    freeSpace = 0.4,
    labelHeight = 30,
    labelsPadding = 16,
    popoverHeight = 24,
    popoverPaddingBottom = 8,
    popoverWidth = 28,
    rowHeight = 34,
    tableRowsNumber = 5
  } = props;

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cols = data?.length || 0;
  const maxDataValue =
    data?.reduce((current, next) => {
      if (current < next.value) {
        return next.value;
      }

      return current;
    }, 0) || 0;

  const screenSize = useScreenSize();

  const maxValue = Math.ceil(maxDataValue);
  const chartLeftLabelsWidth = String(maxValue).length * 15;

  const tableWidth = containerWidth - chartLeftLabelsWidth;
  const bottomLevel = rowHeight * tableRowsNumber + rowHeight;
  const rowValue = maxValue / tableRowsNumber;
  const hoverHeight = rowHeight * tableRowsNumber;

  const colWidth = (tableWidth * (1 - freeSpace)) / cols - 2 * colInnerPadding;
  const freeSpaceWidth = tableWidth * (freeSpace / 2) - colInnerPadding;
  const colBasicPaddingLeft = chartLeftLabelsWidth + labelsPadding + freeSpaceWidth;

  const hoverWidth = colWidth + colInnerPadding * 2;
  const labelPadding = labelHeight / 2;

  const updateWidth = useDebouncedCallback((offsetWidth: number) => {
    setContainerWidth(offsetWidth);
  }, 500);

  const updateHeight = useDebouncedCallback((offsetHeight: number) => {
    setContainerHeight(offsetHeight);
  }, 500);

  useEffect(() => {
    const { offsetHeight, offsetWidth } = containerRef?.current || {};

    if (typeof offsetWidth === 'number' && containerWidth !== offsetWidth) {
      updateWidth(offsetWidth);
    }

    if (typeof offsetHeight === 'number' && containerHeight !== offsetHeight) {
      updateHeight(offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, screenSize]);

  return (
    <div className={clsx(s.ct_chart__container)} ref={containerRef}>
      {containerWidth === 0 || containerHeight === 0 ? (
        <Loader />
      ) : (
        <svg
          className={s.ct_chart}
          style={{
            height: `${containerHeight}px`,
            width: '100%'
          }}>
          <g className={s.ct_content}>
            <g className={s.ct_grids}>
              <g className={s.horizontal}>
                {Array(tableRowsNumber)
                  .fill(null)
                  .map((_, i) => {
                    const y = rowHeight * (i + 1);
                    const labelValue = maxValue - rowValue * (i + 1) + rowValue;
                    const label = Math.ceil(labelValue);

                    return (
                      <g key={y}>
                        <line
                          className={s.horizontal__line}
                          strokeDasharray="4"
                          x1={chartLeftLabelsWidth + labelsPadding}
                          x2={containerWidth}
                          y1={y}
                          y2={y}
                        />

                        <foreignObject
                          className={s.horizontal__label}
                          height={labelHeight}
                          width={chartLeftLabelsWidth}
                          x="0"
                          y={y - labelPadding}>
                          <span>{label}</span>
                        </foreignObject>
                      </g>
                    );
                  })}

                <g>
                  <line
                    className={s.horizontal__line}
                    strokeDasharray="4"
                    x1={chartLeftLabelsWidth + labelsPadding}
                    x2={containerWidth}
                    y1={bottomLevel}
                    y2={bottomLevel}
                  />

                  <foreignObject
                    className={s.horizontal__label}
                    height={labelHeight}
                    width={chartLeftLabelsWidth}
                    x="0"
                    y={bottomLevel - labelPadding}>
                    <span>0</span>
                  </foreignObject>
                </g>
              </g>
            </g>

            {data?.map((col, i) => {
              const { color, group, label, value } = col;

              const x = colBasicPaddingLeft + hoverWidth * i;

              const valueColHeight = (value / maxValue) * hoverHeight;

              return (
                <g className={s.col} key={label}>
                  <rect
                    className={clsx(s.col__hover, 'col_hover')}
                    fill={EColors.GREY100}
                    height={hoverHeight}
                    onClick={() => alert('You have clicked the circle.')}
                    width={hoverWidth}
                    x={x}
                    y={bottomLevel - hoverHeight}
                  />

                  <foreignObject
                    className={s.col__inner_container}
                    fill={color}
                    height={valueColHeight}
                    onClick={() => alert('You have clicked the circle.')}
                    width={colWidth}
                    x={x + colInnerPadding}
                    y={bottomLevel - valueColHeight}>
                    <span className={s.col__inner} style={{ backgroundColor: color }} />
                  </foreignObject>

                  <foreignObject
                    className={clsx(s.col__popover_container, 'popover_container')}
                    height={popoverHeight + 12}
                    width={popoverWidth}
                    x={x + colInnerPadding + colWidth / 2 - popoverWidth / 2}
                    y={bottomLevel - valueColHeight - popoverHeight - popoverPaddingBottom}>
                    <Text
                      className={s.col__popover}
                      color="white"
                      text={String(value)}
                      variant={TextPropsVariantsEnum.CAPTION_M}
                    />
                  </foreignObject>
                </g>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
};
