export enum ESettingsFormFieldsTypes {
  ABOUT = 'about',
  CHECKLIST = 'checklist',
  FILES = 'files',
  HIGH_PRIORITY = 'high_priority',
  HOUSE_DATA = 'house_data',
  MEMBER = 'member'
}

export type TSettingsFormFields = {
  [field in ESettingsFormFieldsTypes]: any;
};
