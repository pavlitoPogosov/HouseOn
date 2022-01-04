import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Location } from 'history';

import { getParentUrl } from '@proscom/ui-utils';
import { AppHistoryType, LocationState } from 'utils/createAppHistory';

function getParentLocation(location: Location<LocationState>) {
  return getParentUrl(location.pathname);
}

/**
 * HOC для того, чтобы запретить открытие маршрута не из приложения.
 * Проверяет глубину переходов, чтобы она была не меньше переданного значения.
 * Если она меньше, то выполняет переход на родительскую страницу с сохранением
 * параметров адресной строки.
 *
 * Полезно, если внутри компонента Component используется history.goAndReplace.
 * Например, для внутренних технических страниц, вроде фильтров и модальных окон.
 *
 * Рекомендуется использовать MinDepth при конфигурации роутинга в routes/index.ts,
 * аналогично DefaultLayout.
 *
 * @param Component - компонент, который надо обернуть
 * @param minDepth - минимальная глубина переходов
 * @param getParent - функция определения адреса родительской страницы
 */
export function MinDepth<T extends React.ElementType>(Component: T, minDepth: number, getParent = getParentLocation) {
  return function ComponentWithMinDepth(props: React.ComponentProps<T>): React.ReactElement | null {
    const location = useLocation<LocationState>();
    const history = useHistory() as AppHistoryType;
    const depth = location.state?.depth ?? 0;
    const shouldRedirect = !(depth >= minDepth);

    useEffect(() => {
      if (shouldRedirect) {
        history.replaceWithQuery(getParent(location));
      }
    }, [history, location, shouldRedirect]);

    if (shouldRedirect) {
      return null;
    }

    return <Component {...props} />;
  };
}
