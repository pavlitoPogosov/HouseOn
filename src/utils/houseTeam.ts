import { IntlShape } from 'react-intl';

import { TeamMemberAmpluaList } from 'variables/teamMemberAmpluaList';

export const getAmpluaName = (amplua: string, intl: IntlShape) => {
  const teamMemberAmplua = TeamMemberAmpluaList.find(({ value }) => value === amplua);
  if (teamMemberAmplua) {
    return intl.formatMessage({ defaultMessage: teamMemberAmplua.text, id: teamMemberAmplua.value });
  }
  return 'Not Set';
};
