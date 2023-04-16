export const cardNumberValidator = (data: string) => {
  if (data.length === 0) {
    return "is required";
  }

  if (data.length !== 16) {
    return "must be 16 characters long";
  }

  const cardNumberRegex = /^(4|5)\d{15}$/;

  const valid = cardNumberRegex.test(data);

  return valid ? null : "is invalid";
};
