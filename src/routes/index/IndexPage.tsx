import React, { useLayoutEffect } from 'react';

import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { handleIndexPageLoadAC } from 'redux/slices/accountsSlice/actionCreators';
import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';
import { UserModalsLayout } from 'routes/_layouts/UserModalsLayout/UserModalsLayout';
import { INDEX_PAGE_ROUTE } from 'utils/routes';

import { useEventToast } from '../events/_common/hooks/useEventToast';

import { Aside } from './Aside/Aside';
import { Main } from './Main/Main';

import s from './IndexPage.module.scss';

export interface IndexPageProps {}

export const IndexPage: React.FC<IndexPageProps> = () => {
  const dispatch = useTypedDispatch();
  const shouldAdapt = useMediaQuery('(max-width: 1199px)');

  useEventToast({ replaceTo: INDEX_PAGE_ROUTE });

  useLayoutEffect(() => {
    dispatch(handleIndexPageLoadAC());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserModalsLayout>
      <AsideLayoutRight
        asideClassName={s.IndexPage__aside}
        asideCmp={<Aside />}
        disableLogoLink
        mainCmp={
          <>
            <Main shouldAdapt={!shouldAdapt} />

            {shouldAdapt && <Aside shouldAdapt />}
          </>
        }
      />
    </UserModalsLayout>
  );
};
