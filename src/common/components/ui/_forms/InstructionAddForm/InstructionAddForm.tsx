import React, { useRef } from 'react';

import clsx from 'clsx';
import { EditorState } from 'draft-js';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { RichInputField } from 'common/components/ui/_formikComponents/RichInputField/RichInputField';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { REQUIRED_FIELD_VALIDATION, RICH_INPUT_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { mergeRefs } from 'utils/mergeRefs';

import s from './InstructionAddForm.module.scss';

enum InstrucionEditInputNames {
  TITLE = 'title',
  CONTENT = 'content',
  ID = 'id'
}

export const INSTRUCTION_EDIT_FORM_INITIAL_VALUES = {
  accordions: [
    {
      [InstrucionEditInputNames.TITLE]: '',
      [InstrucionEditInputNames.CONTENT]: EditorState.createEmpty(),
      [InstrucionEditInputNames.ID]: ''
    }
  ]
};

const INSTRUCTION_EDIT_VALIDATION_SHEMA = Yup.object().shape({
  accordions: Yup.array().of(
    Yup.object().shape({
      [InstrucionEditInputNames.TITLE]: REQUIRED_FIELD_VALIDATION,
      [InstrucionEditInputNames.CONTENT]: RICH_INPUT_FIELD_VALIDATION
    })
  )
});

const INSTRUCTION_EDIT_INITIAL_TOUCHED = {
  accordions: new Array(20).fill({
    [InstrucionEditInputNames.TITLE]: true,
    [InstrucionEditInputNames.CONTENT]: true
  }) as any
};

export const isInstructionAddFormEmpty = (ref: React.MutableRefObject<FormikProps<any> | null>) => {
  if (ref.current) {
    const { accordions } = ref.current.values;
    if (accordions?.length === 1 && !accordions[0]?.title && !accordions[0].content.getCurrentContent().hasText()) {
      return true;
    }
  }

  return false;
};

export interface InstructionAddFormProps {
  initialValues?: typeof INSTRUCTION_EDIT_FORM_INITIAL_VALUES;
  elementToListenScroll?: HTMLElement | null | typeof window;
  error?: string;
}

export const InstructionAddForm = React.forwardRef<any, InstructionAddFormProps>(
  ({ initialValues, elementToListenScroll, error }, ref) => {
    const formikRef = useRef<FormikProps<{ [key in string]: any }> | null>(null);
    const divToScrollRef = useRef<HTMLDivElement | null>(null);

    const handleSubmit = () => {};

    const handleAddFormClick = () => {
      if (formikRef.current) {
        const { values, touched, setValues, setTouched } = formikRef.current;

        const newAccordion = {
          [InstrucionEditInputNames.TITLE]: '',
          [InstrucionEditInputNames.CONTENT]: EditorState.createEmpty()
        };
        const accordions = [...values.accordions, newAccordion];

        setValues({
          ...values,
          accordions
        });
        setTouched({
          ...touched,
          accordions: [
            ...(touched.accordions as []),
            {
              [InstrucionEditInputNames.TITLE]: true,
              [InstrucionEditInputNames.CONTENT]: true
            }
          ]
        });
      }

      setTimeout(() => {
        divToScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    };

    const handleDeleteFormBlock = (index: number) => {
      return () => {
        if (formikRef.current) {
          const { values, setValues } = formikRef.current;

          if (values.accordions.length === 1) {
            setValues({
              ...values,
              accordions: [
                {
                  [InstrucionEditInputNames.TITLE]: '',
                  [InstrucionEditInputNames.CONTENT]: EditorState.createEmpty()
                }
              ]
            });
            return;
          }

          setValues({
            ...values,
            accordions: values.accordions.filter((_: any, i: number) => i !== index)
          });
        }
      };
    };

    return (
      <div className={s.InstructionAddForm__container}>
        <Formik
          initialValues={!initialValues?.accordions?.length ? INSTRUCTION_EDIT_FORM_INITIAL_VALUES : initialValues}
          initialTouched={INSTRUCTION_EDIT_INITIAL_TOUCHED}
          validationSchema={INSTRUCTION_EDIT_VALIDATION_SHEMA}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
          innerRef={mergeRefs([formikRef, ref])}>
          {({ values, errors }) => (
            <ExtentedForm>
              {values.accordions.map((_, i) => {
                const titleName = `accordions.${i}.${InstrucionEditInputNames.TITLE}`;
                const contentName = `accordions.${i}.${InstrucionEditInputNames.CONTENT}`;

                const titleHasError = (errors.accordions || [])[i]
                  ? // @ts-ignore
                    errors.accordions![i][InstrucionEditInputNames.TITLE]
                  : false;

                return (
                  <React.Fragment key={i}>
                    <div className={s.InstructionAddForm__inputWrapper}>
                      <InputField
                        name={titleName}
                        fieldContainerProps={{
                          containerClassName: s.InstructionAddForm__input,
                          label: 'Title'
                        }}
                        placeholder="Type something..."
                      />

                      <IconCircle
                        icon={<CloseIcon width={12} height={12} />}
                        onClick={handleDeleteFormBlock(i)}
                        shadow="l"
                        className={clsx(s.InstructionAddForm__closeIcon, titleHasError && s.marginTop)}
                        width={32}
                        height={32}
                      />
                    </div>

                    <RichInputField
                      name={contentName}
                      elementToListenScroll={elementToListenScroll}
                      variant="primary"
                      placeholder="Type description..."
                    />
                  </React.Fragment>
                );
              })}

              <ErrorMessage error={error} />

              <NavigationLink
                as="div"
                text={`Add ${!!values.accordions.length ? 'another' : ''} one`}
                className={s.InstructionAddForm__addLink}
                onClick={handleAddFormClick}
                icon={
                  <div className={s.InstructionAddForm__addLinkIcon}>
                    <PlusIcon />
                  </div>
                }
              />
            </ExtentedForm>
          )}
        </Formik>

        <div ref={divToScrollRef} />
      </div>
    );
  }
);
