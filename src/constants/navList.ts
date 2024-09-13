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
    slug: 'watchlist',
    title: 'Watch List',
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
    slug: 'disconnect',
    title: 'Disconnect',
    icon: '/icons/Disconnect.svg',
    onClick: onDisconnect,
  },
];
