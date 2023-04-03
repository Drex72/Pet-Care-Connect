import { Request, Response } from "express";
import { models } from "../models";
import AuthService from "../services/AuthService";

class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  registerPetOwner = async (req: Request, res: Response) => {
    const userInformation = {
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type,
    };
    const userAddressInformation = {
      street: req.body.street,
      city: req.body.city,
      postal_code: req.body.postal_code,
      region: req.body.region,
    };
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
    };
    const newPetOwner = await this.authService.registerPetOwner(
      userInformation,
      userAddressInformation,
      petInformation,
      petOwnerInformation
    );
    return res.status(newPetOwner.statusCode).send(newPetOwner?.response);
  };

  registerPetProvider = async (req: Request, res: Response) => {
    const userInformation = {
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type,
    };
    const userAddressInformation = {
      street: req.body.street,
      city: req.body.city,
      postal_code: req.body.postal_code,
      region: req.body.region,
    };
    const providerServiceTypeInformation = {
      service_name: req.body.service_name,
      service_description: req.body.service_description,
      service_price_per_hour: req.body.service_price_per_hour,
    };
    const petProviderInformation = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
    };
    const newPetProvider = await this.authService.registerPetProvider(
      userInformation,
      userAddressInformation,
      providerServiceTypeInformation,
      petProviderInformation
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

  sendVerificationEmail = async (req: any, res: Response) => {
    const { User } = models;
    try {
      const currentUser = await User.findOne({ where: { id: req?.user?.id } });
      if (parseInt(currentUser?.dataValues.user_verified) === 1) {
        return res.send({ message: "User Already Verified" });
      }
      const responseData =
        await this.authService.sendVerificationMailToUserEmail(
          currentUser?.dataValues.id
        );
      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      res.status(500).send(`Error while sending, ${e}`);
    }
  };

  validateSentOtp = async (req: any, res: Response) => {
    const { otp } = req.body;
    try {
      const responseData = await this.authService.validateOTP(
        req?.user.id,
        otp
      );
      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}

const authController = new AuthController();
export default authController;
