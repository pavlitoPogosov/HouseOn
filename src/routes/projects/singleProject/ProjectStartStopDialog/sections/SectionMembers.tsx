import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useFormikContext } from 'formik';


import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import {
  Text,
  TextPropsVariantsEnum, 
} from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';
import { EProjectStartedContentFields } from 'routes/projects/singleProject/ProjectStartStopDialog/types';

type TSectionMembers = {
  dialogToggler: {
    set: () => void;
    unset: () => void;
    value: boolean;
  };
  projectMembers?: TeamMemberType[];
  selectedTeamMember: TeamMemberType | null;
  setSelectedTeamMember: React.Dispatch<React.SetStateAction<TeamMemberType | null>>;
};

export const SectionMembers: React.FC<TSectionMembers> = props => {
  const {
    dialogToggler,
    projectMembers,
    selectedTeamMember,
    setSelectedTeamMember,
  } = props;

  const {
    errors,
    isValid,
    setFieldValue,
    validateForm,
    values,
  } = useFormikContext();

  useEffect(() => {
    setFieldValue(EProjectStartedContentFields.MEMBER, selectedTeamMember);
  }, [ selectedTeamMember ]);

  return (
    <div className={s.ProjectStartedContent__members_container}>
      <Text
        className={s.members__title}
        color="textSecondary"
        variant={TextPropsVariantsEnum.CAPTION_M}
      >
        <FormattedMessage
          defaultMessage="Assigned house team member:"
          id="project.modal.starting.members.title.assigned"
        />
      </Text>

      <TeamMemberShortenedCard
        avatar={selectedTeamMember?.avatar}
        onClickEdit={dialogToggler.set}
        role={selectedTeamMember?.role}
      />
    </div>
  );
};
