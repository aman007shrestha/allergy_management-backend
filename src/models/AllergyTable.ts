import db from "../db/db";
import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import IAllergy, { IAllergyToInsert } from "../domain/Allergy";

/**
 * @desc database methods for making database changes. Actual database interaction point.
 */
class AllergyTable {
  public static table = "allergy";
  // different methods for interacting database

  /**
   *
   * @returns list of allergy object
   */
  public static async getAllAllergies() {
    let allergies;
    try {
      allergies = await db(AllergyTable.table).select().orderBy("severity");
    } catch (error: any) {
      logger.info(error.message);
    }
    return allergies;
  }

  /**
   *
   * @param allergyData The allergy data which is to be inserted into database
   * @returns newly created allergy object
   */
  public static async createAllergy(allergyData: IAllergyToInsert) {
    logger.info(`Database query to insert allergy`);
    let newAllergy;
    try {
      newAllergy = await db(AllergyTable.table).insert(allergyData, ["*"]);
      return newAllergy;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param allergyData the data which is to be updated, has allergy_id for identification of allergy object
   * @returns updatedAllergy
   */
  public static async updateAllergy(allergyData: IAllergy) {
    logger.info(`Database Update for allergy`);
    let updatedAllergy;
    try {
      updatedAllergy = await db(AllergyTable.table)
        .where({ allergy_id: allergyData.allergy_id })
        .update(allergyData)
        .returning(["*"]);
      return updatedAllergy;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param allergyId the id of allergy object which is to be deleted
   */
  public static async deleteAllergy(allergyId: number) {
    logger.info(`Database Delete for allergy`);
    try {
      const deletedAllergy = await db(AllergyTable.table)
        .where({ allergy_id: allergyId })
        .delete();
      return deletedAllergy;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param allergyId the id of allergy object which is to be returned
   * @returns the allergy object
   */
  public static async getAllergyById(allergyId: number): Promise<IAllergy> {
    const allergy = await db(AllergyTable.table)
      .where({ allergy_id: allergyId })
      .select()
      .first();
    return allergy;
  }
}
export default AllergyTable;
