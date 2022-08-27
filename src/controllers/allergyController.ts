import CustomError from "../misc/CustomError";
import * as allergyServices from "../services/allergyServices";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../domain/CustomRequest";

import { INPUT_ALL_FIELDS_MESSAGE } from "../constants/constants";
import { IAllergyToInsert } from "../domain/Allergy";

/**
 * @desc passes user_id arg from req to service function, converts the resolved data to json,
 * @param req Customized Request to include user_id property
 * @param res
 * @param next
 */
export const getAllAllergies = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  allergyServices
    .getAllAllergies()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handles service for creating a allergy by logged in user
 * @param req
 * @param res
 * @param next
 */
export const createAllergy = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, symptoms, severity, image }: IAllergyToInsert = req.body;
  if (!name || !symptoms || !severity) {
    throw new CustomError(INPUT_ALL_FIELDS_MESSAGE, StatusCodes.BAD_REQUEST);
  }
  const user_table_id = req.user_id as number;
  allergyServices
    .createAllergy({
      name,
      symptoms,
      severity,
      image: image ? image : "",
      user_table_id,
    })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};

/**
 * @desc handles service for updating a allergy for logged in user
 * @param req
 * @param res
 * @param next
 */
export const updateAllergy = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { allergyId } = req.params;
  const { name, symptoms, severity, image }: IAllergyToInsert = req.body;
  if (!name || !severity || !symptoms) {
    throw new CustomError(INPUT_ALL_FIELDS_MESSAGE, StatusCodes.BAD_REQUEST);
  }
  const user_table_id = req.user_id as number;
  allergyServices
    .updateAllergy({
      allergy_id: +allergyId,
      name,
      severity,
      symptoms,
      image: image ? image : "",
      user_table_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handle service for deleting a allergy for logged in user
 * @param req
 * @param res
 * @param next
 */
export const deleteAllergy = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { allergyId } = req.params;

  const user_table_id = req.user_id as number;
  allergyServices
    .deleteAllergy({
      allergy_id: +allergyId,
      user_table_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
