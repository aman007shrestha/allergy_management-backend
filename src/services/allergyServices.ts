import logger from "../misc/logger";
import ISuccess from "../domain/Success";
import AllergyModel from "../models/AllergyTable";
import IAllergy, { IAllergyToInsert, IDeleteAllergy } from "../domain/Allergy";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";
import { cloudinaryUpload } from "../misc/cloudinaryUtils";

/**
 *
 * @returns Object with data and message
 */
export const getAllAllergies = async (): Promise<ISuccess<IAllergy[]>> => {
  logger.info(`Getting All allergies with `);
  const allergies = await AllergyModel.getAllAllergies();
  return {
    data: allergies,
    message: "Allergies fetched successfully",
  };
};

/**
 *
 * @param allergyData : Data which is to be passed to create method in db model
 * @returns Object with data and message
 */
export const createAllergy = async (
  allergyData: IAllergyToInsert
): Promise<ISuccess<IAllergy>> => {
  logger.info(`Creating allergy`);

  // If image exits upload to cloudinary
  if (allergyData.image) {
    allergyData.image = await cloudinaryUpload(allergyData.image);
  }

  const newAllergy = await AllergyModel.createAllergy(allergyData);
  return {
    data: newAllergy,
    message: "Allergy Registered Successfully",
  };
};

/**
 *
 * @param allergyData : Data which is to be passed to update method in db model
 * @returns Object with data and message
 */
export const updateAllergy = async (
  allergyData: IAllergy
): Promise<ISuccess<IAllergy>> => {
  logger.info(`Updating allergy`);
  // Check if the update allergy is invoked by the owner of allergy himself
  const existingAllergy = await AllergyModel.getAllergyById(
    allergyData.allergy_id
  );
  if (!existingAllergy) {
    throw new CustomError(
      `Allergy does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingAllergy.user_table_id !== allergyData.user_table_id) {
    throw new CustomError(
      `You are not authorized to update other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  // If image exits upload to cloudinary
  if (allergyData.image.length > 100) {
    allergyData.image = await cloudinaryUpload(allergyData.image);
  }
  const updatedAllergy = await AllergyModel.updateAllergy(allergyData);
  return {
    data: updatedAllergy,
    message: "Allergy Updated Successfully",
  };
};

/**
 *
 * @param allergyData : allergy_id and user_id, user_id to check ownership, allergy_id to make delete method in db model
 * @returns Object with message
 */
export const deleteAllergy = async (
  allergyData: IDeleteAllergy
): Promise<ISuccess<IAllergy>> => {
  logger.info(`Deleting allergy`);
  // // Check if the delete allergy is invoked by the owner of allergy himself
  const existingAllergy = await AllergyModel.getAllergyById(
    allergyData.allergy_id
  );
  if (!existingAllergy) {
    throw new CustomError(
      `Allergy does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingAllergy.user_table_id !== allergyData.user_table_id) {
    throw new CustomError(
      `You are not authorized to delete other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  await AllergyModel.deleteAllergy(allergyData.allergy_id);
  return {
    data: existingAllergy,
    message: "Allergy deleted Successfully",
  };
};
