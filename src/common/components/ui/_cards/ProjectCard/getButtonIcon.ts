import { ReactComponent as Rectangle } from 'assets/icons/rectangle.svg';
import { ReactComponent as TriangleRight } from 'assets/icons/triangleRight.svg';

import { EStatusBadgeTypesEnum } from '../../_badges/StatusBadge/StatusBadge';

export const getButtonIcon = (statusType: EStatusBadgeTypesEnum) => {
  switch (statusType) {
    case EStatusBadgeTypesEnum.IS_PAUSED:
    case EStatusBadgeTypesEnum.IS_READY_TO_START:
      return TriangleRight;

    case EStatusBadgeTypesEnum.IS_ACTIVE:
      return Rectangle;

    default:
      return TriangleRight;
  }
};
