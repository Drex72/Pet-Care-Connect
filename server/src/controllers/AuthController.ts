import { Request, Response } from "express";
import { models } from "../models";
import AuthService from "../services/AuthService";
import { getModelToBeUsed } from "../utils/getModelToBeUsed";

class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  registerPetOwner = async (req: Request, res: Response) => {
    const petInformation = {
      pet_name: req.body.pet_name,
      pet_breed: req.body.pet_breed,
      pet_birthday: req.body.pet_birthday,
      pet_gender: req.body.pet_gender,
      pet_special_needs: req.body.pet_special_needs,
    };
    const petOwnerInformation = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      city: req.body.city,
      postal_code: req.body.postal_code,
      region: req.body.region,
    };
    const newPetOwner = await this.authService.registerPetOwner(
      petInformation,
      petOwnerInformation
    );
    return res.status(newPetOwner.statusCode).send(newPetOwner?.response);
  };

  registerPetProvider = async (req: Request, res: Response) => {
    const providerServiceTypeInformation = {
      service_name: req.body.service_name,
      service_description: req.body.service_description,
      service_price_per_hour: req.body.service_price_per_hour,
    };
    const petProviderInformation = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      city: req.body.city,
      postal_code: req.body.postal_code,
      region: req.body.region,
    };
    const newPetProvider = await this.authService.registerPetProvider(
      providerServiceTypeInformation,
      petProviderInformation,
      req.body.business_name
    );
    return res.status(newPetProvider.statusCode).send(newPetProvider?.response);
  };

  loginUser = async (req: Request, res: Response) => {
    const user = await this.authService.login({
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type,
    });

    if (user.statusCode === 200) {
      const { refreshToken } = user.response?.data;

      // Store refresh token in cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    return res.status(user.statusCode).send(user?.response);
  };

  logOut = async (_: Request, res: Response) => {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.sendStatus(204);
  };

  sendVerificationEmail = async (req: Request, res: Response) => {
    let { email, user_type, status } = req.body;
    const currentModel: any = getModelToBeUsed(user_type);
    try {
      console.log('beginning')
      const currentUser = await currentModel.findOne({
        where: { email },
      });

      if (!currentUser) {
        return res.status(400).send({ message: "User not Found" });
      }

      if (currentUser?.dataValues.user_verified && status !== "reset") {
        return res.send({ message: "User Already Verified" });
      }
      console.log('hey')

      const responseData =
        await this.authService.sendVerificationMailToUserEmail(
          currentUser?.dataValues.id,
          user_type,
          status
        );
        console.log(responseData, 'sent')

      return res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      return res
        .status(400)
        .send(`Error while sending otp, Please Check your Network`);
    }
  };

  validateSentOtp = async (req: any, res: Response) => {
    let { otp, email, user_type, password } = req.body;
    try {
      const currentModel: any = getModelToBeUsed(user_type);
      const currentUser = await currentModel.findOne({
        where: { email },
      });
      const responseData = await this.authService.validateOTP(
        currentUser.dataValues?.id,
        otp,
        user_type,
        password
      );
      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}

const authController = new AuthController();
export default authController;
