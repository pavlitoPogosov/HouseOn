import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { BarProgress } from 'common/components/ui/BarProgress/BarProgress';
import { ButtonLink, EButtonTextColors } from 'common/components/ui/Button';
import { Loader } from 'common/components/ui/Loader/Loader';
import { UsualTabs } from 'common/components/ui/Tabs';
import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TStorageWidgetProps } from './types.StorageWidget';

import s from './StorageWidget.module.scss';

export interface IStorageWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
}

export const StorageWidget: React.FC<IStorageWidgetProps & TStorageWidgetProps> = (props) => {
  const {
    activeTab,
    availableLeftSpace,
    availableStorage,
    availableTotalSpace,
    containerClassName,
    contentClassName,
    contentContainerClassName,
    detailsStorage,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    image,
    isDataLoading = false,
    onTabsChange,
    tabs,
    title
  } = props;

  const customHeaderElement = (
    <UsualTabs onChange={onTabsChange as (value: string) => void} tabs={tabs} value={activeTab} />
  );

  const imageStyle = { backgroundImage: `url(${image})` };

  return (
    <div className={clsx(s.StorageWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.StorageWidget__content, contentClassName)}>
          <WidgetHeader
            buttonLabel="Open"
            buttonLink="/"
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            customElement={customHeaderElement}
            icon={<CalendarIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}
          />

          <div className={clsx(s.content__container, contentContainerClassName)}>
            <div className={s.content__image} style={imageStyle} />

            <div className={s.content__details_main}>
              <Text
                className={s.details__storage}
                // color={titleTextColor}
                text={detailsStorage}
                variant={TextPropsVariantsEnum.H3}
              />

              <ButtonLink
                className={s.details__button}
                color="transparent"
                rightIcon="&#43;"
                textColor={EButtonTextColors.GREEN}
                to="/"
                variant="primary">
                Add documents
              </ButtonLink>
            </div>

            <BarProgress
              backgroundClassName={s.details__progress_background}
              containerClassName={s.details__progress_container}
              percent={availableLeftSpace - availableTotalSpace}
              progressClassName={s.details__progress_bar}
            />

            <Text
              className={s.details__available}
              color={ETextColors.SECONDARY}
              text={availableStorage}
              variant={TextPropsVariantsEnum.CAPTION_R}
            />
          </div>
        </div>
      )}
    </div>
  );
};
