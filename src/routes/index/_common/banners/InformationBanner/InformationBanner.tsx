import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Banner } from 'common/components/ui/Banner/Banner';
import { ButtonLink } from 'common/components/ui/Button/Button';
import { CircleProgress } from 'common/components/ui/CircleProgress/CircleProgress';
import { SETTINGS_HOUSE_PAGE_ROUTE } from 'utils/routes';

import s from './InformationBanner.module.scss';

export interface InformationBannerProps {}

export const InformationBanner: React.FC<InformationBannerProps> = () => {
  const [showBanner, setShowBanner] = useState(true);

  const intl = useIntl();

  const handleClose = () => {
    setShowBanner(false);
  };

  return (
    <Fade isActive={showBanner}>
      <Banner
        title={intl.formatMessage({
          id: 'index.banner.information.title',
          defaultMessage: 'Breathe life into your home ownership'
        })}
        description={intl.formatMessage({
          id: 'index.banner.information.description',
          defaultMessage: 'Fill in the missing information and start using all the features of HouseOn'
        })}
        containerClassName={s.InformationBaner__container}
        onClose={handleClose}>
        <div className={s.InformationBanner__container}>
          <div className={s.InformationBanner__controls}>
            <ButtonLink to={SETTINGS_HOUSE_PAGE_ROUTE} className={s.InformationBaner__btn} size="s" color="white-blue">
              <FormattedMessage id="index.banner.information.button" defaultMessage="Fill the information" />
            </ButtonLink>

            <CircleProgress percentage={8} />
          </div>
        </div>
      </Banner>
    </Fade>
  );
};
