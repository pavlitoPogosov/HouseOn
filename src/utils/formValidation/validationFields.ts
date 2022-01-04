import * as Yup from 'yup';

import { isValidMobilePhone } from './isValidMobilePhone';
import {
  FIELD_MIN_LENGTH_ERROR,
  FIELD_REQUIRED_ERROR,
  FIELD_EMAIL_PHONE_ERROR,
  FIELD_PHONE_ERROR,
  FIELD_EMAIL_ERROR,
  FIELD_FILES_ERROR,
  FIELD_CODE_INVALID_ERROR
} from './validationErrors';

export const REQUIRED_FIELD_VALIDATION = Yup.string().required(FIELD_REQUIRED_ERROR).trim(FIELD_REQUIRED_ERROR);

export const REQUIRED_FIELD_MIXED_VALIDATION = Yup.mixed().required(FIELD_REQUIRED_ERROR);

export const PASSWORD_FIELD_VALIDATION = Yup.string()
  .required(FIELD_REQUIRED_ERROR)
  .trim(FIELD_REQUIRED_ERROR)
  .test('Password length', FIELD_MIN_LENGTH_ERROR.replace('[NUMBER]', '6'), (val) => !!val && val.length >= 6);

export const EMAIL_PHONE_FIELD_VALIDATION = Yup.string()
  .required(FIELD_REQUIRED_ERROR)
  .trim(FIELD_REQUIRED_ERROR)
  .test('Email/Phone', FIELD_EMAIL_PHONE_ERROR, (val) => {
    if (!val) {
      return false;
    }

    const isValidEmail = Yup.string().email().isValidSync(val);
    const isValidPhone = isValidMobilePhone(val);

    if (!isValidEmail && !isValidPhone) {
      return false;
    }

    return true;
  });

export const PHONE_FIELD_VALIDATION = REQUIRED_FIELD_VALIDATION.test('Phone', FIELD_PHONE_ERROR, (val) =>
  isValidMobilePhone(val)
);

export const EMAIL_FIELD_VALIDATION = REQUIRED_FIELD_VALIDATION.test('Email', FIELD_EMAIL_ERROR, (val) =>
  Yup.string().email().isValidSync(val)
);

export const ADDRESS_FIELD_VALIDATION = Yup.object().shape({
  address: REQUIRED_FIELD_VALIDATION,
  coordinates: Yup.object().shape({
    latitude: REQUIRED_FIELD_MIXED_VALIDATION,
    longitude: REQUIRED_FIELD_MIXED_VALIDATION
  })
});

export const RICH_INPUT_FIELD_VALIDATION = Yup.object().test(
  'RichInput has content',
  FIELD_REQUIRED_ERROR,
  (val: any) => {
    return val.getCurrentContent().hasText();
  }
);

export const getFilesFieldValidation = (minAmount: number, entityOnOne = 'file', entityOnMany = 'files') => {
  const errorToShow = FIELD_FILES_ERROR.replace('[NUMBER]', String(minAmount)).replace(
    '[ENTITY]',
    minAmount === 1 ? entityOnOne : entityOnMany
  );

  return Yup.array().min(minAmount, errorToShow);
};

export const CODE_INPUT_FIELD_VALIDATION = Yup.string()
  .required(FIELD_CODE_INVALID_ERROR)
  .trim(FIELD_CODE_INVALID_ERROR)
  .min(6, FIELD_CODE_INVALID_ERROR);
