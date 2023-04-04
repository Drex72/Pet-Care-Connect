import responseHandler from "../handlers/ResponseHandler";
import { models } from "../models";
import { Model, ModelCtor, Sequelize } from "sequelize";
import { PetProviderInformationInterface } from "../interfaces/PetProviderInformationInterface";
import { Op } from "sequelize";
import { sequelize } from "../config/database";
import { PetProvider } from "../models/PetProviderModel";

class PetProviderService {
  private petProviderModel: typeof PetProvider;
  constructor() {
    this.petProviderModel = models.PetProvider;
  }

  private petProviderNotFound() {
    return responseHandler.responseError(
      400,
      "Pet Provider with Given id does not Exist"
    );
  }

  async getPetProvider(id: string) {
    try {
      const currentPetProvider = await this.petProviderModel.findOne({
        where: { id },
        include: [
          {
            model: models.UserAddresses,
            on: {
              id: {
                [Op.eq]: Sequelize.col("pet_provider.address_id"),
              },
            },
            attributes: ["street", "city", "postal_code", "region"],
          },
          {
            model: models.ProviderServiceType,
            on: {
              id: {
                [Op.eq]: Sequelize.col("pet_provider.service_type"),
              },
            },
            attributes: [
              ["id", "service_type_id"],
              "service_name",
              "service_description",
              "service_price_per_hour",
            ],
          },
        ],
        attributes: [
          "id",
          "first_name",
          "last_name",
          "phone_number",
          "email",
          "user_verified",
          "user_type",
        ],
      });
      if (!currentPetProvider) {
        return this.petProviderNotFound();
      }
      return responseHandler.responseSuccess(
        200,
        "Pet Provider Fetched Successfully",
        {
          currentPetProvider,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Providers ${JSON.stringify(error)}`
      );
    }
  }

  async getAllPetProviders() {
    try {
      const allPetProviders = await this.petProviderModel.findAll({
        include: [
          {
            model: models.UserAddresses,
            on: {
              id: {
                [Op.eq]: Sequelize.col("pet_provider.address_id"),
              },
            },
            attributes: ["street", "city", "postal_code", "region"],
          },
          {
            model: models.ProviderServiceType,
            on: {
              id: {
                [Op.eq]: Sequelize.col("pet_provider.service_type"),
              },
            },
            attributes: [
              ["id", "service_type_id"],
              "service_name",
              "service_description",
              "service_price_per_hour",
            ],
          },
        ],
        attributes: [
          "id",
          "first_name",
          "last_name",
          "phone_number",
          "email",
          "user_verified",
          "user_type",
        ],
      });

      return responseHandler.responseSuccess(
        200,
        "Pet Providers Fetched Successfully",
        {
          allPetProviders,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Providers ${JSON.stringify(error)}`
      );
    }
  }

  async updatePetProvider(
    id: string,
    information: PetProviderInformationInterface
  ) {
    try {
      // Check if Pet Provider Exists
      const selectedPetProvider = await this.petProviderModel.findOne({
        where: { id },
      });

      if (!selectedPetProvider) {
        this.petProviderNotFound();
      }

      // selectedPetProvider.update()
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Providers ${JSON.stringify(error)}`
      );
    }
  }

  async deletePetProvider(id: string) {
    try {
      // Check if Pet Provider Exists
      const selectedPetProvider = await this.petProviderModel.findOne({
        where: { id },
      });

      if (!selectedPetProvider) {
        return this.petProviderNotFound();
      }

      const deletePetProvider = await this.petProviderModel.destroy({
        where: { id },
      });

      return responseHandler.responseSuccess(
        204,
        "User Deleted Successfully",
        deletePetProvider
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Providers ${JSON.stringify(error)}`
      );
    }
  }
}

export default PetProviderService;
