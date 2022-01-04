import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Button } from 'common/components/ui/Button/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AddDocumentModal } from 'routes/houseData/components/AddDocumentModal/AddDocumentModal';

import s from './HouseDataFolderControls.module.scss';

const SORT_BY_POPUP_OPTIONS: SortByPopupOption[] = [{ text: 'No matter', value: '0' }];

export interface HouseDataFolderControlsProps {
  title: string;
  onClickBack: () => void;
}

export const HouseDataFolderControls: React.FC<HouseDataFolderControlsProps> = ({ title, onClickBack }) => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const addModalToggler = useToggle();

  const intl = useIntl();

  return (
    <div className={s.HouseDataFolderControls__controls}>
      <AddDocumentModal isOpen={addModalToggler.value} onClose={addModalToggler.unset} />

      <Text
        variant={isTablet ? TextPropsVariantsEnum.H2 : TextPropsVariantsEnum.H3}
        className={s.HouseDataFolderControls__title}
        as="h1">
        <IconCircle
          width={32}
          height={32}
          icon={<ChevronLeftIcon />}
          className={s.HouseDataFolderControls__backIcon}
          onClick={onClickBack}
          shadow="xl"
        />

        {title}
      </Text>

      <div className={s.HouseDataFolderControls__sortWrapper}>
        <SortByPopup
          options={SORT_BY_POPUP_OPTIONS}
          selectedOption={SORT_BY_POPUP_OPTIONS[0]}
          selectedTextPrefix={intl.formatMessage({ id: 'houseData.createBy', defaultMessage: 'Created by:' })}
          containerClassName={s.HouseDataFolderControls__sortContainer}
        />

        <Button color="orange" className={s.HouseDataFolderControls__addBtn} onClick={addModalToggler.set} size="s">
          <FormattedMessage id="houseData.button.addDocument" defaultMessage="Add document" />
        </Button>
      </div>
    </div>
  );
};
