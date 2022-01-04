import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useFormikContext } from 'formik';

import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { ESettingsFormFieldsTypes } from 'routes/projects/singleProject/ProjectSettingsDialog/types';

import s from './styles.module.scss';

type TResponsibleSection = {
  dialogToggler: {
    set: () => void;
    unset: () => void;
    value: boolean;
  };
  projectMembers?: TeamMemberType[];
  selectedTeamMember: TeamMemberType | null;
  setSelectedTeamMember: React.Dispatch<React.SetStateAction<TeamMemberType | null>>;
};

export const ResponsibleSection: React.FC<TResponsibleSection> = (props) => {
  const { dialogToggler, projectMembers, selectedTeamMember, setSelectedTeamMember } = props;

  const { errors, isValid, setFieldValue, validateForm, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(ESettingsFormFieldsTypes.MEMBER, selectedTeamMember);
  }, [selectedTeamMember]);

  return (
    <div className={s.ResponsibleSection__members_container}>
      <Text className={s.members__title} variant={TextPropsVariantsEnum.H3}>
        <FormattedMessage defaultMessage="Responsible" id="project.settings.form.responsible.title" />
      </Text>

      <TeamMemberShortenedCard
        avatar={selectedTeamMember?.avatar}
        containerClassName={s.ResponsibleSection__member_container}
        onClickEdit={dialogToggler.set}
        role={selectedTeamMember?.role}
      />
    </div>
  );
};
