import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';

export interface ICategoryList extends BaseEntity {
  name: string;
}
const getCategory = async (): Promise<ICategoryList[]> => {
  const response = await publicAxiosClient.get(`/category`);
  return response.data.data;
};
const getCategoryById = async (id: string) => {
  const response = await publicAxiosClient.get(`/category/${id}`);
  return response.data.data;
};
export const categoryService = {
  getCategory,
  getCategoryById,
};
