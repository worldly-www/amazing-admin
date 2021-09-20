import { IRoute } from 'umi';
import { pathToRegexp } from 'path-to-regexp';

export function getMatchMenuData(
  pathname: string,
  menuData: Array<IRoute> = [],
) {
  return menuData.filter(({ path }) => {
    return pathname === path || pathToRegexp(`${path}/(.*)`).test(pathname);
  });
}

export default getMatchMenuData;
