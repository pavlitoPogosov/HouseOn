import React from 'react';
import { Route, Switch, match as Match, RouteProps } from 'react-router-dom';

import { Location } from 'history';

import { cleanObject } from '@proscom/ui-utils';

export interface RouteType extends RouteProps {
  path?: string | string[];
}

export interface RoutesCompProps {
  location?: Location;
  match?: Match;
}

export function Routes(routes: RouteType[]) {
  return function RoutesComp({ location, match }: RoutesCompProps) {
    const pathPrefix = match?.path || '';

    return (
      <Switch {...cleanObject({ location })}>
        {routes.map((props, i) => {
          const path = props.path
            ? Array.isArray(props.path)
              ? props.path.map((p) => `${pathPrefix}${p}`)
              : `${pathPrefix}${props.path}`
            : undefined;

          const newProps = cleanObject({
            ...props,
            path
          });

          return <Route key={i} {...newProps} />;
        })}
      </Switch>
    );
  };
}
