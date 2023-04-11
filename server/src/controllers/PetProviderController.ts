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
