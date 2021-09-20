import { IRouteComponentProps } from 'umi';
import { pathToRegexp } from 'path-to-regexp';

type IRoute = IRouteComponentProps['route'];

export default function findRoute(
  pathname: string,
  routes: Array<IRoute> = [],
): IRoute | null {
  for (const route of routes) {
    const { path } = route;
    if (path === pathname) {
      return route;
    }
    if (pathToRegexp(`${path}/(.*)`).test(pathname)) {
      const value = findRoute(pathname, route.routes);
      if (value) {
        return value;
      }
    }
    continue;
  }
  return null;
}
