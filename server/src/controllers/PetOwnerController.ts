import { Request, Response } from "express";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import { models } from "../models";
import AuthService from "../services/AuthService";
import PetOwnerService from "../services/PetOwnerService";
import AWS from "aws-sdk";
import { config } from "../config";

class PetOwnerController {
  petOwnerService: PetOwnerService;
  constructor() {
    this.petOwnerService = new PetOwnerService();
  }

  /**
   *
   * @param req
   * @param res
   */
  getAllOrOnePetOwners = async (req: any, res: Response) => {
    const { query } = req;
    if (query?.id) {
      try {
        const currentPetOwner = await this.petOwnerService.getPetOwner(
          query.id
        );
        res.status(currentPetOwner.statusCode).send(currentPetOwner.response);
      } catch (e) {
        res.status(500).send(`Error while fetching Pet Owner, ${e}`);
      }
    } else {
      try {
        const allPetOwners = await this.petOwnerService.getAllPetOwners();
        res.status(allPetOwners.statusCode).send(allPetOwners.response);
      } catch (e) {
        res.status(500).send(`Error while fetching Users, ${e}`);
      }
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  addPetForPetOwner = async (req: any, res: Response) => {
    const user_id = req.user.id;
    const petInformation = {
      pet_name: req.body.pet_name,
      pet_breed: req.body.pet_breed,
      pet_birthday: req.body.pet_birthday,
      pet_gender: req.body.pet_gender,
      pet_special_needs: req.body.pet_special_needs,
    };
    const newPet = await this.petOwnerService.registerPet(
      petInformation,
      user_id
    );
    return res.status(newPet.statusCode).send(newPet?.response);
  };

  addPetOwnerImage = async (req: Request, res: Response) => {
    const { petOwnerId } = req.body;
    AWS.config.update({
      accessKeyId: config.awsAccessKey,
      secretAccessKey: config.awsSecretKey,
      region: "us-east-1",
    });

    const s3 = new AWS.S3({ region: "us-east-1" });

    const params = {
      Bucket: "petcareconnectbucket",
      Key: `${petOwnerId}-avatar.jpg`,
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

        const uploadedAvatar = await this.petOwnerService.uploadPetOwnerAvatar(
          imageUrl,
          petOwnerId
        );

        res.status(uploadedAvatar.statusCode).send(uploadedAvatar.response);
      });
    } catch (error) {
      res.status(500).send(`Error while Uploading Image, ${error}`);
    }
  };

  updatePetOwner = async (req: any, res: Response) => {
    const { id } = req.user;
    const petOwnerInformation = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      postal_code: req.body.postal_code,
      region: req.body.region,
      
    };
    try {
      const updatedPetOwner = await this.petOwnerService.updatePetOwner(
        id as string,
        petOwnerInformation
      );
      res.status(updatedPetOwner.statusCode).send(updatedPetOwner.response);
    } catch (e) {
      res.status(500).send(`Error while Updating Users, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  deletePetOwner = async (req: Request, res: Response) => {
    const { id } = req.query;
    console.log(id);
    try {
      const deletedPetOwner = await this.petOwnerService.deletePetOwner(
        id as string
      );
      res.status(deletedPetOwner.statusCode).send(deletedPetOwner.response);
    } catch (e) {
      res.status(500).send(`Error while Deleting Users, ${e}`);
    }
  };
}

const petOwnerController = new PetOwnerController();
export default petOwnerController;
