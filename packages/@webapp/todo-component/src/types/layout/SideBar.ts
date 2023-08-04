import type { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';

export declare let SideBar: DefineComponent<SideBarProps | UnwrapRef<SideBarProps> | UnwrapNestedRefs<SideBarProps>>;

export type SideBarProps = {
  expandMode?: SideBarExpandMode;
  items?: SideBarItems;
};

export type SideBarExpandMode = 'single' | 'multi';

export type SideBarItem = {
  items?: SideBarItems;
  title?: string;
  content?: any;
};

export type SideBarItems = Array<SideBarItem>;

export type SideBarTitle = string;
