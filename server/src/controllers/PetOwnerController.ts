import { Request, Response } from "express";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import { models } from "../models";
import AuthService from "../services/AuthService";
import PetOwnerService from "../services/PetOwnerService";

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
  updatePetOwner = async (req: Request, res: Response) => {
    const { id } = req.params;
    // try {
    //   const updatedPetOwner = await this.petOwnerService.updatePetOwner(id);
    //   res.status(updatedPetOwner.statusCode).send(updatedPetOwner.response);
    // } catch (e) {
    //   res.status(500).send(`Error while Updating Pet Owner, ${e}`);
    // }
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
      res.status(500).send(`Error while fetching Users, ${e}`);
    }
  };
}

const petOwnerController = new PetOwnerController();
export default petOwnerController;
