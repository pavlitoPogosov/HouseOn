import { EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';

type TGetProjectActionButtonText = {
  defaultMessage: string;
  id: string;
};

export const getProjectActionButtonText = (statusType: EStatusBadgeTypesEnum): TGetProjectActionButtonText => {
  const defaultMessage = {
    defaultMessage: 'Start the project',
    id: 'projects.info.button.start'
  };

  switch (statusType) {
    case EStatusBadgeTypesEnum.IS_PAUSED:
    case EStatusBadgeTypesEnum.IS_READY_TO_START:
      return defaultMessage;

    case EStatusBadgeTypesEnum.IS_ACTIVE:
      return {
        defaultMessage: 'Pause the project',
        id: 'projects.info.button.pause'
      };

    default:
      return defaultMessage;
  }
};
