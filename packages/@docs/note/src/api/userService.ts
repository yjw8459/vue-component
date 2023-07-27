import axios, { AxiosPromise } from "axios";
import { User } from "@/types/service/dto/user";

export const getUsers: Function = (): AxiosPromise<Array<User>> => {
  return axios.get(
    "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json"
  );
};

export const createUser: Function = (param: {
  id: string;
}): AxiosPromise<User> => {
  return axios.post("", param);
};

export const updateUser: Function = (params: User): AxiosPromise<User> => {
  return axios.put("", params);
};

export const deleteUser: Function = (id: string): AxiosPromise<User> => {
  return axios.post("" + id);
};
