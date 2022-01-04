import { SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';

export const SHOW_SELECT_OPTIONS: SortByPopupOption[] = [
  { text: 'All states', value: 'all' },
  { text: 'Archived', value: 'archived' },
  { text: 'Overdue', value: 'overdue' },
  { text: 'High priority', value: 'priority' }
];

export const AMPLUA_SELECT_OPTIONS: SortByPopupOption[] = [
  { text: 'All amplua', value: 'All amplua' },
  { text: 'Gardener', value: 'Gardener' },
  { text: 'Batler Albert', value: 'Batler Albert' },
  { text: 'Builder', value: 'Builder' },
  { text: 'Cook', value: 'Cook' },
  { text: 'Driver', value: 'Driver' },
  { text: 'Teacher ', value: 'Teacher ' }
];

export const CREATED_BY_SELECT_OPTIONS: SortByPopupOption[] = [
  { text: 'No matter', value: 'No matter' },
  { text: 'Admins', value: 'Admins' },
  { text: 'Batler Albert', value: 'Batler Albert' },
  { text: 'Name', value: 'Name' },
  { text: 'Guest', value: 'Guest' }
];
