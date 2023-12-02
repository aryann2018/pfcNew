export function getDaysUntilEndDate(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - now.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.ceil(differenceInDays);
}
