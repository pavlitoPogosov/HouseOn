import React from 'react';
import { useIntl } from 'react-intl';

import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ESettingsFormFieldsTypes } from 'routes/projects/singleProject/ProjectSettingsDialog/types';

import s from './styles.module.scss';

type TAboutSection = {};

export const AboutSection: React.FC<TAboutSection> = (props) => {
  const {} = props;

  const intl = useIntl();

  return (
    <div className={s.AboutSection__container}>
      <Text
        className={s.AboutSection__title}
        text={intl.formatMessage({ defaultMessage: 'About the project', id: 'project.settings.form.about.title' })}
        variant={TextPropsVariantsEnum.H3}
      />

      <TextAreaField
        fieldContainerProps={{
          label: intl.formatMessage({ defaultMessage: 'Describe', id: 'project.settings.form.about.label' }),
          labelClassName: s.AboutSection__textArea_label
        }}
        maxLetters={480}
        name={ESettingsFormFieldsTypes.ABOUT}
        placeholder={intl.formatMessage({
          defaultMessage: 'Example: “Don’t miss a sign on the road”',
          id: 'project.settings.form.about.placeholder'
        })}
        textAreaClassName={s.AboutSection__textArea}
      />
    </div>
  );
};
