import React from 'react';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { RadioButton } from 'common/components/ui/RadioButton/RadioButton';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './DialogConfirmMember.module.scss';

export interface DialogConfirmMemberProps {
  isReassigning: boolean;
  selectedMember: TeamMemberType;
}

/*

<div className={s.DialogConfirmMember__btnsWrapper}>
  {isReassigning ? (
    <>
      <RadioButton disabled text="Assign to selected tasks forever" name="variant" defaultChecked={true} />

      <RadioButton text="Assign to all tasks in the project forever" name="variant" />

      <RadioButton text="Assign to selected task once" name="variant" />

      <RadioButton text="Assign to all tasks in the project once" name="variant" />
    </>
  ) : (
    <>
      <RadioButton text="Assign to selected tasks once" name="variant" defaultChecked={true} />

      <RadioButton text="Assign to selected tasks forever" name="variant" />
    </>
  )}
</div>

 */

export const DialogConfirmMember: React.FC<DialogConfirmMemberProps> = ({ isReassigning, selectedMember }) => {
  return (
    <div className={s.DialogConfirmMember__container}>
      <Avatar
        avatar={selectedMember?.avatar || null}
        containerClassName={s.DialogConfirmMember__avatar}
        emptyText={selectedMember.name}
        height={96}
        width={96}
      />

      <Text text={'Flores, Juan the florist is assigned to this task'} variant={TextPropsVariantsEnum.H3} />

      <div className={s.DialogConfirmMember__btnsWrapper}>
        <RadioButton defaultChecked name="variant" text="Assign to selected tasks once" />

        <RadioButton name="variant" text="Assign to selected tasks forever" />
      </div>
    </div>
  );
};
