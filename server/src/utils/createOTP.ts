export const createOTP = () => {
  const digits = "0123456789";
  let otp: string[] = [];
  for (let i = 0; i < 6; i++) {
    otp.push(digits[Math.floor(Math.random() * 10)]);
  }
  if (otp[0] == "0") {
    otp[0] = "1";
  }
  return otp.join("");
};
