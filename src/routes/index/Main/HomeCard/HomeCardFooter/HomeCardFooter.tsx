import React from 'react';
import { Link } from 'react-router-dom';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { Button } from 'common/components/ui/Button';
import { HomeStatus } from 'common/components/ui/HomeStatus/HomeStatus';
import { useHomeStatusWithApi } from 'common/hooks/useHomeStatusWithApi';
import { ModalManagerNames } from 'routes/_layouts/UserModalsLayout/ModalManager/ModalManager';
import { HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE } from 'utils/routes';

import { HomeAvatarsGroups } from './HomeAvatarsGroups/HomeAvatarsGroups';

import s from './HomeCardFooter.module.scss';

export interface HomeCardFooterProps {}

export const HomeCardFooter: React.FC<HomeCardFooterProps> = () => {
  const modalToggler = useToggle();
  const { statusInputToggler, ...options } = useHomeStatusWithApi();

  const renderModalContent = () => (
    <div className={s.HomeCardFooter__tooltip}>
      <Link
        to={`?modalType=${ModalManagerNames.ADD_GUEST}`}
        onClick={modalToggler.toggle}
        className={s.HomeCardFooter__toltipItem}>
        Guest
      </Link>

      <Link
        to={`?modalType=${ModalManagerNames.ADD_ADMIN}`}
        onClick={modalToggler.toggle}
        className={s.HomeCardFooter__toltipItem}>
        Admin
      </Link>

      <Link
        to={HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE}
        onClick={modalToggler.toggle}
        className={s.HomeCardFooter__toltipItem}>
        Team member
      </Link>
    </div>
  );

  return (
    <>
      <div className={s.HomeCardFooter__status}>
        <HomeStatus {...options} statusInputToggler={statusInputToggler} />
      </div>

      {!statusInputToggler.value && (
        <div className={s.HomeCardFooter__btns}>
          <HomeAvatarsGroups />

          <Tippy
            render={renderModalContent}
            offset={[-40, -144]}
            visible={modalToggler.value}
            onClickOutside={modalToggler.unset}
            interactive>
            <div>
              <Button onClick={modalToggler.set} variant="secondary" color="orange" size="s">
                Add
              </Button>
            </div>
          </Tippy>
        </div>
      )}
    </>
  );
};
