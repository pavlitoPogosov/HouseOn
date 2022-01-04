import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useToggle } from '@proscom/ui-react';
import { Banner } from 'common/components/ui/Banner/Banner';
import { Button } from 'common/components/ui/Button/Button';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { MobileMenu } from 'common/components/ui/MobileMenu/MobileMenu';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { UserControlsPanel } from 'common/components/ui/UserControlsPanel/UserControlsPanel';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { PeriodicitySection } from 'routes/tasks/_components/TaskDrawer/_sections/PeriodicitySection/PeriodicitySection';
import { DeadlineField } from 'routes/tasks/_components/TaskForm/DeadlineField/DeadlineField';

import { AboutSection } from './_sections/AboutSection/AboutSection';
import { ChecklistSection } from './_sections/ChecklistSection/ChecklistSection';
import { CommentsSection } from './_sections/CommentsSection/CommentsSection';
import { HouseDataSection } from './_sections/HouseDataSection/HouseDataSection';
import { LastActivitiesSection } from './_sections/LastActivitiesSection/LastActivitiesSection';
import { TaskSection } from './_sections/TaskSection/TaskSection';
import { TeamSection } from './_sections/TeamSection/TeamSection';

import s from './TaskDrawer.module.scss';

export interface TaskDrawerProps {
  isOpen: boolean;

  onClose: () => void;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({ isOpen, onClose }) => {
  const isAdaptive = useMediaQuery('(max-width: 767px)');

  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberType | null>(null);

  const dialogToggler = useToggle();

  const intl = useIntl();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} animation="right" containerClassName={s.TaskDrawer__container}>
      {isAdaptive && (
        <div className={s.TaskDrawer__header}>
          <MobileMenu />

          <UserControlsPanel isMobile />
        </div>
      )}

      <TaskSection onClose={onClose} />
      <AboutSection />
      <PeriodicitySection />
      <DeadlineField />
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
        containerClassName={s.TaskDrawer__banner}
        titleClassName={s.TaskDrawer__bannerTitle}
        title={intl.formatMessage(
          {
            id: 'tasks.banner.title',
            defaultMessage:
              'According to analysis based on the experience of other households this task will take {countDays} days'
          },
          { countDays: '4-6' }
        )}
        titleVariant={TextPropsVariantsEnum.CAPTION_M}
      >
        {/* TODO add real route */}
        <Link to="/" className={s.TaskDrawer__bannerLink}>
          {intl.formatMessage({ id: 'app.button.learnMore', defaultMessage: 'Learn more' })}
        </Link>

        <Text
          text={intl.formatMessage(
            {
              id: 'tasks.banner.text',
              defaultMessage: '{countDays} Days'
            },
            { countDays: '4-6' }
          )}
          variant={TextPropsVariantsEnum.H2}
          as="div"
          className={s.TaskDrawer__bannerText}
          color="white"
        />
      </Banner>

      <Button color="orange" size="s" className={s.TaskDrawer__saveBtn}>
        {intl.formatMessage({ id: 'app.button.save', defaultMessage: 'Save' })}
      </Button>
    </Drawer>
  );
};
