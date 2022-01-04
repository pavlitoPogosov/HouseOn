import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';

import { EditorState } from 'draft-js';

import { Alert } from 'common/components/ui/Alert/Alert';
import { RichInput } from 'common/components/ui/RichInput/RichInput';
import { useGetHouseQuery, useUpdateHouse } from 'graphql/hooks/house';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { covertDraftJsStateToJSON, getDraftJsStateFromJSON, getDraftJsStateWithCursorAtEnd } from 'utils/draftJsUtils';
import { LOCAL_STORAGE_COMMENTS_ALERT_SEEN } from 'utils/localStorageKeys';

import { SubmitBtn } from '../_SubmitBtn/SubmitBtn';
import { SubmitBtnSkeleton } from '../_SubmitBtn/SubmitBtnSkeleton';
import { TabContainer } from '../_TabContainer/TabContainer';

import s from './CommentsTab.module.scss';

export interface CommentsTabProps {}

export const CommentsTab: React.FC<CommentsTabProps> = () => {
  const dispatch = useTypedDispatch();

  const intl = useIntl();

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { loading: loadingComment } = useGetHouseQuery({
    onCompleted(houseResp) {
      if (houseResp.result.comments) {
        setEditorState(getDraftJsStateWithCursorAtEnd(getDraftJsStateFromJSON(houseResp.result.comments)));
      }
    }
  });
  const [updateHouse, { loading: updatingHouse }] = useUpdateHouse({
    onError() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'settings.tabs.alert.failed.title',
            defaultMessage: 'Oops!'
          }),
          text: intl.formatMessage({
            id: 'settings.tabs.alert.failed.text',
            defaultMessage: 'Failed to save comments. Please, try again'
          }),
          type: 'error'
        })
      );
    },
    onCompleted() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'settings.tabs.alert.success.title',
            defaultMessage: 'Success'
          }),
          text: intl.formatMessage({
            id: 'settings.tabs.comment.alert.success.text',
            defaultMessage: 'Comments saved'
          }),
          type: 'success'
        })
      );
    }
  });

  const handleSaveComments = () => {
    updateHouse({
      variables: {
        input: {
          comments: editorState.getCurrentContent().hasText() ? covertDraftJsStateToJSON(editorState) : null
        }
      }
    });
  };

  const [wasAlertClosed, setWasAlertClosed] = useState(!!localStorage.getItem(LOCAL_STORAGE_COMMENTS_ALERT_SEEN));

  const handleAlertClose = () => {
    localStorage.setItem(LOCAL_STORAGE_COMMENTS_ALERT_SEEN, 'true');
    setWasAlertClosed(true);
  };

  const renderContent = () => {
    if (loadingComment) {
      return (
        <>
          <ContentLoader width="100%" height={240} viewBox="0 0 100 240" preserveAspectRatio="none">
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="240" />
          </ContentLoader>
          <SubmitBtnSkeleton />
        </>
      );
    }

    return (
      <>
        {!wasAlertClosed && (
          <Alert
            containerClassName={s.CommentsModal__alert}
            color="gray"
            text={intl.formatMessage({
              id: 'settings.tabs.comment.alert.hint.text',
              defaultMessage: 'Here you can write comments that indicate specific information for the staff'
            })}
            onClose={handleAlertClose}
          />
        )}

        <RichInput
          editorState={editorState}
          onChange={setEditorState}
          elementToListenScroll={window}
          containerClassName={s.CommentsModal__inputContainer}
          placeholder="Type something..."
        />

        <SubmitBtn isLoading={updatingHouse} onClick={handleSaveComments} />
      </>
    );
  };

  return <TabContainer>{renderContent()}</TabContainer>;
};
