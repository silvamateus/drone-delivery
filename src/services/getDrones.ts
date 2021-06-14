import { AxiosResponse } from "axios";
import instance from "./instance";

export const getDrones = async (page: string): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = instance.get(`?_page=${page}&_limit=20`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const filterDrones = async (filter: string): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = instance.get(`?${filter}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
