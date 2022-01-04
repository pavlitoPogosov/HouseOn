import React from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TextArea } from 'common/components/ui/TextArea/TextArea';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { moveInputCaretToEnd } from 'common/components/utils/moveInputCaretToEnd';
import { useInput } from 'common/hooks/useInput';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

import s from './AboutSection.module.scss';

export interface AboutSectionProps {}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const intl = useIntl();

  const [aboutValue, setAboutValue] = useInput(
    'This is a task that will allow you to keep everything in order so that you have it in predictable places.'
  );
  const textAreaToggler = useToggle();

  return (
    <SectionWrapper title="About the task">
      {textAreaToggler.value ? (
        <TextArea
          value={aboutValue}
          onChange={setAboutValue}
          onFocus={moveInputCaretToEnd}
          onBlur={textAreaToggler.unset}
          fieldContainerProps={{
            label: intl.formatMessage({
              id: 'tasks.form.describe.label',
              defaultMessage: 'Describe'
            })
          }}
          autoFocus
          enableAutoSize
        />
      ) : (
        <Text variant={TextPropsVariantsEnum.BODY_M}>
          {aboutValue}
          <NavigationLink
            as="div"
            text={intl.formatMessage({ id: 'app.button.edit', defaultMessage: 'Edit' })}
            className={s.AboutSection__link}
            onClick={textAreaToggler.set}
            icon={<PencilIcon />}
            isIconRight
          />
        </Text>
      )}

      <div className={s.AboutSection__togglerWrapper}>
        <ToggleSwitch size="sm" />

        <Text
          variant={TextPropsVariantsEnum.BODY_M}
          text={intl.formatMessage({
            id: 'tasks.highPriority',
            defaultMessage: 'High priority'
          })}
          className={s.AboutSection__togglerText}
        />
      </div>
    </SectionWrapper>
  );
};
