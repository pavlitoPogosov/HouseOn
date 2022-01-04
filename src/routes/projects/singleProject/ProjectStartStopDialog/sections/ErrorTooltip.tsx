import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TextPropsVariantsEnum, Text } from 'common/components/ui/Text/Text';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';

type TErrorTooltip = {
  text: string;
};

export const ErrorTooltip: React.FC<TErrorTooltip> = (props) => {
  const { text } = props;

  return (
    <div className={s.ProjectStartedContent__error_tooltip}>
      <Text className={s.error_tooltip__text} color="textSecondary" variant={TextPropsVariantsEnum.CAPTION_M}>
        {text || (
          <FormattedMessage
            defaultMessage="You have to add a member of House Team to start the project."
            id="project.modal.starting.submit.tooltip.error"
          />
        )}
      </Text>
    </div>
  );
};
