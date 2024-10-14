function formatDateFromTimestamp(timestamp: number) {
  // Convert timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date (m/d/y) using toLocaleDateString
  return date.toLocaleDateString('en-US');
}
export const formatDate = {
  formatDateFromTimestamp,
};
