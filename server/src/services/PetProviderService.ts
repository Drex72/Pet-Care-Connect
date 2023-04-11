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
            model: models.ProviderServiceType,
            on: {
              pet_provider_id: {
                [Op.eq]: Sequelize.col("pet_provider.id"),
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
          "street",
          "city",
          "postal_code",
          "region",
          "user_avatar",
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
            model: models.ProviderServiceType,
            on: {
              pet_provider_id: {
                [Op.eq]: Sequelize.col("pet_provider.id"),
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
          "street",
          "city",
          "postal_code",
          "region",
          "user_avatar",
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

  async uploadProviderAvatar(imageLink: string, id: string) {
    try {
      const selectedPetProvider = await this.petProviderModel.findOne({
        where: { id },
      });

      if (!selectedPetProvider) {
        return this.petProviderNotFound();
      }

      const updatedPetProvider = await this.petProviderModel.update(
        { user_avatar: imageLink },
        {
          where: { id },
        }
      );

      return responseHandler.responseSuccess(
        200,
        "Avatar Updated Successfully",
        {
          updatedPetProvider,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Updating Booking ${JSON.stringify(error)}`
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

      await models.ProviderServiceType.destroy({ where: { id } });

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
