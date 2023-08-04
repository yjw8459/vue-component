import { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';

export declare let VButton: DefineComponent<ButtonProps | UnwrapRef<ButtonProps> | UnwrapNestedRefs<ButtonProps>>;

export interface ButtonProps {
  title?: string;
  value?: ButtonValue;
}

export type ButtonValue = any;

export type ButtonClickEvent = (event: any, value?: ButtonValue) => void;
