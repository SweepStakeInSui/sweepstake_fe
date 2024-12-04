export enum EBetType {
  BUY = 'Buy',
  SELL = 'Sell',
  WITHDRAW = 'Withdraw',
  TRANSFER = 'Transfer',
  DEPOSIT = 'Deposit',
  CREATE_BET = 'Create bet',
}

export enum EBetStatusOption {
  BID = 'Bid',
  ASK = 'Ask',
}

export enum BetOutcomeType {
  YES = 'Yes',
  NO = 'No',
}

export enum EOrderType {
  FOK = 'FOK',
  IOC = 'IOC',
  GTC = 'GTC',
}

export enum EBetOpenStatus {
  OPEN = 'Open',
  CLOSED = 'Outcome:',
  UPCOMING = 'Upcoming',
}
