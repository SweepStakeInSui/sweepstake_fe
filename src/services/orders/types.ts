export interface IPostOrderRequest {
  outcomeId: string;
  amount: string;
  price?: string;
  type: string;
  side: string;
  slippage?: string;
  signature: string;
}

export type TPostOrderResponse = {
  statusCode: number;
  data: any;
  meta: ResponseMeta;
};
