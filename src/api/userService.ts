import axios, { AxiosPromise } from "axios";
import User from "@/types/service/dto/user";

export const getUsers = (): AxiosPromise<Array<User>> => {
  return axios.get(
    "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json"
  );
};
