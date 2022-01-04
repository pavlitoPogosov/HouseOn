import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Button } from 'common/components/ui/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './styles.module.scss';

type TAddMembersSection = {
  onAddClick: () => void;
};

export const AddMembersSection: React.FC<TAddMembersSection> = (props) => {
  const { onAddClick } = props;

  return (
    <div className={s.AddMembersSection__members_container}>
      <Text className={s.members__title} variant={TextPropsVariantsEnum.H3}>
        <FormattedMessage defaultMessage="Responsible" id="project.settings.form.responsible.title" />
      </Text>

      <Text
        className={s.AddMembersSection__members__title}
        color="textSecondary"
        variant={TextPropsVariantsEnum.CAPTION_M}>
        <FormattedMessage
          defaultMessage="Assign a house team to complete tasks:"
          id="project.settings.form.members.title"
        />
      </Text>

      <Button
        className={s.AddMembersSection__members__add_button}
        color="transparent-with-circle"
        leftIcon={
          <IconCircle className={s.add_button__plus_icon} height={24} isStatic width={24}>
            <PlusIcon />
          </IconCircle>
        }
        onClick={onAddClick}
        variant="secondary">
        <FormattedMessage defaultMessage="Add a member of House Team" id="project.settings.form.members.addMember" />
      </Button>
    </div>
  );
};
