import { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';

export declare let PanelBar: DefineComponent<PanelBarProps | UnwrapRef<PanelBarProps> | UnwrapNestedRefs<PanelBarProps>>;

export interface PanelBarProps {
  title?: PanelBarTitle;
}

export type PanelBarTitle = string;
