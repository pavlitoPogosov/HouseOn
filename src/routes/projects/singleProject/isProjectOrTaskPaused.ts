import { EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';

export const isProjectOrTaskPaused = (statusType: EStatusBadgeTypesEnum) =>
  statusType === EStatusBadgeTypesEnum.IS_PAUSED || statusType === EStatusBadgeTypesEnum.IS_READY_TO_START;
