import { DefineComponent, UnwrapNestedRefs, UnwrapRef } from 'vue';

export let VFormWrapper: DefineComponent<FormWrapperProps | UnwrapRef<FormWrapperProps> | UnwrapNestedRefs<FormWrapperProps>>;

export type FormWrapperProps = {
  name?: string;
};
