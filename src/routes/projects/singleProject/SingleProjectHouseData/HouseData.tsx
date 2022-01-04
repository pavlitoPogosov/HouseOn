import React from 'react';
import { useIntl } from 'react-intl';

import { FolderCard } from 'common/components/ui/_cards/FolderCard/FolderCard';
import { Alert, TAlertColors } from 'common/components/ui/Alert/Alert';
import { Banner } from 'common/components/ui/Banner/Banner';
import { ReactComponent as HalfEllipsIcon } from 'routes/projects/singleProject/icons/halfEllips.svg';
import s from 'routes/projects/singleProject/SingleProjectHouseData/SingleProjectHouseData.module.scss';
import { TFileItem } from 'routes/projects/types';

type THouseData = {
  alertColor?: TAlertColors;
  files: TFileItem[];
  isBanner?: boolean;
  isEdit?: boolean;
  onRemove?: (id: string) => void;
};

export const HouseData = (props: THouseData): JSX.Element => {
  const { alertColor, files, isBanner = true, isEdit = false, onRemove } = props;

  const intl = useIntl();

  return (
    <>
      {isBanner && (
        <Banner
          containerClassName={s.SingleProjectHouseData__banner}
          description={intl.formatMessage({
            defaultMessage:
              'You can upload recommended files to these folders or turn off those you don’t need and link existing folders from HouseData',
            id: 'projects.houseData.banner.description'
          })}
          descriptionClassName={s.SingleProjectHouseData__bannerText}
          title={intl.formatMessage(
            {
              defaultMessage: '{houseMember} has already prepared a place to keep all data',
              id: 'projects.houseData.banner.title'
            },
            { houseMember: 'Albert' }
          )}
          titleClassName={s.SingleProjectHouseData__bannerText}>
          <HalfEllipsIcon className={s.SingleProjectHouseData__ellipsUp} />

          <HalfEllipsIcon className={s.SingleProjectHouseData__ellipsDown} />
        </Banner>
      )}

      <Alert
        color={alertColor || 'white'}
        containerClassName={s.SingleProjectHouseData__alert_houseData}
        onClose={() => ({})}
        // TODO: add onClose
        text={intl.formatMessage({
          defaultMessage:
            'There is HouseData which is linked to the project. You can close access to some of them by breaking the link icon or keep them visible in this task',
          id: 'projects.houseData.alert.text.houseData'
        })}
      />

      {files?.map((fileItem) => (
        <FolderCard
          containerClassName={s.SingleProjectHouseData__folder}
          file={fileItem}
          isEdit={isEdit}
          key={fileItem.id}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
