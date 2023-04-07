export const tfaValidator = (data: any) => {
  if (!data || data.length !== 6) {
    return "must not be 6 characters long.";
  }

  return null;
};
