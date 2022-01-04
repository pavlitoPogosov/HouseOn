import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { EditDescriptionModal } from './EditDescriptionModal/EditDescriptionModal';

import s from './AboutSection.module.scss';

export interface AboutSectionProps {
  isMobile?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isMobile }) => {
  const editModalToggler = useToggle();

  const intl = useIntl();

  const handleEditDescription = () => {};

  return (
    <section>
      <EditDescriptionModal
        onEditDescription={handleEditDescription}
        isOpen={editModalToggler.value}
        onClose={editModalToggler.unset}
      />

      <div className={clsx(s.AboutSection__header, isMobile && s.mobile)}>
        <Text variant={TextPropsVariantsEnum.H3} text="About the section" className={s.AboutSection__title} />

        <NavigationLink
          as="div"
          text={intl.formatMessage({ id: 'app.button.edit', defaultMessage: 'Edit' })}
          icon={<PencilIcon className={s.AboutSection__editIcon} />}
          className={s.AboutSection__edit}
          onClick={editModalToggler.set}
          isIconRight
        />
      </div>

      <Text
        variant={TextPropsVariantsEnum.BODY_M}
        text="This is the description of the section that we attached so that it was here"
        color="textSecondary"
        className={s.AboutSection__description}
      />

      <div className={s.AboutSection__info}>
        <div className={s.AboutSection__infoItem}>
          <span className={s.AboutSection__infoItemLabel}>
            <FormattedMessage id="houseData.project.title" defaultMessage="Project" />
          </span>
          <NavigationLink as="div" text="Server room - House" className={s.AboutSection__infoItemLink} />
        </div>

        <div className={s.AboutSection__infoItem}>
          <span className={s.AboutSection__infoItemLabel}>
            <FormattedMessage id="houseData.folder.title" defaultMessage="Folder" />
          </span>
          <NavigationLink as="div" text="Layout schemes" className={s.AboutSection__infoItemLink} />
        </div>

        <div className={s.AboutSection__infoItem}>
          <span className={s.AboutSection__infoItemLabel}>
            <FormattedMessage id="houseData.section.title" defaultMessage="Section" />
          </span>
          <NavigationLink
            as="div"
            text="Server hardware design documentation - Closet"
            className={s.AboutSection__infoItemLink}
          />
        </div>
      </div>
    </section>
  );
};
