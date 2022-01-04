import React, { useLayoutEffect, useRef, useState } from 'react';

import { FormikProps } from 'formik';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { useGetHouseQuery } from 'graphql/hooks/house';
import { MUTATION_UPDATE_HOUSE_DIRECTION } from 'graphql/mutations/direction';
import { DirectionType, HouseDirectionInput } from 'graphql/types';
import { submitFormikFormWithRef } from 'utils/formikUtils';

import { CommonSpinner } from '../_common/_CommonSpinner/CommonSpinner';

import { DirectionsEdit, DIRECTIONS_FORM_INITIAL_VALUES } from './DirectionsEdit/DirectionsEdit';
import { DirectionsView } from './DirectionsView/DirectionsView';

import s from './DirectionsModal.module.scss';

export interface IDirectionsModalProps {
  onClose: () => void;
}

enum DirectionsModalTypes {
  EDIT = 'edit',
  VIEW = 'view'
}

export const DirectionsModal: React.FC<IDirectionsModalProps> = ({ onClose }) => {
  const { data, loading, refetch } = useGetHouseQuery();

  const [updateHouseDirection, { error: updatingError, loading: updatingDirection }] = useMutationWithError<
    { result: DirectionType },
    { input: HouseDirectionInput }
  >(MUTATION_UPDATE_HOUSE_DIRECTION);

  const [shownModalType, setShownModalType] = useState(DirectionsModalTypes.EDIT);
  const isEditModal = shownModalType === DirectionsModalTypes.EDIT;
  const isViewModal = shownModalType === DirectionsModalTypes.VIEW;

  const editFormRef = useRef<FormikProps<{ [key in string]: string }> | null>(null);

  const handleCancelBtnClick = () => {
    if (!data?.result.direction || isViewModal) {
      return onClose();
    }

    setShownModalType(DirectionsModalTypes.VIEW);
  };

  const handleSaveBtnClick = () => {
    submitFormikFormWithRef(editFormRef, async (values: typeof DIRECTIONS_FORM_INITIAL_VALUES) => {
      await updateHouseDirection({
        variables: {
          input: {
            additional_info: values.additional,
            address: values.address.address,
            latitude: values.address.coordinates?.latitude as number,
            longitude: values.address.coordinates?.longitude as number
          }
        }
      });
      await refetch();

      setShownModalType(DirectionsModalTypes.VIEW);
    });
  };

  const handleHeaderBtnClick = () => {
    setShownModalType(DirectionsModalTypes.EDIT);
  };

  const renderContent = () => {
    if (loading) {
      return <CommonSpinner />;
    }

    const address = data?.result.direction?.address || '';
    const additional = data?.result.direction?.additional_info || '';
    const pictures: never[] = [];
    const latitude = data?.result.direction?.latitude;
    const longitude = data?.result.direction?.longitude;

    const currentValues: typeof DIRECTIONS_FORM_INITIAL_VALUES = {
      additional,
      address: {
        address,
        coordinates:
          latitude && longitude
            ? {
                latitude,
                longitude
              }
            : undefined
      },
      pictures
    };

    if (isEditModal) {
      return <DirectionsEdit error={!!updatingError} initialValues={currentValues} ref={editFormRef} />;
    }

    return <DirectionsView values={currentValues} />;
  };

  useLayoutEffect(() => {
    if (!loading && data?.result?.direction) {
      setShownModalType(DirectionsModalTypes.VIEW);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Dialog
      cancelBtnText={isViewModal ? 'Close' : 'Cancel'}
      childrenWrapperClassName={s.DirectionsModal__container}
      headerBtnText={isViewModal ? 'Edit' : ''}
      icon={ColorfulIconTypes.GEOMARK}
      isLoading={updatingDirection}
      isOpen
      onClickCancelBtn={handleCancelBtnClick}
      onClickSaveBtn={isEditModal ? handleSaveBtnClick : undefined}
      onClose={onClose}
      onClickHeaderBtn={handleHeaderBtnClick}>
      {renderContent()}
    </Dialog>
  );
};
