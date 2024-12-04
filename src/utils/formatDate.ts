import { formatDistanceToNow } from 'date-fns';

function formatDateFromTimestamp(timestamp: number) {
  // Convert timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date (m/d/y) using toLocaleDateString
  return date.toLocaleDateString('en-US');
}
const formatTimeAgo = (timeStamp: number): string => {
  // Ex:71238812-> 2m ago
  return formatDistanceToNow(new Date(timeStamp * 1000), { addSuffix: true });
};
export const formatDate = {
  formatDateFromTimestamp,
  formatTimeAgo,
};
