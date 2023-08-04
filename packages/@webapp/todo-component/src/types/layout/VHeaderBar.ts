import type { DefineComponent, UnwrapRef, UnwrapNestedRefs } from 'vue';

export declare let VHeaderBar: DefineComponent<HeaderBarProps | UnwrapRef<HeaderBarProps> | UnwrapNestedRefs<HeaderBarProps>>;

export type HeaderBarProps = {
  title?: string;
  elevation?: HeaderElevation;
  items?: HeaderItems;
};

export type HeaderElevation = number;

export type HeaderItem = {
  itemTitle: HeaderItemTitle;
  // refData?: HeaderReference;
  // clickEvent?: HeaderClickEvent;
};

export type HeaderItemTitle = string;

export type HeaderItems = Array<HeaderItem>;

export type HeaderClickEvent = (event: Event, value: any) => void;

export type HeaderReference = UnwrapRef<string> | UnwrapNestedRefs<string>;
