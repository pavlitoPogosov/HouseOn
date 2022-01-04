import React from 'react';

import { FormikProps } from 'formik';

export const submitFormikFormWithRef = (
  ref: React.MutableRefObject<FormikProps<any> | null | undefined>,
  func: Function
) => {
  if (ref?.current) {
    ref.current.validateForm().then((errors) => {
      if (!Object.keys(errors).length && ref.current) {
        func(ref.current.values);
      }
    });
  }
};
