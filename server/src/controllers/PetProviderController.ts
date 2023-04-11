import { Request, Response } from "express";
import PetProviderService from "../services/PetProviderService";
import AWS from "aws-sdk";
import { config } from "../config";

class PetProviderController {
  petProviderService: PetProviderService;
  constructor() {
    this.petProviderService = new PetProviderService();
  }

  /**
   *
   * @param req
   * @param res
   */
  getAllOrOnePetProviders = async (req: Request, res: Response) => {
    const { query } = req;
    if (query.id) {
      const { id } = query;
      try {
        const currentPetProvider = await this.petProviderService.getPetProvider(
          id as string
        );
        return res
          .status(currentPetProvider.statusCode)
          .send(currentPetProvider.response);
      } catch (e) {
        return res.status(500).send(`Error while fetching Pet Owner, ${e}`);
      }
    } else {
      try {
        const allPetProviders =
          await this.petProviderService.getAllPetProviders();
        return res
          .status(allPetProviders.statusCode)
          .send(allPetProviders.response);
      } catch (e) {
        return res.status(500).send(`Error while fetching Users, ${e}`);
      }
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  updatePetProvider = async (req: Request, res: Response) => {};

  addPetProviderImage = async (req: Request, res: Response) => {
    const { providerName, providerId } = req.body;
    AWS.config.update({
      accessKeyId: config.awsAccessKey,
      secretAccessKey: config.awsSecretKey,
      region: "us-east-1",
    });

    const s3 = new AWS.S3({ region: "us-east-1" });

    const params = {
      Bucket: "petcareconnectbucket",
      Key: `${providerName}-avatar.jpg`,
      Body: req.file!.buffer,
      ACL: "public-read",
    };
    try {
      s3.upload(params, async (err: any, data: any) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `Failed to upload image ${JSON.stringify(err)}` });
        }
        const imageUrl = data.Location;

        const uploadedAvatar =
          await this.petProviderService.uploadProviderAvatar(
            imageUrl,
            providerId
          );

        res.status(uploadedAvatar.statusCode).send(uploadedAvatar.response);
      });
    } catch (error) {
      res.status(500).send(`Error while Uploading Image, ${error}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  deletePetProvider = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
      const deletedPetProvider =
        await this.petProviderService.deletePetProvider(id as string);
      res
        .status(deletedPetProvider.statusCode)
        .send(deletedPetProvider.response);
    } catch (e) {
      res.status(500).send(`Error while deleting Users, ${e}`);
    }
  };
}

const petProviderController = new PetProviderController();
export default petProviderController;
