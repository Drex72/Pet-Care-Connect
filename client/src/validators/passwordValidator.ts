export const passwordValidator = (data: string) => {
  if (data.length === 0) {
    return "is required";
  }

  if (data.length < 10) {
    return "must be at least 10 characters long";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{10,}$/;

  const valid = passwordRegex.test(data);

  return valid
    ? null
    : "is invalid, must contain atleast One Capital letter and One Number";
};
