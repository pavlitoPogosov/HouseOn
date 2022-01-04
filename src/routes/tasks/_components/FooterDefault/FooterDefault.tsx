import React from 'react';

import { Button } from 'common/components/ui/Button';

import s from './FooterDefault.module.scss';

export interface FooterDefaultProps {
  submitText: string;
}

export const FooterDefault: React.FC<FooterDefaultProps> = (props) => {
  const { submitText } = props;

  return (
    <div className={s.FooterDefault}>
      <Button className={s.FooterDefault__button} color="gray">
        Cancel
      </Button>
      <Button className={s.FooterDefault__button} color="orange">
        {submitText}
      </Button>
    </div>
  );
};
