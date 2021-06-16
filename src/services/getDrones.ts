import { AxiosResponse } from "axios";
import instance from "./instance";
import { QueryObject } from "@/types/filterQuery";

export const getDronesFull = async (): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = instance.get("/");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getDrones = async (page: string): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = instance.get(`?_page=${page}&_limit=20`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const equalOrGreaterThanOne = (value: string): boolean => {
  return value.length >= 1;
};

export const filterDrones = async (filter: QueryObject): Promise<AxiosResponse<any> | undefined> => {
  let queryString = "";
  if (filter.id && equalOrGreaterThanOne(filter.id)) queryString += `id=${filter.id}`;
  if (filter.fly && equalOrGreaterThanOne(filter.fly)) queryString += `fly=${filter.fly}`;
  if (filter.name && equalOrGreaterThanOne(filter.name)) queryString += `name=${filter.name}`;
  if (filter.status && equalOrGreaterThanOne(filter.status)) queryString += `status=${filter.status}`;

  try {
    const response = instance.get(`?${queryString}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
