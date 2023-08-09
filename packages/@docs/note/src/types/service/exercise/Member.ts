export interface Member {
  id?: Id;
  name?: Name;
  age?: Age;
  email?: EMail;
  remark?: any;
}

export interface StandardMember extends Member {
  tel?: TelePhone;
}

export type Id = number;
export type Name = string;
export type Age = number;
export type EMail = string;
export type TelePhone = string;
