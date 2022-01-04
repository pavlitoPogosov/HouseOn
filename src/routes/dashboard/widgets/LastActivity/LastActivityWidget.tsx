import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as FireIcon } from 'assets/icons/fire.svg';
import { ActivityCard } from 'common/components/ui/_cards/ActivityCard/ActivityCard';
import { Button, EButtonTextColors } from 'common/components/ui/Button';
import { Loader } from 'common/components/ui/Loader/Loader';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TLastActivityWidgetProps } from './types.LastActivityWidget';

import s from './LastActivityWidget.module.scss';

export interface ILastActivityWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  headerLabelsContainerClassName?: string;
  listClassName?: string;
  listContainerClassName?: string;
  title?: string;
}

export const LastActivityWidget: React.FC<ILastActivityWidgetProps & TLastActivityWidgetProps> = (props) => {
  const {
    buttonNewActivityLabel,
    containerClassName,
    contentClassName,
    data,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    headerLabelsContainerClassName,
    isButtonClicked,
    isDataLoading = false,
    isScrolled,
    listClassName,
    listContainerClassName,
    onActivityButtonClick,
    onScroll,
    scrollRef,
    title = 'Last activity'
  } = props;

  return (
    <div className={clsx(s.LastActivityWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.LastActivityWidget__content, contentClassName)}>
          <WidgetHeader
            buttonLabel="View all"
            buttonLink="/"
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            icon={<FireIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}
          />

          <div className={clsx(s.content__list_container, listContainerClassName)}>
            <Scrollbars onScroll={onScroll} ref={scrollRef}>
              <div className={clsx(s.content__list, listClassName)}>
                {data?.map((d) => (
                  <ActivityCard key={d.activityAuthor.id} {...d} />
                ))}
              </div>
            </Scrollbars>

            {!isScrolled && !isButtonClicked && (
              <div className={clsx(s.new_activity__button_container)}>
                <Button
                  className={clsx(s.new_activity__button)}
                  color="transparent"
                  onClick={onActivityButtonClick}
                  rightIcon="&gt;"
                  textColor={EButtonTextColors.GREEN}
                  variant="primary">
                  {buttonNewActivityLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
