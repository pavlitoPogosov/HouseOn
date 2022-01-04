import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as GeomarkIcon } from 'assets/icons/geomark.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ContactType } from 'graphql/types';

import { ReactComponent as PhoneIcon } from './phone.svg';

import s from './EventViewPageHouse.module.scss';

export interface IEventViewPageHouseProps {
  address: string;
  coordinates: string | null;
  description: string;
  houseImg: string;
  phones: Omit<ContactType, 'id'>[];
  pictures: string[];
}

export const EventViewPageHouse: React.FC<IEventViewPageHouseProps> = (props) => {
  const { address, coordinates, description, houseImg, phones, pictures } = props;

  const intl = useIntl();

  const handleCopy = (text: string) => () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <article className={s.EventViewPageHouse__container}>
      <div className={s.EventViewPageHouse__main}>
        <div className={s.EventViewPageHouse__houseImgWrapper}>
          <img alt="" src={houseImg} />
        </div>

        {!!pictures.length && (
          <>
            <Text
              className={s.EventViewPageHouse__label}
              color="textSecondary"
              text={intl.formatMessage({
                defaultMessage: 'Additional pictures',
                id: 'event.view.field.additionalPictures'
              })}
              variant={TextPropsVariantsEnum.CAPTION_M}
            />

            {pictures.map((p, i) => (
              <img alt="" className={s.EventViewPageHouse__picture} key={i} src={p} />
            ))}
          </>
        )}

        {description && (
          <Text
            className={s.EventViewPageHouse__label}
            color="textSecondary"
            text={intl.formatMessage({
              defaultMessage: 'Additional info',
              id: 'event.view.field.additionalInfo'
            })}
            variant={TextPropsVariantsEnum.CAPTION_M}
          />
        )}

        {description && <p className={s.EventViewPageHouse__description}>{description}</p>}
      </div>

      <div className={s.EventViewPageHouse__info}>
        {address && (
          <Text
            className={s.EventViewPageHouse__smallTitle}
            color="textSecondary"
            variant={TextPropsVariantsEnum.CAPTION_M}>
            <GeomarkIcon />

            <FormattedMessage defaultMessage="Address" id="event.view.field.address" />
          </Text>
        )}

        {address && (
          <div className={s.EventViewPageHouse__addressBlock}>
            <div>{address}</div>

            <div onClick={handleCopy(address)}>
              <CopyIcon />
            </div>
          </div>
        )}

        {coordinates && (
          <div className={s.EventViewPageHouse__addressBlock}>
            <div>{coordinates}</div>

            <div onClick={handleCopy(coordinates)}>
              <CopyIcon />
            </div>
          </div>
        )}

        {address && <div className={s.EventViewPageHouse__divider} />}

        {Boolean(phones?.length) && (
          <Text
            className={s.EventViewPageHouse__smallTitle}
            color="textSecondary"
            variant={TextPropsVariantsEnum.CAPTION_M}>
            <PhoneIcon />

            <FormattedMessage defaultMessage="Phone numbers" id="event.view.field.phoneNumbers" />
          </Text>
        )}

        {phones?.map((p, i) => (
          <div className={s.EventViewPageHouse__phoneBlock} key={i}>
            <Text as="p" text={String(p.phone)} variant={TextPropsVariantsEnum.BODY_L} />

            {p.title && (
              <Text as="p" color="textSecondary" text={String(p.title)} variant={TextPropsVariantsEnum.CAPTION_M} />
            )}

            {p.additional_info && (
              <Text
                as="p"
                color="textTretiary"
                text={String(p.additional_info)}
                variant={TextPropsVariantsEnum.CAPTION_M}
              />
            )}
          </div>
        ))}
      </div>
    </article>
  );
};
