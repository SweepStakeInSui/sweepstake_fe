export type TCreateBetData = {
  title: string;
  startTime: number;
  endTime: number;
  categories: string[];
  betType: string;
  outcomes: IOutcomeData[];
  rule: string;
  about: string;
  sources: string;
};

export type IOutcomeData = {
  label: string;
  subLabel: string;
  picture?: string;
};
