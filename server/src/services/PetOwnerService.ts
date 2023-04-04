import responseHandler from "../handlers/ResponseHandler";
import { models } from "../models";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import { Model, ModelCtor, Op, Sequelize } from "sequelize";

class PetOwnerService {
  private petOwnerModel: ModelCtor<Model<any, any>>;
  constructor() {
    this.petOwnerModel = models.PetOwner;
  }

  private petOwnerNotFound() {
    return responseHandler.responseError(
      400,
      "Pet Owner with Given id does not Exist"
    );
  }

  async getPetOwner(id: string) {
    try {
      const currentPetOwner = await this.petOwnerModel.findOne({
        where: { id },
        include: [
          {
            model: models.Pets,
            on: {
              pet_owner_id: {
                [Op.eq]: Sequelize.col("pet_owner.id"),
              },
            },
            attributes: [
              ["id", "pet_id"],
              "pet_name",
              "pet_breed",
              "pet_birthday",
              "pet_gender",
              "pet_special_needs",
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
        ],
      });

      if (!currentPetOwner) {
        return this.petOwnerNotFound();
      }
      return responseHandler.responseSuccess(
        200,
        "Pet Owner Fetched Successfully",
        {
          currentPetOwner,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Owners ${JSON.stringify(error)}`
      );
    }
  }

  async getAllPetOwners() {
    try {
      const allPetOwners = await this.petOwnerModel.findAll({
        include: [
          {
            model: models.Pets,
            on: {
              pet_owner_id: {
                [Op.eq]: Sequelize.col("pet_owner.id"),
              },
            },
            attributes: [
              ["id", "pet_id"],
              "pet_name",
              "pet_breed",
              "pet_birthday",
              "pet_gender",
              "pet_special_needs",
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
        ],
      });

      return responseHandler.responseSuccess(
        200,
        "Pet Owners Fetched Successfully",
        {
          allPetOwners,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Owners ${JSON.stringify(error)}`
      );
    }
  }

  async updatePetOwner(id: string, information: PetOwnerInformationInterface) {
    try {
      // Check if Pet Owner Exists
      const selectedPetOwner = await this.petOwnerModel.findOne({
        where: { id },
      });

      if (!selectedPetOwner) {
        this.petOwnerNotFound();
      }

      // selectedPetOwner.update()
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Owners ${JSON.stringify(error)}`
      );
    }
  }

  async deletePetOwner(id: string) {
    try {
      // Check if Pet Owner Exists
      const selectedPetOwner = await this.petOwnerModel.findOne({
        where: { id },
      });

      if (!selectedPetOwner) {
        return this.petOwnerNotFound();
      }

      const deletePetOwner = await this.petOwnerModel.destroy({
        where: { id },
      });

      return responseHandler.responseSuccess(
        204,
        "User Deleted Successfully",
        deletePetOwner
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Owners ${JSON.stringify(error)}`
      );
    }
  }
}

export default PetOwnerService;
