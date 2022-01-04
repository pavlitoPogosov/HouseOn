import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';

import { SectionWrapper } from '../_SectionWrapper/SectionWrapper';

import { VisibilityCard } from './VisibilityCard/VisibilityCard';

import s from './VisibilitySection.module.scss';

export interface VisibilitySectionProps {}

export const VisibilitySection: React.FC<VisibilitySectionProps> = () => {
  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'houseData.visibility.title', defaultMessage: 'Visibility' })}>
      <VisibilityCard
        title="Home ownership care"
        description="Projects"
        containerClassName={s.VisibilitySection__card}
      />

      <VisibilityCard
        title="Server hardware design documentation..."
        description="Tasks"
        containerClassName={s.VisibilitySection__card}
      />

      <NavigationLink
        as="div"
        text="Add project or task"
        icon={
          <div className={s.VisibilitySection__plusIcon}>
            <PlusIcon />
          </div>
        }
      />
    </SectionWrapper>
  );
};
