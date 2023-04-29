export const convertDateStringToDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
};
