import responseHandler from "../handlers/ResponseHandler";
import bcrypt from "bcrypt";
import ApiErrorException from "../exceptions/ApiErrorException";
import tokenHandler from "../handlers/TokenHandlers";
import { models } from "../models";
import { getModelToBeUsed } from "../utils/getModelToBeUsed";
import { Request, Response } from "express";
import MailingService from "./MailingService";
import emailVerificationOTPMail from "../views/EmailVerificationOTPMail";
import { createOTP } from "../utils/createOTP";
import { UserInterface } from "../interfaces/BasicUserInterface";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
import { UserAddressesInformationInterface } from "../interfaces/UserAddressesInformationInterface";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import PetOwnerService from "./PetOwnerService";
import PetProviderService from "./PetProviderService";
import { PetProviderServiceInterface } from "../interfaces/ProviderServiceTypeInformation";
import { PetProviderInformationInterface } from "../interfaces/PetProviderInformationInterface";
import { UserType } from "../interfaces/UserTypeInterface";
import { PetOwner } from "../models/PetOwnerModel";
import { PetProvider } from "../models/PetProviderModel";
import resetPasswordOTPMail from "../views/ResetPasswordOTPMail";

class AuthService {
  mailingService: MailingService;
  petOwnerService: PetOwnerService;
  petProviderService: PetProviderService;

  constructor() {
    this.mailingService = new MailingService();
    this.petOwnerService = new PetOwnerService();
    this.petProviderService = new PetProviderService();
  }
  /**
   * Creates a Pet Owner
   * @param userInformation
   * @param userAddressInformation
   * @param petInformation
   * @param petOwnerInformation
   */
  async registerPetOwner(
    petInformation: PetInformationInterface,
    petOwnerInformation: UserInterface
  ) {
    const { Pets, PetOwner } = models;

    // First Check if a user does not exist
    const { email, password } = petOwnerInformation;
    const result = await PetOwner.findAll({ where: { email } });
    const result2 = await PetProvider.findAll({ where: { email } });

    if (result.length || result2.length) {
      return responseHandler.responseError(400, "Pet Owner Exists Already");
    }

    // Hash the Password and Store it in DB
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const createdUser = await PetOwner.create({
        ...petOwnerInformation,
        password: hashedPassword,
      });

      await Pets.create({
        ...petInformation,
        pet_owner_id: createdUser.dataValues.id!,
      });

      return responseHandler.responseSuccess(
        201,
        "Pet Owner Created Successfully"
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error creating User ${JSON.stringify(error)}`
      );
    }
  }

  /**
   * Creates a Pet Provider
   * @param {UserInterface} userInformation
   * @param {UserAddressesInformationInterface} userAddressInformation
   * @param {PetProviderServiceInterface} providerServiceTypeInformation
   * @param {PetProviderInformationInterface} petProviderInformation
   */
  async registerPetProvider(
    providerServiceTypeInformation: PetProviderServiceInterface,
    petProviderInformation: UserInterface,
    business_name: string
  ) {
    const { ProviderServiceType, PetProvider } = models;

    // First Check if a user does not exist
    const { email, password } = petProviderInformation;
    const result2 = await PetOwner.findAll({ where: { email } });
    const result = await PetProvider.findAll({ where: { email } });

    if (result.length || result2.length) {
      return responseHandler.responseError(400, "Pet Provider Exists Already");
    }
    // Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the Information in DB
    try {
      const createdPetProvider = await PetProvider.create({
        ...petProviderInformation,
        password: hashedPassword,
        business_name,
      });

      await ProviderServiceType.create({
        ...providerServiceTypeInformation,
        pet_provider_id: createdPetProvider.dataValues.id!,
      });

      return responseHandler.responseSuccess(
        201,
        "Pet Provider Created Successfully"
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error creating User ${JSON.stringify(error)}`
      );
    }
  }

  /**
   * Login a user
   * @param {UserInterface} loginDetails
   */
  async login(loginDetails: any): Promise<{
    statusCode: number;
    response: {
      code: number;
      message: string;
      status: boolean;
      data?: any;
    };
  }> {
    const { user_type, email, password } = loginDetails;

    const currentModel: any = getModelToBeUsed(user_type);
    try {
      // Check if email exists
      const result = await currentModel.findOne({ where: { email } });
      if (!result) {
        return responseHandler.responseError(400, "Invalid Login Details");
      }
      const currentUser = result.dataValues;

      // Check if the password Correlates
      const isPasswordMatch = await bcrypt.compare(
        password,
        currentUser.password!
      );

      // Return Error Message if The password is Wrong
      if (!isPasswordMatch) {
        return responseHandler.responseError(400, "Invalid Login Details");
      }
      delete currentUser?.password;
      // Store basic info in jwt
      const accessToken = tokenHandler.createAccessToken(
        {
          id: currentUser.id,
          user_type: currentUser.user_type,
          user_verified: currentUser.user_verified,
        },
        "1d"
      );
      const refreshToken = tokenHandler.createRefreshToken(
        {
          id: currentUser.id,
          user_type: currentUser.user_type,
          user_verified: currentUser.user_verified,
        },
        "7d"
      );

      // Return Access Token
      return responseHandler.responseSuccess(200, "Logged in Successfully", {
        accessToken,
        refreshToken,
        userDetails: currentUser,
      });
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Logging in ${JSON.stringify(error)}`
      );
    }
  }

  /**
   * Sends Verification Mail
   * @param user_id
   */
  async sendVerificationMailToUserEmail(
    user_id: string,
    user_type: UserType,
    status: string | null = null
  ) {
    const { OTP } = models;
    const currentModel: any = getModelToBeUsed(user_type);
    const currentUser = await currentModel.findOne({
      where: { id: user_id },
    });
    console.log(status);

    if (!currentUser)
      return responseHandler.responseError(400, "User not found");

    // OTP Creation
    const otp = createOTP();

    let otpData = await OTP.findOne({
      where: { email: currentUser.email },
    });

    if (otpData) {
      await OTP.update({ otp }, { where: { id: otpData.dataValues?.id } });
    } else {
      await OTP.create({ otp, email: currentUser.dataValues?.email });
    }

    // Sends Email
    let res;
    if (status === "reset") {
      res = await this.mailingService.sendEmail({
        to: currentUser.dataValues?.email,
        subject: "Reset Password Code",
        body: resetPasswordOTPMail({
          otp,
          email: currentUser.dataValues?.email,
        }),
      });
    } else {
      res = await this.mailingService.sendEmail({
        to: currentUser.dataValues?.email,
        subject: "Verify Email Code",
        body: emailVerificationOTPMail({
          otp,
          email: currentUser.dataValues?.email,
        }),
      });
    }

    return res;
  }

  /**
   *
   * @param user_id
   * @param otp
   * @returns
   */
  async validateOTP(
    user_id: string,
    otp: string,
    user_type: UserType,
    password: string | null = null
  ) {
    try {
      const { OTP } = models;
      const currentModel: any = getModelToBeUsed(user_type);

      const currentUser = await currentModel.findOne({
        where: { id: user_id },
      });

      if (!currentUser) {
        return responseHandler.responseError(400, "User not found");
      }

      const otpData = await OTP.findOne({
        where: { email: currentUser.dataValues?.email },
      });

      if (!otpData) {
        return responseHandler.responseError(400, "Invalid OTP");
      }

      const diff =
        Math.abs(
          new Date().getTime() / 1000 -
            new Date(otpData.dataValues.updatedAt).getTime() / 1000
        ) / 60;

      const correctOtp = otpData.dataValues.otp == otp;

      if (diff > 30 || !correctOtp) {
        return responseHandler.responseError(400, "Invalid or Expired Otp!");
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isPasswordMatch = await bcrypt.compare(
          password,
          currentUser.password!
        );

        if (isPasswordMatch) {
          return responseHandler.responseError(
            400,
            `Former Password cannot be the same as new Password`
          );
        }
        await currentModel.update(
          { password: hashedPassword },
          { where: { id: user_id } }
        );
      }
      const updateUserStatus = await currentModel.update(
        { user_verified: true },
        { where: { id: user_id } }
      );

      if (updateUserStatus) {
        return responseHandler.responseSuccess(
          200,
          "User Successfully Verified"
        );
      }
      return responseHandler.responseError(400, "Failed to verify User");
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Unable to verify OTP ${error}`
      );
    }
  }
}

export default AuthService;
