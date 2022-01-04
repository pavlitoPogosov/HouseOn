export const normalizeString = (str: string) => str?.trim().toLowerCase();

export const trimStringLine = (value: string | undefined, maxLetters: number) => {
  return value && value.length <= maxLetters ? value : value?.slice(0, maxLetters) + '...';
};
