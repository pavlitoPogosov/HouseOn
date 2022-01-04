const EXCLUDED_SYMBOLS = ['(', ')', '-', ' '];

export const getPhoneWithoutMask = (phone: string) => {
  return phone
    .split('')
    .filter((l) => !EXCLUDED_SYMBOLS.includes(l))
    .join('');
};
