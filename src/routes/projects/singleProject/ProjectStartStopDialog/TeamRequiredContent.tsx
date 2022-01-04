import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';
import { EProjectStartStopDialogTypes } from 'routes/projects/singleProject/ProjectStartStopDialog/types';

type TTeamRequiredContent = {
  onClose: () => void;
  setDialogActiveType: React.Dispatch<React.SetStateAction<EProjectStartStopDialogTypes>>;
};

export const TeamRequiredContent: React.FC<TTeamRequiredContent> = (props) => {
  const { onClose, setDialogActiveType } = props;

  const intl = useIntl();

  const handleNextClick = () => {
    setDialogActiveType(EProjectStartStopDialogTypes.PROJECT_START_STOP);
  };

  const handleEditTeamMember = () => {};

  return (
    <div className={s.ProjectStartStopDialog__narrowedContainer}>
      <div className={s.ProjectStartStopDialog__avatar} />

      <Text
        className={s.ProjectStartStopDialog__text}
        text={intl.formatMessage({
          defaultMessage: 'The project has started!',
          id: 'projects.started.dialog.title'
        })}
        variant={TextPropsVariantsEnum.H3}
      />

      <Text
        className={s.ProjectStartStopDialog__text}
        color="textSecondary"
        text={intl.formatMessage(
          {
            defaultMessage: 'If you want to make it later, the {houseMember} can take it for awhile.',
            id: 'projects.started.dialog.hint-2'
          },
          { houseMember: 'Butler Albert' }
        )}
        variant={TextPropsVariantsEnum.BODY_M}
      />

      <TeamMemberShortenedCard
        containerClassName={s.ProjectStartStopDialog__teamCard}
        onClickEdit={handleEditTeamMember}
      />

      <div className={s.ProjectStartStopDialog__controls}>
        <Button color="orange" onClick={onClose} variant="secondary">
          <FormattedMessage defaultMessage="Cancel" id="app.button.cancel" />
        </Button>

        <Button color="orange" onClick={handleNextClick}>
          <FormattedMessage defaultMessage="Next" id="app.button.next" />
        </Button>
      </div>
    </div>
  );
};
