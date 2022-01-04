import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { ReduxRootState } from 'redux/store';

export const useTypedSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;
