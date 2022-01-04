import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { AddCommentsBlock } from 'common/components/ui/AddCommentsBlock/AddCommentsBlock';
import { IComment } from 'common/components/ui/AddCommentsBlock/Comment/Comment';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

export interface CommentsSectionProps {}

// TODO remove usseless data
const COMMENTS: IComment[] = [
  { id: 1, author: 'Jessica Chastain', role: 'Cleaner', date: '2021-09-01T12:24:00', message: 'Then will I re-sort?' },
  {
    id: 2,
    author: 'Jessica Chastain',
    role: 'Cleaner',
    date: '2021-09-01T12:24:00',
    message: "Michael, tell me, please, the shelf on top, is it yours or your son's?"
  }
];

export const CommentsSection: React.FC<CommentsSectionProps> = () => {
  const [comments, setComments] = useState<IComment[]>(COMMENTS);

  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'tasks.comments.title', defaultMessage: 'Comments' })}>
      <AddCommentsBlock comments={comments} onChange={setComments} />
    </SectionWrapper>
  );
};
