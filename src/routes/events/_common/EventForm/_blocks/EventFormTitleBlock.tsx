import React from 'react';
import { useIntl } from 'react-intl';

import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { EventFormFields } from '../EventForm';

import s from './_styles.module.scss';

export interface IEventFormTitleBlockProps {
  isLoading: boolean;
}

export const EventFormTitleBlock: React.FC<IEventFormTitleBlockProps> = ({ isLoading }) => {
  const intl = useIntl();

  return (
    <div className={s.EventForm__block}>
      <Text
        className={s.EventForm__title}
        text={intl.formatMessage({ defaultMessage: 'Title & description', id: 'event.form.title' })}
        variant={TextPropsVariantsEnum.H3}
      />

      <InputField
        disabled={isLoading}
        fieldContainerProps={{ label: intl.formatMessage({ defaultMessage: 'Title', id: 'event.form.title.label' }) }}
        maxLength={100}
        name={EventFormFields.TITLE}
        placeholder={intl.formatMessage({
          defaultMessage: 'Example: Maria’s Birthday',
          id: 'event.form.title.placeholder'
        })}
      />

      <TextAreaField
        disabled={isLoading}
        fieldContainerProps={{
          label: intl.formatMessage({ defaultMessage: 'Description', id: 'event.form.description.label' })
        }}
        maxLetters={480}
        name={EventFormFields.DESCRIPTION}
        placeholder={intl.formatMessage({
          defaultMessage: 'Example: “Don’t miss a sign on the road”',
          id: 'event.form.description.placeholder'
        })}
        textAreaClassName={s.EventForm__textArea}
      />
    </div>
  );
};
