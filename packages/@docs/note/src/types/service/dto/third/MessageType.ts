import { Ref } from "vue";

export interface MessageType {
  message?: Ref<string>;
  updateMessage?: any;
  remark?: Ref<string>;
}
