export type TCreateBetData = {
  thumbnail: File;
  title: string;
  startTime: number;
  endTime: number;
  categories: string[];
  betType: string;
  outcomes: IOutcomeData[];
  rule: string;
  about: string;
  sources: ISourceData[];
};

export type IOutcomeData = {
  outcome: string;
  subOutcome: string;
  picture?: File;
};

export type ISourceData = {
  title: string;
  url: string;
};

export type TCrateBetFormData = {
  startDate: Date;
  startClock: Date;
  endDate: Date;
  endClock: Date;
} & TCreateBetData;

export interface IFormattedCreateBetData
  extends Omit<TCrateBetFormData, 'categories'> {
  categories: TOption[];
}
