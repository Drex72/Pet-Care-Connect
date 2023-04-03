import { Request, Response } from "express";

class PetProviderController {
  constructor() {}

  /**
   *
   * @param req
   * @param res
   */
  getAPetProvider = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  getAllPetProviders = async (req: Request, res: Response) => {};

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
  deletePetProvider = async (req: Request, res: Response) => {};
}

const petProviderController = new PetProviderController();
export default petProviderController;
