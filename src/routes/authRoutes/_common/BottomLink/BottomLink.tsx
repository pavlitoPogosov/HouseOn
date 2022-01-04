import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { getInvitePageQuery, INVITE_PAGE_QUERY } from 'routes/invite/InvitePage';

import s from './BottomLink.module.scss';

export interface BottomLinkProps {
  text: string;
  href: string;
  hrefText: string;
  className?: string;
}

export const BottomLink: React.FC<BottomLinkProps> = ({ href, hrefText, text, className }) => {
  const finalHref = getInvitePageQuery() ? `${href}?${INVITE_PAGE_QUERY}=` + getInvitePageQuery() : href;

  return (
    <div className={clsx(s.BottomLink__container, className)}>
      <span className={s.BottomLink__text}>{text}</span>

      <NavigationLink as={Link} to={finalHref} text={hrefText} icon={<ChevronRightIcon />} isIconRight />
    </div>
  );
};
