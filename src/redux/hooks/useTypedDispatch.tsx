import { useDispatch } from 'react-redux';

import { ReduxDispatch } from 'redux/store';

export const useTypedDispatch = () => useDispatch<ReduxDispatch>();
