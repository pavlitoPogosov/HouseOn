import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import clsx from 'clsx';
import { useFormikContext } from 'formik';

import Tippy from '@tippyjs/react';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { ReactComponent as Rectangle } from 'assets/icons/rectangle.svg';
import { Button } from 'common/components/ui/Button';
import { ErrorTooltip } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/ErrorTooltip';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';

type TSectionControls = {
  isStarted: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const SectionControls: React.FC<TSectionControls> = props => {
  const {
    isStarted,
    onCancel,
    onSubmit,
  } = props;

  const {
    errors,
    isValid,
    validateForm,
    values,
  } = useFormikContext();

  useEffect(() => {
    validateForm(values);
  }, [ values ]);

  return (
    <div className={s.ProjectStartedContent__controls}>
      <div className={s.controls__inner}>
        <Button
          className={s.controls__cancel}
          color="grey"
          onClick={onCancel}
          size="m"
          type="button"
          variant="primary"
        >
          <FormattedMessage
            defaultMessage="Cancel"
            id="project.modal.starting.cancel"
          />
        </Button>

        <div className={s.controls__submit_container}>
          <Tippy
            appendTo="parent"
            arrow
            className={s.submit_container__tooltip}
            content={<ErrorTooltip text={Object.values(errors).find(value => !!value) as string} />}
            disabled={isValid}
          >
            <Button
              className={clsx(s.controls__submit, !isValid && s.disabled, isStarted && s.started)}
              color={isStarted ? 'grey' : 'green'}
              leftIcon={isStarted && <Rectangle className={clsx(s.controls__submit_icon, s.submit_icon__pause)} />}
              onClick={
                () => {
                  if (isValid) {
                    onSubmit?.();
                  }
                }
              }
              rightIcon={!isStarted && <ChevronRightIcon className={s.controls__submit_icon} />}
              variant="primary"
            >
              {
                isStarted ? (
                  <FormattedMessage
                    defaultMessage="Stop the project"
                    id="project.modal.stop.submit"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Start the project"
                    id="project.modal.start.submit"
                  />
                )
              }
            </Button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};
