import request from '@/utils/httpRequest';
// examples
const searchCollectionService = async (
  chainId: string | string[],
  data: string,
) => {
  try {
    const res = await request.get(
      `search-collection?chainId=${chainId}&search=${data}`,
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export { searchCollectionService };
