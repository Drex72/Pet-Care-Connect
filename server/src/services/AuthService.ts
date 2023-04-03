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
    userInformation: UserInterface,
    userAddressInformation: UserAddressesInformationInterface,
    petInformation: PetInformationInterface,
    petOwnerInformation: PetOwnerInformationInterface
  ) {
    const { User, UserAddresses, Pets, PetOwner } = models;

    // First Check if a user does not exist
    const { email, password } = userInformation;
    const result = await User.findAll({ where: { email } });

    if (result.length) {
      return responseHandler.responseError(400, "User Exists Already");
    }
    // Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the Information in DB
    try {
      const userInfo = await User.create({
        ...userInformation,
        password: hashedPassword,
      });
      const createdAddress = await UserAddresses.create({
        ...userAddressInformation,
        user_id: userInfo.dataValues?.id,
      });

      const createdPetInformation = await Pets.create({
        ...petInformation,
        pet_owner_id: userInfo.dataValues?.id,
      });

      await PetOwner.create({
        ...petOwnerInformation,
        user_id: userInfo.dataValues.id,
        address_id: createdAddress.dataValues?.id,
        pet_id: createdPetInformation.dataValues?.id,
      });
      return responseHandler.responseSuccess(201, "User Created Successfully");
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
    userInformation: UserInterface,
    userAddressInformation: UserAddressesInformationInterface,
    providerServiceTypeInformation: PetProviderServiceInterface,
    petProviderInformation: PetProviderInformationInterface
  ) {
    const { User, UserAddresses, ProviderServiceType, PetProvider } = models;

    // First Check if a user does not exist
    const { email, password } = userInformation;
    const result = await User.findAll({ where: { email } });

    if (result.length) {
      return responseHandler.responseError(400, "User Exists Already");
    }
    // Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the Information in DB
    try {
      const userInfo = await User.create({
        ...userInformation,
        password: hashedPassword,
      });
      const createdAddress = await UserAddresses.create({
        ...userAddressInformation,
        user_id: userInfo.dataValues?.id,
      });

      const createdServiceType = await ProviderServiceType.create({
        ...providerServiceTypeInformation,
        pet_provider_id: userInfo.dataValues?.id,
      });
      await PetProvider.create({
        ...petProviderInformation,
        user_id: userInfo.dataValues.id,
        address_id: createdAddress.dataValues?.id,
        service_type: createdServiceType.dataValues?.id,
      });
      return responseHandler.responseSuccess(201, "User Created Successfully");
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
  async login(loginDetails: UserInterface): Promise<{
    statusCode: number;
    response: {
      code: number;
      message: string;
      status: boolean;
      data?: any;
    };
  }> {
    const { user_type, email, password } = loginDetails;
    const { User } = models;
    try {
      // Check if email exists
      const result = await User.findOne({ where: { email } });
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

      // Store basic info in jwt
      const accessToken = tokenHandler.createAccessToken(
        {
          id: currentUser.id,
          userType: currentUser.userType,
        },
        "1d"
      );
      const refreshToken = tokenHandler.createRefreshToken(
        {
          id: currentUser.id,
          userType: currentUser.userType,
        },
        "7d"
      );

      // Return Access Token
      return responseHandler.responseSuccess(200, "Logged in Successfully", {
        accessToken,
        refreshToken,
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
  async sendVerificationMailToUserEmail(user_id: string) {
    const { User, OTP } = models;
    const currentUser: any = await User.findOne({
      where: { id: user_id },
    });
    

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
      await OTP.create({ otp, email: currentUser.email });
    }

    // Sends Email
    const res = await this.mailingService.sendEmail({
      to: currentUser.email,
      subject: "Verify Email Code",
      body: emailVerificationOTPMail({ otp, email: currentUser.email }),
    });

    return res;
  }

  /**
   *
   * @param user_id
   * @param otp
   * @returns
   */
  async validateOTP(user_id: string, otp: string) {
    try {
      const { User, OTP } = models;
      const currentUser: any = await User.findOne({
        where: { id: user_id },
      });

      if (!currentUser) {
        return responseHandler.responseError(400, "User not found");
      }

      const otpData = await OTP.findOne({
        where: { email: currentUser.email },
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
      const updateUserStatus = await User.update(
        { user_verified: 1 },
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
