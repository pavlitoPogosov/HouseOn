import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';

import s from './ViewAllLink.module.scss';

export interface ViewAllLinkProps {
  to: string;
}

export const ViewAllLink: React.FC<ViewAllLinkProps> = ({ to }) => {
  return (
    <NavigationLink
      as={Link}
      to={to}
      text="View all"
      icon={
        <div className={s.ViewAllLink__iconWrapper}>
          <ChevronRightIcon />
        </div>
      }
      isIconRight
    />
  );
};
