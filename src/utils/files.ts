import { TChatFile } from 'routes/chat/types';

export const getFileExtension = (filename: string) => {
  return (filename.match(/\.([\da-z]+)(?:[#?]|$)/i) || [])[1] || '';
};

export const checkIsFile = (file: TChatFile) => 'File' in window && file instanceof File;
