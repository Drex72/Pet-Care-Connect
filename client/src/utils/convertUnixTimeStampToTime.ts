export const convertUnixTimeStampToTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp); // create Date object from Unix timestamp

  const timeOptions: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const timeString = date.toLocaleTimeString("en-US", timeOptions);
  return timeString;
};
