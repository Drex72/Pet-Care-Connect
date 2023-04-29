import { all } from "axios";
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
      "Pet Provider Service with Given id does not Exist"
    );
  }

  async getPetProviderServiceType(id: string) {
    try {
      const allProviderServices = await this.petProvideServiceModel.findOne({
        where: { id },
        attributes: [
          "id",
          "service_name",
          "service_description",
          "service_price_per_hour",
        ],
      });
      return responseHandler.responseSuccess(
        200,
        "All Provider Fetched Successfully",
        allProviderServices
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Provider Services ${JSON.stringify(error)} `
      );
    }
  }

  async getAllPetProviderServiceType(id: string | null = null) {
    try {
      if (id) {
        const allProviderServices = await this.petProvideServiceModel.findAll({
          where: { pet_provider_id: id },
          attributes: [
            "id",
            "service_name",
            "service_description",
            "service_price_per_hour",
          ],
          group: ["service_name", "id"],
        });

        return responseHandler.responseSuccess(
          200,
          "All Provider Fetched Successfully",
          allProviderServices
        );
      } else {
        const allProviderServices = await this.petProvideServiceModel.findAll({
          attributes: [
            "id",
            "service_name",
            "service_description",
            "service_price_per_hour",
          ],
          group: ["service_name", "id"],
        });

        return responseHandler.responseSuccess(
          200,
          "All Provider Fetched Successfully",
          allProviderServices
        );
      }
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Provider Services ${JSON.stringify(error)} `
      );
    }
  }

  async createPetProviderServiceType(
    petProviderInformation: PetProviderServiceInterface,
    pet_provider_id: string
  ) {
    try {
      const createdProviderService = this.petProvideServiceModel.create({
        ...petProviderInformation,
        pet_provider_id,
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

  async deletePetProviderServiceType(id: string) {
    try {
      const selectedService = await this.petProvideServiceModel.findOne({
        where: { id },
      });

      if (!selectedService) {
        return this.petProviderNotFound();
      }
      const deletedService = this.petProvideServiceModel.destroy({
        where: { id },
      });

      return responseHandler.responseSuccess(
        204,
        "Provider Service Deleted Successfully",
        deletedService
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Deleting Pet Provider Service ${JSON.stringify(error)} `
      );
    }
  }
}

export default ProviderServiceTypeService;
