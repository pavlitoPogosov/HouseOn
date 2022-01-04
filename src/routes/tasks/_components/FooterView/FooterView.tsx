import React from 'react';

import { TextArea } from 'common/components/ui/TextArea/TextArea';

import s from './FooterView.module.scss';

export interface FooterViewProps {}

export const FooterView: React.FC<FooterViewProps> = (props) => {
  return (
    <div className={s.FooterView}>
      <TextArea />
    </div>
  );
};
