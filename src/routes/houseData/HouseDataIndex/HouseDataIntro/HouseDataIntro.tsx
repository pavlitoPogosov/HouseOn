import React from 'react';
import { useIntl } from 'react-intl';

import { BarProgress } from 'common/components/ui/BarProgress/BarProgress';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { ReactComponent as EllipseIcon } from './icons/ellipse.svg';

import s from './HouseDataIntro.module.scss';

export interface HouseDataIntroProps {}

export const HouseDataIntro: React.FC<HouseDataIntroProps> = () => {
  const isMd = useMediaQuery('(min-width: 768px)');

  const intl = useIntl();

  return (
    <div className={s.HouseDataIntro__container}>
      <Text
        variant={isMd ? TextPropsVariantsEnum.H1 : TextPropsVariantsEnum.H2}
        className={s.HouseDataIntro__title}
        text={intl.formatMessage({
          id: 'houseData.title',
          defaultMessage: 'HouseData — the one place for all your data needs'
        })}
      />

      <div className={s.HouseDataIntro__footer}>
        <div className={s.HouseDataIntro__searchWrapper}>
          <SearchInput
            placeholder={intl.formatMessage({
              id: 'houseData.search.placeholder',
              defaultMessage: 'Type a name of a file..'
            })}
          />
        </div>

        <div className={s.HouseDataIntro__capacity}>
          <Text
            variant={TextPropsVariantsEnum.H3}
            text={intl.formatMessage(
              {
                id: 'houseData.storage.left',
                defaultMessage: '{size} GB left in storage'
              },
              { size: 40 }
            )}
          />

          <BarProgress percent={80} containerClassName={s.HouseDataIntro__barProgress} />

          <Text
            variant={TextPropsVariantsEnum.CAPTION_M}
            text={intl.formatMessage(
              {
                id: 'houseData.storage.available',
                defaultMessage: '{size} GB available to you'
              },
              { size: 50 }
            )}
            color="textSecondary"
          />
        </div>
      </div>

      <EllipseIcon className={s.HouseDataIntro__firstEllipse} />
      <EllipseIcon className={s.HouseDataIntro__secondEllipse} />
      <EllipseIcon className={s.HouseDataIntro__thirdEllipse} />
      <EllipseIcon className={s.HouseDataIntro__fourthEllipse} />
      <EllipseIcon className={s.HouseDataIntro__fithEllipse} />
      <EllipseIcon className={s.HouseDataIntro__sixthEllipse} />
      <EllipseIcon className={s.HouseDataIntro__seventhEllipse} />
    </div>
  );
};
