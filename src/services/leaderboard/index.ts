import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import type { TLeaderBoard } from '@/services/leaderboard/types';

interface LeaderBoardParams extends PaginationType {
  period: string;
}
const getLeaderboardVolume = async (
  params: LeaderBoardParams,
): Promise<TLeaderBoard> => {
  const response = await publicAxiosClient.get(`/leaderboard/volume`, {
    params,
  });
  return response.data;
};

const getLeaderboardProfit = async (
  params: LeaderBoardParams,
): Promise<TLeaderBoard> => {
  const response = await publicAxiosClient.get(`/leaderboard/profit`, {
    params,
  });
  return response.data;
};

export const LeaderboardServices = {
  getLeaderboardVolume,
  getLeaderboardProfit,
};
