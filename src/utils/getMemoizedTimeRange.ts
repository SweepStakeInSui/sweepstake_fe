export const getMemoizedTimeRange = (view: FilterTimes) => {
  const endTime = new Date();
  const startTime = new Date();

  switch (view) {
    case '1d':
      startTime.setDate(endTime.getDate() - 1);
      break;
    case '1w':
      startTime.setDate(endTime.getDate() - 7);
      break;
    case '1m':
      startTime.setMonth(endTime.getMonth() - 1);
      break;
    case '1y':
      startTime.setFullYear(endTime.getFullYear() - 1);
      break;
    default:
      startTime.setFullYear(endTime.getFullYear() - 5);
      break;
  }

  return {
    start: startTime.getTime(),
    end: endTime.getTime(),
  };
};
