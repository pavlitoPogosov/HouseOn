import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as GuestIcon } from 'assets/icons/guest.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { ITextTab, TextTabs } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AccountType, DurationEnum } from 'graphql/types';
import { Tasks } from 'routes/houseTeam/HouseTeamViewMembers/SelectedMemberContent/MemberInfo/Tasks/Tasks';
import { getAmpluaName } from 'utils/houseTeam';
import { HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE } from 'utils/routes';

import { Finance } from './Finance/Finance';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';
import { Projects } from './Projects/Projects';
import { WorkingSchedule } from './WorkingSchedule/WorkingSchedule';

import s from './MemberInfo.module.scss';

export interface MemberInfoProps {
  selectedMember: AccountType;
}

enum TabsVariants {
  PERSONAL_INFO = 'PERSONAL_INFO',
  WORKING_SCHEDULE = 'WORKING_SCHEDULE',
  PROJECTS = 'PROJECTS',
  TASKS = 'TASKS',
  FINANCE = 'FINANCE'
}

const TABS: ITextTab[] = [
  { text: 'Personal information', value: TabsVariants.PERSONAL_INFO },
  { text: 'Working schedule', value: TabsVariants.WORKING_SCHEDULE },
  { text: 'Projects', value: TabsVariants.PROJECTS },
  { text: 'Tasks', value: TabsVariants.TASKS },
  { text: 'Finance', value: TabsVariants.FINANCE }
];

export const MemberInfo: React.FC<MemberInfoProps> = ({ selectedMember }) => {
  const isSmall = useMediaQuery('(max-width: 576px');
  const isExtraSmall = useMediaQuery('(max-width: 362px)');

  const [activeTab, setActiveTab] = useState<string>(TabsVariants.PERSONAL_INFO);

  const intl = useIntl();

  const renderActiveTab = () => {
    if (activeTab === TabsVariants.PERSONAL_INFO) {
      return <PersonalInfo selectedMember={selectedMember} />;
    }

    if (activeTab === TabsVariants.WORKING_SCHEDULE) {
      return <WorkingSchedule schedules={selectedMember.schedules || []} />;
    }

    if (activeTab === TabsVariants.FINANCE) {
      return <Finance selectedMember={selectedMember} />;
    }

    if (activeTab === TabsVariants.TASKS) {
      return <Tasks />;
    }

    return <Projects selectedMember={selectedMember} />;
  };

  const getFormatPayment = (duration: DurationEnum | undefined) => {
    switch (duration) {
      case DurationEnum.Hours:
        return 'h';
      case DurationEnum.Month:
        return 'm';
      default:
        return '';
    }
  };

  return (
    <div className={s.MemberInfo__container}>
      <div className={s.MemberInfo__header}>
        <div className={s.MemberInfo__member}>
          {selectedMember.user && selectedMember.user.avatar ? (
            <Avatar
              avatar={selectedMember.user.avatar.url}
              containerClassName={s.MemberInfo__avatar}
              width={isExtraSmall ? 42 : 56}
              height={isExtraSmall ? 42 : 56}
            />
          ) : (
            <div className={s.MemberInfo__avatar}>
              <GuestIcon />
            </div>
          )}
          <div>
            <div className={s.MemberInfo__title}>
              <Text
                variant={isExtraSmall ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}
                as="h2"
                text={selectedMember.name || ''}
              />

              {/*<CounterBadge text={String(selectedMember.account.salary?.amount)} color="secondary" />*/}
            </div>

            <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.MemberInfo__role} color="textSecondary">
              <div className={s.MemberInfo__spreadRow}>
                {getAmpluaName(selectedMember.amplua || '', intl)}
                <span className={s.MemberInfo__dot}>&#8226;</span>
                <FormattedMessage
                  id="houseTeam.member.payment"
                  defaultMessage="Payment: {payment}/{paymentFormat} "
                  values={{
                    payment: selectedMember.salary?.amount,
                    paymentFormat: getFormatPayment(selectedMember.salary?.duration)
                  }}
                />
                <span className={s.MemberInfo__dot}>&#8226;</span>
              </div>
              <div className={clsx(s.MemberInfo__spreadRow, isSmall ? s.MemberInfo__spreadRow_mt : '')}>
                <span
                  className={clsx(s.MemberInfo__status, {
                    [s.online]: selectedMember.is_active,
                    [s.offline]: !selectedMember.is_active
                  })}
                >
                  <span className={s.MemberInfo__statusCircle} />

                  {selectedMember.is_active
                    ? intl.formatMessage({ id: 'houseTeam.member.atWork', defaultMessage: 'At work' })
                    : intl.formatMessage({ id: 'houseTeam.member.vacationing', defaultMessage: 'Vacationing' })}
                </span>
                <NavigationLink
                  as={Link}
                  text="Edit"
                  to={HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE.replace(':id(\\d+)', selectedMember.id)}
                  icon={
                    <div className={s.MemberInfo__editIcon}>
                      <PencilIcon />
                    </div>
                  }
                />
              </div>
            </Text>
          </div>
        </div>
      </div>
      <TextTabs
        tabs={TABS}
        onChange={setActiveTab}
        value={activeTab}
        containerClassName={s.MemberInfo__tabs}
        tabClassName={s.MemberInfo__tab}
        includeBorderBottom
      />
      {renderActiveTab()}
    </div>
  );
};
