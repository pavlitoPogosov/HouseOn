import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Button } from 'common/components/ui/Button/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AddDocumentModal } from 'routes/houseData/components/AddDocumentModal/AddDocumentModal';

import { FileCard } from '../../components/FileCard/FileCard';

import { MoveFileModal } from './MoveFileModal/MoveFileModal';

import s from './HouseDataInboxMain.module.scss';

export interface HouseDataInboxMainProps {}

export const HouseDataInboxMain: React.FC<HouseDataInboxMainProps> = () => {
  const moveFileModalToggler = useToggle();
  const history = useHistory();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const addModalToggler = useToggle();

  const intl = useIntl();

  const handleBackIconClick = () => {
    history.goBack();
  };

  const handleDeleteFile = () => {};

  const handleMoveFile = () => {
    moveFileModalToggler.set();
  };

  const handleSaveFile = () => {};

  return (
    <>
      <AddDocumentModal isOpen={addModalToggler.value} onClose={addModalToggler.unset} />

      <div className={s.HouseDataInboxMain__controls}>
        <Text
          variant={isDesktop ? TextPropsVariantsEnum.H2 : TextPropsVariantsEnum.H3}
          className={s.HouseDataInboxMain__title}
          as="h1">
          <IconCircle
            width={32}
            height={32}
            icon={<ChevronLeftIcon />}
            className={s.HouseDataInboxMain__backIcon}
            onClick={handleBackIconClick}
            shadow="xl"
          />
          <FormattedMessage id="houseData.button.inbox" defaultMessage="Inbox" />
        </Text>

        <Button color="orange" size="s" className={s.HouseDataInboxMain__addBtn} onClick={addModalToggler.set}>
          <FormattedMessage id="houseData.button.addDocument" defaultMessage="Add document" />
        </Button>
      </div>

      <div className={s.HouseDataInboxMain__content}>
        {new Array(12).fill(1).map((_, i) => (
          <FileCard
            key={i}
            onDeleteFile={handleDeleteFile}
            onMoveFile={handleMoveFile}
            title="File’s name"
            createTime="2021-09-11"
            fileExtension="pdf"
          />
        ))}
      </div>

      <MoveFileModal
        isOpen={moveFileModalToggler.value}
        onClose={moveFileModalToggler.unset}
        onSaveFile={handleSaveFile}
      />
    </>
  );
};
