import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';

const uploadFile = async (params: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', params);
  const res = await privateAxiosClient.postForm('/file/upload', formData);
  return `https://api.sweepstakes.market/${res.data.data.source}`;
};

export const fileService = {
  uploadFile,
};
