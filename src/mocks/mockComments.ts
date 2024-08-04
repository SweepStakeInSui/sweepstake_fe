export const mockNestedComments = [
  {
    id: '1',
    author: 'Alice',
    content: 'This sweepstake is so exciting!',
    likeCount: 5,
    timestamp: '2023-05-10T10:30:00Z',
    replies: [
      {
        id: '2',
        author: 'Bob',
        content: 'I agree! What prize are you hoping to win?',
        likeCount: 5,
        timestamp: '2023-05-10T10:35:00Z',
        replies: [
          {
            id: '3',
            author: 'Alice',
            content: "I'm really hoping for the grand prize vacation!",
            likeCount: 5,
            timestamp: '2023-05-10T10:40:00Z',
          },
          {
            id: '4',
            author: 'Charlie',
            content: 'The vacation would be amazing. Good luck to everyone!',
            likeCount: 5,
            timestamp: '2023-05-10T10:45:00Z',
          },
        ],
      },
      {
        id: '5',
        author: 'David',
        content: 'How many entries is everyone submitting?',
        likeCount: 5,
        timestamp: '2023-05-10T11:00:00Z',
        replies: [
          {
            id: '6',
            author: 'Eve',
            content: "I'm going all in with the maximum allowed!",
            likeCount: 5,
            timestamp: '2023-05-10T11:05:00Z',
          },
        ],
      },
    ],
  },
  {
    id: '7',
    author: 'Frank',
    content: 'Does anyone know when the winners will be announced?',
    likeCount: 5,
    timestamp: '2023-05-10T12:00:00Z',
    replies: [
      {
        id: '8',
        author: 'Grace',
        content: 'The announcement is scheduled for next Friday at 3 PM.',
        likeCount: 5,
        timestamp: '2023-05-10T12:10:00Z',
        replies: [
          {
            id: '9',
            author: 'Frank',
            content: "Thanks for the info! I'll mark my calendar.",
            likeCount: 5,
            timestamp: '2023-05-10T12:15:00Z',
          },
        ],
      },
    ],
  },
];
