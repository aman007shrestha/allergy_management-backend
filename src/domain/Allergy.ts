export default interface IAllergy {
  allergy_id: number;
  name: string;
  symptoms: string;
  severity: number;
  image: string;
  user_table_id: number;
  created_at?: Date;
}

export interface IDeleteAllergy {
  allergy_id: number;
  user_table_id: number;
}

export type IAllergyToInsert = Omit<IAllergy, "allergy_id" | "created_at">;
