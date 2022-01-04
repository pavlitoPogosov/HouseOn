import React from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ArrowDiagonalIcon } from 'assets/icons/arrowDiagonal.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { FolderCard } from 'common/components/ui/_cards/FolderCard/FolderCard';
import { Alert } from 'common/components/ui/Alert/Alert';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

import s from './HouseDataSection.module.scss';

export const HouseDataSection: React.FC<unknown> = () => {
  const alertToggler = useToggle();

  const intl = useIntl();

  return (
    <SectionWrapper
      title={intl.formatMessage({ defaultMessage: 'HouseData', id: 'tasks.houseData.title' })}
      titleCmp={
        (
          <IconCircle
            height={32}
            icon={<ArrowDiagonalIcon />}
            shadow="l"
            width={32}
          />
        )
      }
    >
      {
        !alertToggler.value && (
          <Alert
            color="gray"
            containerClassName={s.HouseDataSection__alert}
            onClose={alertToggler.toggle}
            text={
              intl.formatMessage({
                defaultMessage:
              'There is HouseData which is linked to the project. You can close access to some of them or fill with data',
                id: 'tasks.houseData.alert.aboutHouseData',
              })
            }
          />
        )
      }

      <FolderCard containerClassName={s.HouseDataSection__folderCard} />

      <FolderCard containerClassName={s.HouseDataSection__folderCard} />

      <FolderCard containerClassName={s.HouseDataSection__folderCard} />

      <FolderCard containerClassName={s.HouseDataSection__folderCard} />

      <FolderCard containerClassName={s.HouseDataSection__folderCard} />

      <NavigationLink
        as="div"
        className={s.HouseDataSection__link}
        icon={<EyeIcon />}
        isUnderline
      >
        {intl.formatMessage({ defaultMessage: 'Select more from HouseData', id: 'tasks.houseData.button.more' })}
      </NavigationLink>
    </SectionWrapper>
  );
};
