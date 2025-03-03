import * as otpGenerator from 'otp-generator';

export const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

export const checkOTPExpiration = (createdAt: Date) => {
  const tenMinutes = 10 * 60 * 1000;
  return new Date().getTime() - new Date(createdAt).getTime() > tenMinutes;
};
