import type { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';
export let VTextField: DefineComponent<TextFieldProps | UnwrapRef<TextFieldProps> | UnwrapNestedRefs<TextFieldProps>>;

export type TextFieldProps = {
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  rules?: string;
  label?: string;
  message?: string;
};

export type TextFieldChangeEvent = (event: any, value: any) => void;
