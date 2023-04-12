export const calculateTimeDifferenceInHour = (
  time1: string,
  time2: string
): number => {
  // Convert times to minutes
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  // Calculate difference in minutes
  const differenceInMinutes = Math.abs(totalMinutes1 - totalMinutes2);

  // Convert difference to hours
  const differenceInHours = differenceInMinutes / 60;

  return differenceInHours;
};
