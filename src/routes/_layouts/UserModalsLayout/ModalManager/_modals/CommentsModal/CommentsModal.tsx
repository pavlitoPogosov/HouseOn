import React, { useRef, useState } from 'react';
import ContentLoader from 'react-content-loader';

import { EditorState } from 'draft-js';

import { Alert } from 'common/components/ui/Alert/Alert';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { MODAL_OVERLAY_CHILDREN_ID } from 'common/components/ui/Overlay/Overlay';
import { RichInput } from 'common/components/ui/RichInput/RichInput';
import { useGetHouseQuery, useUpdateHouse } from 'graphql/hooks/house';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { covertDraftJsStateToJSON, getDraftJsStateFromJSON, getDraftJsStateWithCursorAtEnd } from 'utils/draftJsUtils';
import { LOCAL_STORAGE_COMMENTS_ALERT_SEEN } from 'utils/localStorageKeys';

import s from './CommentsModal.module.scss';

export interface CommentsModalProps {
  onClose: () => void;
}

enum CommentsModalTypes {
  VIEW = 'VIEW',
  EDIT = 'EDIT'
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ onClose }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const dispatch = useTypedDispatch();

  const [updateHouse, { loading: updatingHouse }] = useUpdateHouse({
    onError() {
      dispatch(
        createToast({
          title: 'Oops!',
          text: 'Failed to save comments. Please, try again',
          type: 'error',
          dismissTimeout: 3000
        })
      );
    }
  });
  const { loading: loadingComment } = useGetHouseQuery({
    onCompleted(houseResp) {
      if (!houseResp.result.comments) {
        setModalType(CommentsModalTypes.EDIT);
      } else {
        setEditorState(getDraftJsStateFromJSON(houseResp.result.comments));
        setModalType(CommentsModalTypes.VIEW);
      }
    }
  });

  const [wasAlertClosed, setWasAlertClosed] = useState(!!localStorage.getItem(LOCAL_STORAGE_COMMENTS_ALERT_SEEN));
  const [modalType, setModalType] = useState<CommentsModalTypes>(CommentsModalTypes.VIEW);

  const divToScrollRef = useRef<HTMLDivElement | null>(null);

  const isEmpty = !editorState.getCurrentContent().hasText();

  const handleSaveBtnClick = async () => {
    await updateHouse({
      variables: {
        input: {
          comments: editorState.getCurrentContent().hasText() ? covertDraftJsStateToJSON(editorState) : null
        }
      }
    });
    setModalType(CommentsModalTypes.VIEW);
  };

  const handleHeaderBtnClick = () => {
    setModalType(CommentsModalTypes.EDIT);
    setEditorState(getDraftJsStateWithCursorAtEnd(editorState));

    setTimeout(() => {
      divToScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleAlertClose = () => {
    setWasAlertClosed(true);
    localStorage.setItem(LOCAL_STORAGE_COMMENTS_ALERT_SEEN, 'true');
  };

  const isView = modalType === CommentsModalTypes.VIEW && !isEmpty;

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.COMMENT}
      title="Comments"
      onClose={onClose}
      saveBtnText="Save changes"
      headerBtnText="Edit"
      onClickHeaderBtn={modalType === CommentsModalTypes.VIEW ? handleHeaderBtnClick : undefined}
      onClickSaveBtn={modalType === CommentsModalTypes.EDIT ? handleSaveBtnClick : undefined}
      onClickCancelBtn={modalType === CommentsModalTypes.EDIT ? onClose : undefined}
      isLoading={updatingHouse}>
      {!wasAlertClosed && (
        <Alert
          containerClassName={s.CommentsModal__alert}
          color="gray"
          text="Here you can write comments that indicate specific information for the staff"
          onClose={handleAlertClose}
        />
      )}

      {loadingComment ? (
        <ContentLoader width="100%" height={240} viewBox="0 0 100 240" preserveAspectRatio="none">
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="240" />
        </ContentLoader>
      ) : (
        <RichInput
          editorState={editorState}
          onChange={setEditorState}
          elementToListenScroll={document.getElementById(MODAL_OVERLAY_CHILDREN_ID)}
          containerClassName={s.CommentsModal__inputContainer}
          editorProps={{ readOnly: isView }}
          placeholder={isView ? undefined : 'Type something...'}
          disabled={isView}
        />
      )}

      <div ref={divToScrollRef} />
    </Dialog>
  );
};
