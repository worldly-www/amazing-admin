import { pathToRegexp } from 'path-to-regexp';
import { Route } from '../types';

export function getMatchMenuData (pathname: string, menuData: Array<Route> = []) {
  return menuData.filter(({ path }) => {
    return pathname === path || pathToRegexp(`${path}/(.*)`).test(pathname)
  });
}

export default getMatchMenuData;