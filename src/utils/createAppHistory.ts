import { createBrowserHistory, Location, LocationDescriptorObject } from 'history';
import { parse as qsParseQuery, stringify as stringifyQuery } from 'query-string';
import { parse as parseUrl } from 'url';

import { getParentUrl } from '@proscom/ui-utils';

export type LocationState = { depth?: number };
export type UrlOrLocation = string | LocationDescriptorObject<LocationState>;

function parseQuery(query: string | null | undefined) {
  return qsParseQuery(query as any);
}

function increaseDepth<T extends { depth?: number }>(state?: T): T {
  if (!state) {
    return {
      depth: 1
    } as T;
  }
  return {
    ...state,
    depth: (state.depth || 0) + 1
  } as T;
}

function getDepth(location: Location<LocationState>): number {
  return location.state?.depth || 0;
}

/**
 * Создает расширенную history с автоматическим расчетом глубины переходов
 * и дополнительными полезными функциями
 *
 * @param onChange - колбек, который вызывается при переходах между
 *  историей. Полезен для синхронизации с мобильным приложением
 */
export function createAppHistory(
  onChange: ((params: { location: Location; depth: number }) => any) | undefined = undefined
) {
  const baseHistory = createBrowserHistory<LocationState>();

  if (onChange) {
    baseHistory.listen((location: Location<LocationState>) => {
      onChange({
        location,
        depth: getDepth(location)
      });
    });
  }

  /**
   * Получить текущий location
   */
  function getLocation() {
    return baseHistory.location;
  }

  /**
   * Получить родительскую страницу, отрезав самую правую часть ссылки
   */
  function resolveParentUrl() {
    return getParentUrl(getLocation().pathname);
  }

  /**
   * Перейти к предыдущей странице, если пользователь попал на неё из приложения,
   * либо перейти к родительской странице
   *
   * @param parent - родительская страница. Если не передана, то определяется
   *  автоматически с помощью resolveParentUrl
   */
  function goBack(parent: null | UrlOrLocation = null) {
    const curLocation = getLocation();
    const appDepth = getDepth(curLocation);
    if (appDepth > 0) {
      baseHistory.goBack();
    } else {
      let url = parent;
      if (url === null) {
        url = resolveParentUrl();
      }

      if (typeof url === 'string') {
        const parsed = parseUrl(url);
        baseHistory.replace({
          state: curLocation.state,
          pathname: parsed.pathname ?? undefined,
          search: parsed.search ?? undefined,
          hash: parsed.hash ?? undefined
        });
      } else {
        baseHistory.replace({
          state: curLocation.state,
          ...url
        });
      }
    }
  }

  function canGoBack() {
    const curLocation = getLocation();

    return !!getDepth(curLocation);
  }

  /**
   * Создает новую запись в истории с измененным state, увеличиая глубину переходов
   *
   * @param state - изменения state (старый state сохраняется)
   */
  function pushState(state: LocationState) {
    const curLocation = getLocation();
    baseHistory.push({
      state: {
        ...increaseDepth(curLocation.state),
        ...(state || {})
      }
    });
  }

  /**
   * Выполняет переход по заданному адресу, увеличивая глубину переходов,
   * и добавляет новую запись в историю.
   * Используется только для внутренних переходов без перезагрузки страницы.
   *
   * @param location - адрес, куда выполнять перейти
   * @param newState - новый стейт (будет слит с предыдущим)
   */
  function push(location: UrlOrLocation, newState?: LocationState) {
    const curLocation = getLocation();
    const state = increaseDepth(curLocation.state);
    if (typeof location === 'string') {
      const parsed = parseUrl(location);
      baseHistory.push({
        state: {
          ...state,
          ...newState
        },
        pathname: parsed.pathname ?? undefined,
        search: parsed.search ?? undefined,
        hash: parsed.hash ?? undefined
      });
    } else {
      baseHistory.push({
        state: {
          ...state,
          ...location.state,
          ...newState
        },
        ...location
      });
    }
  }

  /**
   * Выполняет переход по заданному адресу, не увеличивая глубину переходов
   * и не добавляя новую запись в историю.
   * Используется только для внутренних переходов без перезагрузки страницы.
   *
   * @param location - адрес, куда выполнять переход
   * @param newState - новый стейт (будет слит с предыдущим)
   */
  function replace(location: UrlOrLocation, newState?: LocationState) {
    const curLocation = getLocation();
    const state = { ...curLocation.state };
    if (typeof location === 'string') {
      const parsed = parseUrl(location);
      baseHistory.replace({
        state: {
          ...state,
          ...newState
        },
        pathname: parsed.pathname ?? undefined,
        search: parsed.search ?? undefined,
        hash: parsed.hash ?? undefined
      });
    } else {
      baseHistory.replace({
        ...location,
        state: {
          ...state,
          ...location.state,
          ...newState
        },
        pathname: location.pathname || curLocation.pathname
      });
    }
  }

  /**
   * Выполняет переход по заданному адресу с сохранением query-параметров,
   * добавляет новую запись в историю, увеличивает глубину переходов
   *
   * @param location - адрес, куда выполнять переход
   */
  function pushWithQuery(location: UrlOrLocation) {
    const curLocation = getLocation();
    const state = increaseDepth(curLocation.state);
    const oldQuery = parseQuery(curLocation.search);
    if (typeof location === 'string') {
      const parsed = parseUrl(location);
      const newQuery = parseQuery(parsed.search);
      push({
        pathname: location,
        search: stringifyQuery({
          ...oldQuery,
          ...newQuery
        }),
        state: state,
        hash: parsed.hash ?? undefined
      });
    } else {
      const newQuery = parseQuery(location.search);
      push({
        ...location,
        search: stringifyQuery({
          ...oldQuery,
          ...newQuery
        }),
        state: {
          ...state,
          ...location.state
        }
      });
    }
  }

  /**
   * Выполняет переход по заданному адресу с сохранением query-параметров,
   * заменяет текущую запись в истории, не увеличивает глубину переходов
   *
   * @param location - адрес, куда выполнять переход
   */
  function replaceWithQuery(location: UrlOrLocation) {
    const curLocation = getLocation();
    const state = curLocation.state;
    const oldQuery = parseQuery(curLocation.search);
    if (typeof location === 'string') {
      const parsed = parseUrl(location);
      const newQuery = parseQuery(parsed.search);
      replace({
        pathname: location,
        search: stringifyQuery({
          ...oldQuery,
          ...newQuery
        }),
        state: state,
        hash: parsed.hash ?? undefined
      });
    } else {
      const newQuery = parseQuery(location.search);
      replace({
        ...location,
        search: stringifyQuery({
          ...oldQuery,
          ...newQuery
        }),
        state: {
          ...state,
          ...location.state
        }
      });
    }
  }

  /**
   * Переходит к заданному месту в истории и заменяет эту запись.
   * Не увеличивает глубину переходов.
   *
   * @param replacement - адрес для замены
   * @param shift - сдвиг для перехода (-1 для перехода на одну страницу назад)
   *  по-умолчанию переходит на предыдущую страницу
   */
  function goAndReplace(replacement: UrlOrLocation, shift: number = -1) {
    const curLocation = getLocation();
    const appDepth = getDepth(curLocation);

    // Если не задан адрес для замены и история не позволяет его достать,
    // то вычисляем родителя автоматически
    const fixedReplacement =
      typeof replacement === 'string' || appDepth >= -shift || replacement.pathname
        ? replacement
        : {
            ...replacement,
            pathname: getParentUrl(curLocation.pathname, -shift)
          };

    if (appDepth > 0) {
      const unlisten = baseHistory.listen((location, action) => {
        if (action === 'POP') {
          unlisten();
          replace(fixedReplacement);
        }
      });

      // Переходим назад настолько далеко, насколько можем
      baseHistory.go(-Math.min(appDepth, -shift));
    } else {
      replace(fixedReplacement);
    }
  }

  /**
   * Переходит к заданному месту в истории и заменяет эту запись с сохранением
   * query-параметров. Не увеличивает глубину переходов.
   *
   * @param replacement - адрес для замены
   * @param shift - сдвиг для перехода (-1 для перехода на одну страницу назад)
   *  по-умолчанию переходит на предыдущую страницу
   */
  function goAndReplaceWithQuery(replacement?: UrlOrLocation, shift: number = -1) {
    const curLocation = getLocation();
    const oldQuery = parseQuery(curLocation.search);
    if (typeof replacement === 'string') {
      const parsed = parseUrl(replacement);
      const newQuery = parseQuery(parsed.search);
      goAndReplace(
        {
          pathname: parsed.pathname ?? undefined,
          hash: parsed.hash ?? undefined,
          search: stringifyQuery({
            ...oldQuery,
            ...newQuery
          })
        },
        shift
      );
    } else {
      const newQuery = parseQuery(replacement?.search);
      goAndReplace(
        {
          ...replacement,
          search: stringifyQuery({
            ...oldQuery,
            ...newQuery
          })
        },
        shift
      );
    }
  }

  return {
    ...baseHistory,
    goBack,
    goAndReplace,
    goAndReplaceWithQuery,
    push,
    pushWithQuery,
    replace,
    replaceWithQuery,
    getLocation,
    pushState,
    canGoBack
  };
}

export type AppHistoryType = ReturnType<typeof createAppHistory>;
