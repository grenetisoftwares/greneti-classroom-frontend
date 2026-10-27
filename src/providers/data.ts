import { MOCK_SUBJECTS } from "@/constants/subjects";
import { BaseRecord, DataProvider, GetListParams } from "@refinedev/core";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams) => {
    if (resource !== "subjects") {
      return { data: [], total: 0 };
    }

    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },
  getOne: async () => {
    throw new Error("This function is not present in mock data");
  },
  create: async () => {
    throw new Error("This function is not present in mock data");
  },
  update: async () => {
    throw new Error("This function is not present in mock data");
  },
  deleteOne: async () => {
    throw new Error("This function is not present in mock data");
  },

  getApiUrl: () => "",
};