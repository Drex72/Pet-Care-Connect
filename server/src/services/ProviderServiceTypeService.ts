import { Op, Sequelize } from "sequelize";
import responseHandler from "../handlers/ResponseHandler";
import { PetProviderServiceInterface } from "../interfaces/ProviderServiceTypeInformation";
import { models } from "../models";
import { PetProviderService } from "../models/ProviderServiceType";

class ProviderServiceTypeService {
  private petProvideServiceModel: typeof PetProviderService;
  constructor() {
    this.petProvideServiceModel = models.ProviderServiceType;
  }

  private petProviderNotFound() {
    return responseHandler.responseError(
      400,
      "Pet Provider with Given id does not Exist"
    );
  }

  async getPetProviderServiceType(id: string) {
    // try {
    //   const currentPetProviderService =
    //     await this.petProvideServiceModel.findOne({
    //       where: { id },
    //     });
    //   if (!currentPetProvider) {
    //     return this.petProviderNotFound();
    //   }
    //   return responseHandler.responseSuccess(
    //     200,
    //     "Pet Provider Fetched Successfully",
    //     {
    //       currentPetProvider,
    //     }
    //   );
    // } catch (error) {
    // }
    return responseHandler.responseError(400, `Error Fetching Pet Providers `);
  }
  async getAllPetProviderServiceType() {}
  async createPetProviderServiceType(
    petProviderInformation: PetProviderServiceInterface
  ) {
    try {
      const createdProviderService = this.petProvideServiceModel.create({
        ...petProviderInformation,
      });
      return responseHandler.responseSuccess(
        201,
        "Provider Service Created Successfully",
        createdProviderService
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Creating Pet Providers ${JSON.stringify(error)} `
      );
    }
  }
  async deletePetProviderServiceType(id: string) {}
}

export default ProviderServiceTypeService;
