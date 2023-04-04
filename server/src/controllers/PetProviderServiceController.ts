import { Request, Response } from "express";
import PetProviderService from "../services/PetProviderService";
import ProviderServiceTypeService from "../services/ProviderServiceTypeService";

class PetProviderServiceController {
  petProviderServiceTypeService: ProviderServiceTypeService;
  constructor() {
    this.petProviderServiceTypeService = new ProviderServiceTypeService();
  }

  createPetProviderService = async (req: Request, res: Response) => {
    const providerServiceTypeInformation = {
      service_name: req.body.service_name,
      service_description: req.body.service_description,
      service_price_per_hour: req.body.service_price_per_hour,
    };
    try {
      const createdService =
        await this.petProviderServiceTypeService.createPetProviderServiceType(
          providerServiceTypeInformation,
          req.body.pet_provider_id
        );
      return res
        .status(createdService.statusCode)
        .send(createdService.response);
    } catch (e) {
      return res
        .status(500)
        .send(`Error while Creating Pet Provider Service, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  getAPetProviderService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const currentPetProviderService =
        await this.petProviderServiceTypeService.getPetProviderServiceType(id);
      return res
        .status(currentPetProviderService.statusCode)
        .send(currentPetProviderService.response);
    } catch (e) {
      return res
        .status(500)
        .send(`Error while fetching Pet Provider Service, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  getAllPetProviderservices = async (req: Request, res: Response) => {
    try {
      const allProviderServices =
        await this.petProviderServiceTypeService.getAllPetProviderServiceType();
      return res
        .status(allProviderServices.statusCode)
        .send(allProviderServices.response);
    } catch (e) {
      return res
        .status(500)
        .send(`Error while Creating Pet Provider Service, ${e}`);
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
    try {
      const deletedService =
        await this.petProviderServiceTypeService.deletePetProviderServiceType(
          req.query.id as string
        );
      return res
        .status(deletedService.statusCode)
        .send(deletedService.response);
    } catch (e) {
      return res
        .status(500)
        .send(`Error while Deleting Pet Provider Service, ${e}`);
    }
  };
}

const petProviderServiceController = new PetProviderServiceController();
export default petProviderServiceController;
