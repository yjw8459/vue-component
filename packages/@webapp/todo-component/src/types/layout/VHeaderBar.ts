import type { DefineComponent, UnwrapRef, UnwrapNestedRefs } from 'vue';

export declare let VHeaderBar: DefineComponent<VHeaderBarProps | UnwrapRef<VHeaderBarProps> | UnwrapNestedRefs<VHeaderBarProps>>;

export type VHeaderBarProps = {
  title?: string;
  elevation?: HeaderElevation;
  items?: HeaderItems;
};

export type HeaderElevation = number;

export type HeaderItem = {
  itemTitle: VHeaderItemTitle;
  // refData?: HeaderReference;
  // clickEvent?: HeaderClickEvent;
};

export type VHeaderItemTitle = string;

export type HeaderItems = Array<HeaderItem>;

export type HeaderClickEvent = (event: Event, value: any) => void;

export type HeaderReference = UnwrapRef<string> | UnwrapNestedRefs<string>;
