import { Request, Response } from "express";
import PetProviderService from "../services/PetProviderService";

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
  getAPetProvider = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const currentPetProvider = await this.petProviderService.getPetProvider(
        id
      );
      return res
        .status(currentPetProvider.statusCode)
        .send(currentPetProvider.response);
    } catch (e) {
      return res.status(500).send(`Error while fetching Pet Owner, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  getAllPetProviders = async (req: Request, res: Response) => {
    try {
      const allPetProviders =
        await this.petProviderService.getAllPetProviders();
      return res
        .status(allPetProviders.statusCode)
        .send(allPetProviders.response);
    } catch (e) {
      return res.status(500).send(`Error while fetching Users, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  updatePetProvider = async (req: Request, res: Response) => {};

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
      res.status(500).send(`Error while fetching Users, ${e}`);
    }
  };
}

const petProviderController = new PetProviderController();
export default petProviderController;
