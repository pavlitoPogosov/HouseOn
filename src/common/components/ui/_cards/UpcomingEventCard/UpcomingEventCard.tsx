import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as ImageIcon } from 'assets/icons/image.svg';
import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './UpcomingEventCard.module.scss';

type TUpcomingEventCard = {
  author: string;
  authorLink: string;
  containerClassName?: string;
  contentClassName?: string;
  date: string;
  detailContainerClassName?: string;
  eventLink: string;
  id: number;
  image: string;
  imageContainerClassName?: string;
  imagesLink: string;
  imagesNumber: number;
  location: string;
  locationLink: string;
  title: string;
};

export const UpcomingEventCard: React.FC<TUpcomingEventCard> = (props) => {
  const {
    author,
    authorLink,
    containerClassName,
    contentClassName,
    date,
    detailContainerClassName,
    eventLink,
    id,
    image,
    imageContainerClassName,
    imagesLink,
    imagesNumber,
    location,
    locationLink,
    title
  } = props;

  const imageStyle = { backgroundImage: `url(${image})` };

  return (
    <div className={clsx(s.UpcomingEventCard__container, containerClassName)}>
      <div className={clsx(s.UpcomingEventCard__content, contentClassName)}>
        <div className={clsx(s.UpcomingEventCard__image_container, imageContainerClassName)} style={imageStyle}>
          <div className={s.image_container__content}>
            <div className={s.content__icon_container}>
              <CalendarIcon className={s.content__icon} />
            </div>

            <div className={s.content__date_container}>
              <Text className={s.content__date} color="white" text={date} variant={TextPropsVariantsEnum.CAPTION_M} />
            </div>
          </div>
        </div>

        <div className={clsx(s.UpcomingEventCard__details_container, detailContainerClassName)}>
          <div className={s.details_container__content}>
            <div className={s.details_content__title_container}>
              <Link to={eventLink}>
                <Text className={s.details_content__title} text={title} variant={TextPropsVariantsEnum.BODY_M} />
              </Link>
            </div>

            <div className={s.details_content__footer_container}>
              <div className={s.details_content__author_container}>
                <Text
                  className={s.author_container__author}
                  color="textTretiary"
                  text="Author:"
                  variant={TextPropsVariantsEnum.CAPTION_M}
                />

                <Link to={authorLink}>
                  <Text className={s.author_container__name} text={author} variant={TextPropsVariantsEnum.CAPTION_M} />
                </Link>
              </div>

              <div className={s.details_content__icons}>
                <Link to={locationLink}>
                  <LocationIcon className={s.content_icons__location} />
                </Link>

                <div className={s.content_icons__images}>
                  <Link to={imagesLink}>
                    <ImageIcon className={s.content_icons__images_icon} />
                  </Link>

                  <Text
                    className={s.content_icons__images_number}
                    color="textSecondary"
                    text={String(imagesNumber)}
                    variant={TextPropsVariantsEnum.CAPTION_M}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
