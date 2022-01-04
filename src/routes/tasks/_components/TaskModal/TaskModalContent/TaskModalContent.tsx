import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useToggle } from '@proscom/ui-react';
import { Banner } from 'common/components/ui/Banner/Banner';
import { Button } from 'common/components/ui/Button';
import {
  Text,
  TextPropsVariantsEnum, 
} from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { AboutSection } from '../../TaskDrawer/_sections/AboutSection/AboutSection';
import { ChecklistSection } from '../../TaskDrawer/_sections/ChecklistSection/ChecklistSection';
import { CommentsSection } from '../../TaskDrawer/_sections/CommentsSection/CommentsSection';
import { DeadlineSection } from '../../TaskDrawer/_sections/DeadlineSection/DeadlineSection';
import { HouseDataSection } from '../../TaskDrawer/_sections/HouseDataSection/HouseDataSection';
import { LastActivitiesSection } from '../../TaskDrawer/_sections/LastActivitiesSection/LastActivitiesSection';
import { PeriodicitySection } from '../../TaskDrawer/_sections/PeriodicitySection/PeriodicitySection';
import { TaskSection } from '../../TaskDrawer/_sections/TaskSection/TaskSection';
import { TeamSection } from '../../TaskDrawer/_sections/TeamSection/TeamSection';

import { TaskModalContentHeader } from './sections/TaskModalContentHeader';

import s from './TaskModalContent.module.scss';

export const TaskModalContent = (): JSX.Element => {
  const isAdaptive = useMediaQuery('(max-width: 767px)');

  const [ selectedTeamMember, setSelectedTeamMember ] = useState<TeamMemberType | null>(null);

  const dialogToggler = useToggle();

  const intl = useIntl();

  const onClose = () => {};

  const onClick = () => {};

  return (
    <div className={s.TaskModalContent__wrapper}>
      <TaskModalContentHeader />

      <TaskSection onClose={onClose} />

      <AboutSection />

      <PeriodicitySection />

      <DeadlineSection />

      <TeamSection
        dialogToggler={dialogToggler}
        selectedTeamMember={selectedTeamMember}
        setSelectedTeamMember={setSelectedTeamMember}
      />

      <ChecklistSection />

      <HouseDataSection />

      <CommentsSection />

      <LastActivitiesSection />

      <Banner
        containerClassName={s.TaskModalContent__banner}
        title={
          intl.formatMessage({
            defaultMessage:
              'According to analysis based on the experience of other households this task will take {countDays} days',
            id: 'tasks.banner.title',
          },
          { countDays: '4-6' })
        }
        titleClassName={s.TaskModalContent__bannerTitle}
        titleVariant={TextPropsVariantsEnum.CAPTION_M}
      >
        {/* TODO add real route */}

        <Link
          className={s.TaskModalContent__bannerLink}
          to="/"
        >
          {intl.formatMessage({ defaultMessage: 'Learn more', id: 'app.button.learnMore' })}
        </Link>

        <Text
          as="div"
          className={s.TaskModalContent__bannerText}
          color="white"
          text={
            intl.formatMessage({
              defaultMessage: '{countDays} Days',
              id: 'tasks.banner.text',
            },
            { countDays: '4-6' })
          }
          variant={TextPropsVariantsEnum.H2}
        />
      </Banner>

      <Button
        className={s.TaskModalContent__saveBtn}
        color="orange"
        size="s"
      >
        {intl.formatMessage({ defaultMessage: 'Save', id: 'app.button.save' })}
      </Button>
    </div>
  );
};
