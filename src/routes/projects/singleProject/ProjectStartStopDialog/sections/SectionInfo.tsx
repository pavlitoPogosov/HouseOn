import React from 'react';

import { ReactComponent as PaperIcon } from 'assets/icons/paper.svg';
import { StatusBadge, EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';

type TSectionInfo = {
  project: IProject | undefined;
  statusType: EStatusBadgeTypesEnum;
};

export const SectionInfo: React.FC<TSectionInfo> = (props) => {
  const { project, statusType } = props;

  return (
    <div className={s.ProjectStartedContent__info}>
      <Text className={s.info__title} variant={TextPropsVariantsEnum.H3}>
        <>
          <PaperIcon className={s.info__title_icon} />

          {project?.title}
        </>
      </Text>

      <div className={s.info__statuses_container}>
        <StatusBadge containerClassName={s.statuses_container__status} statusType={statusType} />
      </div>
    </div>
  );
};
