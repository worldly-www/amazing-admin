export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface MenuDataItem {
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
}