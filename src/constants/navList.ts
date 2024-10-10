export const navList = [
  {
    name: 'Markets',
    icon: '/icons/Market.svg',
    href: '/markets',
  },
  {
    name: 'Activity',
    icon: '/icons/timeline.svg',
    href: '/activity',
  },
  {
    name: 'Leaderboard',
    icon: '/icons/bar_chart.svg',
    href: '/leaderboard',
  },
];
export const menuListLogin = (onDisconnect: () => void) => [
  {
    slug: 'profile',
    title: 'Account',
    icon: '/icons/mood.svg',
  },
  {
    slug: 'my-bets',
    title: 'My Bets',
    icon: '/icons/my_bet.svg',
  },
  {
    slug: 'watchlist',
    title: 'Watchlist',
    icon: '/icons/star_outline.svg',
  },
  {
    slug: 'leaderboard',
    title: 'Leaderboard',
    icon: '/icons/leaderboard.svg',
  },
  {
    slug: 'activity',
    title: 'My Activity',
    icon: '/icons/timeline.svg',
  },
  {
    slug: 'darkTheme',
    title: 'Dark Theme',
    icon: '/icons/Theme.svg',
    close: true,
  },
  {
    slug: 'disconnect',
    title: 'Disconnect',
    icon: '/icons/Disconnect.svg',
    onClick: onDisconnect,
  },
];

export const CONSTANT_ROUTES = {
  HOME: '/',
  MARKETS: '/markets',
  CREATE_BET: '/create-bet',
  PROFILE: '/profile',
  WATCHLIST: '/watchlist',
  LEADERBOARD: '/leaderboard',
  ACTIVITY: '/activity',
};
