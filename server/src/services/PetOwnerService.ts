import responseHandler from "../handlers/ResponseHandler";
import { models } from "../models";
import { PetOwnerInformationInterface } from "../interfaces/PetOwnerInformationInterface";
import { Model, ModelCtor, Op, Sequelize } from "sequelize";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
import { UserInterface } from "../interfaces/BasicUserInterface";

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
          "user_avatar",
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
          "user_avatar",
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

  async registerPet(petInformation: PetInformationInterface, id: string) {
    try {
      // Check if Pet Owner Exists
      const currentPetOwner = await this.petOwnerModel.findOne({
        where: { id },
      });
      if (!currentPetOwner) {
        return this.petOwnerNotFound();
      }

      await models.Pets.create({
        ...petInformation,
        pet_owner_id: id,
      });

      return responseHandler.responseSuccess(201, "Pet Created Successfully");

      // selectedPetOwner.update()
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Pet Owners ${JSON.stringify(error)}`
      );
    }
  }
  async uploadPetOwnerAvatar(imageLink: string, id: string) {
    try {
      const selectedPetOwner = await this.petOwnerModel.findOne({
        where: { id },
      });

      if (!selectedPetOwner) {
        return this.petOwnerNotFound();
      }

      const updatedPetOwner = await this.petOwnerModel.update(
        { user_avatar: imageLink },
        {
          where: { id },
        }
      );

      return responseHandler.responseSuccess(
        200,
        "Avatar Updated Successfully",
        {
          updatedPetOwner,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Updating Booking ${JSON.stringify(error)}`
      );
    }
  }

  async updatePetOwner(
    id: string,
    petOwnerInformation: Omit<UserInterface, "password">
  ) {
    try {
      // Check if Pet Owner Exists
      const selectedPetOwner = await this.petOwnerModel.findOne({
        where: { id },
      });

      if (!selectedPetOwner) {
        return this.petOwnerNotFound();
      }

      const updatePetOwner = await this.petOwnerModel.update(
        { ...petOwnerInformation },
        {
          where: { id },
        }
      );

      return responseHandler.responseSuccess(
        200,
        "User Updated Successfully",
        updatePetOwner
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Updating Pet Owners ${JSON.stringify(error)}`
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
