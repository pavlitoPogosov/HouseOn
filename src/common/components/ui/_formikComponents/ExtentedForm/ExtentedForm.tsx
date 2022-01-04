import React, { useEffect } from 'react';

import { Form, useFormikContext } from 'formik';

export type OwnProps = {
  disableScrollToError?: boolean;
};

export type ExtentedFormProps = OwnProps & React.HtmlHTMLAttributes<HTMLFormElement>;

export const ExtentedForm: React.FC<ExtentedFormProps> = ({
  children,
  className,
  disableScrollToError,
  ...otherProps
}) => {
  const { errors, isSubmitting, isValidating } = useFormikContext<{}>();

  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating && !disableScrollToError) {
      const selector = `[name=${keys[0]}]`;
      let errorElement = document.querySelector(selector) as HTMLElement | null;

      if (!errorElement) {
        errorElement = document.getElementById(keys[0]);
      }

      if (errorElement) {
        const yOffset = -130;
        const y = errorElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ behavior: 'smooth', top: y });
      }
    }
  }, [isSubmitting, isValidating, errors, disableScrollToError]);

  return (
    <Form {...otherProps} className={className}>
      {children}
    </Form>
  );
};
