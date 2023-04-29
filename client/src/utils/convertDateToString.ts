export const dateToStringAlgorithm = (dateObj = new Date() as Date) => {
  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = dateObj.toLocaleString("en-US", options);
  return formattedDate;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const suffixes = ["th", "st", "nd", "rd"];
  let suffix = suffixes[0];
  if (dayOfMonth < 11 || dayOfMonth > 13) {
    suffix = suffixes[dayOfMonth % 10] || suffixes[0];
  }
  const monthName = months[monthIndex];
  return `${dayOfMonth}${suffix} ${monthName} ${year}`;
}
