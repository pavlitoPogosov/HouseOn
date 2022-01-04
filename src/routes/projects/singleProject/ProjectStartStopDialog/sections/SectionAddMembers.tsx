import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Button } from 'common/components/ui/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';

type TSectionAddMembers = {
  onAddClick: () => void;
};

export const SectionAddMembers: React.FC<TSectionAddMembers> = (props) => {
  const { onAddClick } = props;

  return (
    <div className={s.ProjectStartedContent__members_container}>
      <Text className={s.members__title} color="textSecondary" variant={TextPropsVariantsEnum.CAPTION_M}>
        <FormattedMessage
          defaultMessage="Assign a house team to complete tasks:"
          id="project.modal.starting.members.title"
        />
      </Text>

      <Button
        className={s.members__add_button}
        color="transparent-with-circle"
        leftIcon={
          <IconCircle className={s.add_button__plus_icon} height={24} isStatic width={24}>
            <PlusIcon />
          </IconCircle>
        }
        onClick={onAddClick}
        variant="secondary">
        <FormattedMessage defaultMessage="Add a member of House Team" id="project.modal.starting.members.addMember" />
      </Button>
    </div>
  );
};
