import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Banner } from 'common/components/ui/Banner/Banner';
import { ButtonLink } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { PROJECTS_PAGE_ROUTE } from 'utils/routes';

import s from './ProjectsBanner.module.scss';

export interface ProjectsBannerProps {}

export const ProjectsBanner: React.FC<ProjectsBannerProps> = () => {
  const intl = useIntl();

  return (
    <div className={s.ProjectsBanner__container}>
      <Text
        variant={TextPropsVariantsEnum.H3}
        text={intl.formatMessage({ id: 'index.banner.projects.title', defaultMessage: 'Projects' })}
        className={s.ProjectsBanner__title}
      />

      <Banner
        variant="secondary"
        title={intl.formatMessage({
          id: 'index.banner.projects.title-2',
          defaultMessage: 'Manage your house by the system'
        })}
        titleVariant={TextPropsVariantsEnum.BODY_M}
        description={intl.formatMessage({
          id: 'index.banner.projects.description',
          defaultMessage:
            'HouseOn offers a set of task in order to manage your house process <br /> successfully and reduce time and your finance waste'
        })}>
        <ButtonLink
          className={s.ProjectsBanner__btn}
          color="orange"
          variant="secondary"
          to={PROJECTS_PAGE_ROUTE}
          size="s">
          <FormattedMessage id="index.banner.projects.button" defaultMessage="View all projects" />
        </ButtonLink>
      </Banner>
    </div>
  );
};
