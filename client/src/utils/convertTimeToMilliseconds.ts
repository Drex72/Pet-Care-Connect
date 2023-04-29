export const convertTimeToMilliseconds = (timeString: string) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Create a new Date object with the current date and the specified time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Calculate the total number of milliseconds since midnight
  const milliseconds = date.getTime() - date.setHours(0, 0, 0, 0);
  return milliseconds;
};
