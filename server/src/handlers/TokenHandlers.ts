import { NextFunction, Request, Response } from "express";
import jwt, { DecodeOptions, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { config } from "../config";
import { UserType } from "../interfaces/UserTypeInterface";
import { getModelToBeUsed } from "../utils/getModelToBeUsed";
interface ISignedInformation {
  id: string;
  user_type: UserType;
  user_verified: boolean;
}
class TokenHandler {
  /**
   * @params
   */
  createAccessToken = (
    signedInformation: ISignedInformation,
    expiryDate: string | number
  ) => {
    return jwt.sign(signedInformation, config.accessTokenSecret, {
      expiresIn: expiryDate,
    });
  };

  // Creates the Refresh Token
  createRefreshToken = (
    signedInformation: ISignedInformation,
    expiryDate: string | number
  ) => {
    return jwt.sign(signedInformation, config.refreshTokenSecret, {
      expiresIn: expiryDate,
    });
  };
  // Validates the Access Token
  validateAccessTokenMiddleware = (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    // Verifies the Token
    jwt.verify(
      token,
      config.accessTokenSecret,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(401);
        const currentModel: any = getModelToBeUsed(decoded?.user_type);

        // Checks our DB if we have a user with the email in the token
        const validUser = await currentModel.findOne({
          where: { id: decoded.id },
        });
        // If that user Exists, then the Access Token is still valid
        if (!validUser) return res.sendStatus(401);
        req.user = decoded;
        next();
      }
    );
  };
  // Validates the Refresh Token
  validateRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, config.accessTokenSecret);
  };
  refreshAccessToken = (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(400).json({ message: "No Refresh Token" });

    let userPayload: ISignedInformation | null = null;

    try {
      userPayload = this.validateRefreshToken(token) as ISignedInformation;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error, Try Again" });
    }

    // Check if there is a valid user
    const { id, user_type } = userPayload!;
    const currentModel: any = getModelToBeUsed(user_type);

    const user = currentModel.findOne({ id });

    if (!user) return res.status(400).json({ message: "No Valid User" });

    return res.status(200).json({
      accessToken: this.createAccessToken(
        userPayload as ISignedInformation,
        "1d"
      ),
    });
  };
}
const tokenHandler = new TokenHandler();
export default tokenHandler;
