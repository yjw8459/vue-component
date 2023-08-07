import type { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';
export let VInput: DefineComponent<InputProps | UnwrapRef<InputProps> | UnwrapNestedRefs<InputProps>>;

export type InputProps = {
  value?: string;
  name?: string;
  class?: string;
  id?: string;
  disabled?: boolean;
};

export type InputChangeEvent = (event: Event, value: any) => void;
