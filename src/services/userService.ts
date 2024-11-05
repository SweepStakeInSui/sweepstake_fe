import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type { RequestDepositSchemaType } from '@/modules/Deposit/components/Balance/schema/requestDepositSchema';
import type { WithdrawSchemaType } from '@/modules/Deposit/components/Portfolio/schema/withdrawSchema';
import type { ProfileTypes } from '@/types/profile';
import type { PositionsProps } from '@/types/table';

interface DepositParams {
  txBytes: string;
  signature: string[];
}
interface TRequestDepositResponseData {
  signature: string;
  txBytes: string;
}
interface TRequestDepositResponse {
  statusCode: number;
  data: TRequestDepositResponseData;
}

interface WithdrawRespone {
  statusCode: number;
  data: {};
}
interface UpdateProfileParams {
  username: string;
  avatar: string;
}
export interface TransactionHistoryParams extends PaginationType {
  type?: string;
}
export interface ITransactionHistory extends BaseEntity {
  amount: string;
  status: string;
  timestamp: number;
  transactionHash: string;
  type: string;
}
const getUserInfor = async (): Promise<ProfileTypes> => {
  const response = await privateAxiosClient.get(`/user/profile`);
  return response.data.data;
};
const updateProfile = async (
  body: UpdateProfileParams,
): Promise<ProfileTypes> => {
  const response = await privateAxiosClient.post(`/user/profile`, body);
  return response.data.data;
};
const deposit = async (body: DepositParams) => {
  const response = await privateAxiosClient.post(`/user/deposit`, body);
  return response.data;
};
const requestDeposit = async (
  body: RequestDepositSchemaType,
): Promise<TRequestDepositResponse> => {
  const response = await privateAxiosClient.post(`/user/request-deposit`, body);
  return response.data;
};
const withdraw = async (body: WithdrawSchemaType): Promise<WithdrawRespone> => {
  const response = await privateAxiosClient.post(`/user/withdraw`, body);
  return response.data;
};
const transactionHistory = async (params: TransactionHistoryParams) => {
  const response = await privateAxiosClient.get(`/user/transaction-history`, {
    params,
  });
  return response.data.data;
};
const positions = async (params: PaginationType): Promise<PositionsProps> => {
  const response = await privateAxiosClient.get(`/user/positions`, {
    params,
  });
  return response.data.data;
};
export const UserService = {
  getUserInfor,
  updateProfile,
  deposit,
  withdraw,
  requestDeposit,
  transactionHistory,
  positions,
};
