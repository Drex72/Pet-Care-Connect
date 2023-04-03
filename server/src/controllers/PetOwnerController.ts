import { Request, Response } from "express";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import AuthService from "../services/AuthService";
import PetOwnerService from "../services/PetOwnerService";
import ProviderServicesService from "../services/ProviderServicesService";

class PetOwnerController {
  petOwnerService: PetOwnerService;
  providerService: ProviderServicesService;
  constructor() {
    this.petOwnerService = new PetOwnerService();
    this.providerService = new ProviderServicesService();
  }

  /**
   *
   * @param req
   * @param res
   */
  getAPetOwner = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  getAllPetOwners = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  updatePetOwner = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  deletePetOwner = async (req: Request, res: Response) => {};
}

const petOwnerController = new PetOwnerController();
export default petOwnerController;
