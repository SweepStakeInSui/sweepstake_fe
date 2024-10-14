export const mockNotifications = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg',
    },
    type: 'comment',
    timestamp: '2023-05-10T10:00:00Z',
    isRead: false,
    content:
      'A movie about the redemptive power of acting and art, featuring several formerly incarcerated participants from the rehabilitation program. This feels as close to a lock for a nomination as is possible this early on.',
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg',
    },
    type: 'like',
    timestamp: '2023-05-10T10:05:00Z',
    isRead: false,
    content:
      'A movie about the redemptive power of acting and art, featuring several formerly incarcerated participants from the rehabilitation program. This feels as close to a lock for a nomination as is possible this early on.',
  },
  {
    id: '3',
    user: {
      name: 'Bob Johnson',
      avatar: 'https://example.com/avatar3.jpg',
    },
    type: 'comment',
    timestamp: '2023-05-10T10:10:00Z',
    isRead: true,
    content:
      'A movie about the redemptive power of acting and art, featuring several formerly incarcerated participants from the rehabilitation program. This feels as close to a lock for a nomination as is possible this early on.',
  },
  {
    id: '4',
    user: {
      name: 'Alice Johnson',
      avatar: 'https://example.com/avatar4.jpg',
    },
    type: 'betYes',
    timestamp: '2023-05-10T10:10:00Z',
    isRead: false,
  },
  {
    id: '5',
    user: {
      name: 'Alice Johnson',
      avatar: 'https://example.com/avatar4.jpg',
    },
    type: 'betNo',
    timestamp: '2023-05-10T10:10:00Z',
    isRead: false,
  },
];
