import React from 'react';
import ContentLoader from 'react-content-loader';

import moment from 'moment';

import { CounterBadge } from 'common/components/ui/_badges/CounterBadge/CounterBadge';
import { NotificationBadge } from 'common/components/ui/_badges/NotificationBadge/NotificationBadge';
import { DropZone } from 'common/components/ui/DropZone/DropZone';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useGetHouseQuery } from 'graphql/hooks/house';
import { OwnershipTypesEnum } from 'graphql/types';

import { HomeCardFooter } from './HomeCardFooter/HomeCardFooter';
import { ReactComponent as LocationIcon } from './icons/location.svg';

import s from './HomeCard.module.scss';

export interface HomeCardProps {}

// TODO add animations
export const HomeCard: React.FC<HomeCardProps> = () => {
  const { data, loading: loadingHouse } = useGetHouseQuery();
  const isPhone = useMediaQuery('(max-width: 768px)');

  const renderNotificationBadge = () => {
    if (!data?.result?.ownership_type) return null;

    let text = '';
    if (data.result.ownership_type === OwnershipTypesEnum.Owner) {
      text = 'Owner';
    } else {
      const renderTillDate = moment(data.result.rent_expire_at).isValid()
        ? 'till ' + moment(data.result.rent_expire_at).local().format('MMMM YYYY')
        : '';
      text = `Rented ${renderTillDate}`;
    }

    return <NotificationBadge text={text} className={s.HomeCard__badge} />;
  };

  return (
    <div className={s.HomeCard__container}>
      <div className={s.HomeCard__imgWrapper}>
        {renderNotificationBadge()}

        <DropZone className={s.HomeCard__dropzone} text="There can be a picture of your house" />
      </div>

      <div className={s.HomeCard__content}>
        <div className={s.HomeCard__titleWrapper}>
          {loadingHouse ? (
            <ContentLoader
              speed={2}
              width="100%"
              height={isPhone ? 22 : 32}
              viewBox={`0 0 300 ${isPhone ? '22' : '32'}`}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              preserveAspectRatio="none">
              <rect x="0" y="2" rx="4" ry="4" width="100%" height={isPhone ? 16 : 26} />
            </ContentLoader>
          ) : (
            <Text
              variant={isPhone ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}
              as="h2"
              className={s.HomeCard__title}
              text={data?.result?.title || 'No name'}
            />
          )}

          <CounterBadge text="2/4" color="secondary" className={s.HomeCard__badgeShort} />
        </div>

        <div className={s.HomeCard__location}>
          <LocationIcon />

          {loadingHouse ? (
            <ContentLoader
              speed={2}
              width="92"
              height={isPhone ? 16 : 24}
              viewBox={`0 0 92 ${isPhone ? 16 : 24}`}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <rect x="4" y="2" rx="4" ry="4" width="92" height={isPhone ? 12 : 18} />
            </ContentLoader>
          ) : (
            <span>{data?.result?.direction?.address || 'Home location'}</span>
          )}
        </div>

        <HomeCardFooter />
      </div>
    </div>
  );
};
