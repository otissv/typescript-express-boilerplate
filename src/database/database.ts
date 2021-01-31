export const data = [
  { id: '1', username: 'user_1', status: 'online' },
  { id: '2', username: 'user_2', status: 'online' },
  { id: '3', username: 'user_3', status: 'online' },
  { id: '4', username: 'user_4', status: 'offline' },
  { id: '5', username: 'user_5', status: 'offline' },
  { id: '6', username: 'user_6', status: 'offline' },
];

export function database(): {
  readonly users: () => Record<string, any>;
} {
  return {
    users: () => data,
  };
}
