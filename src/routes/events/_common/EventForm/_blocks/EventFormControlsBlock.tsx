import React from 'react';
import { FormattedMessage } from 'react-intl';

import { appHistory } from 'appHistory';

import { Button } from 'common/components/ui/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { EVENTS_PAGE_ROUTE } from 'utils/routes';

import s from './_styles.module.scss';

export interface IEventFormControlsBlockProps {
  error: boolean;
  isEdit?: boolean;
  isLoading: boolean;
  onClickPreview: () => void;
}

export const EventFormControlsBlock: React.FC<IEventFormControlsBlockProps> = (props) => {
  const { error, isEdit, isLoading, onClickPreview } = props;

  const handleCancelClick = () => {
    appHistory.goBack(EVENTS_PAGE_ROUTE);
  };

  return (
    <div className={s.EventForm__controls}>
      <ErrorMessage error={error ? DEFAULT_ERROR_MESSAGE : undefined} />

      <div className={s.EventForm__controlsInner}>
        <Button
          color="orange"
          disabled={isLoading}
          onClick={handleCancelClick}
          size="s"
          type="button"
          variant="secondary"
        >
          <FormattedMessage defaultMessage="Cancel" id="app.button.cancel" />
        </Button>

        <div>
          <Button
            color="orange"
            disabled={isLoading}
            onClick={onClickPreview}
            size="s"
            type="button"
            variant="secondary"
          >
            <FormattedMessage defaultMessage="Preview" id="event.form.button.preview" />
          </Button>

          <Button color="orange" isLoading={isLoading} size="s" type="submit">
            <FormattedMessage
              defaultMessage={isEdit ? 'Update event' : 'Create event'}
              id={isEdit ? 'event.form.button.updateEvent' : 'event.form.button.createEvent'}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
