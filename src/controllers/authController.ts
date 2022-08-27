import * as authService from "../services/authServices";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";
import { INPUT_ALL_FIELDS_MESSAGE } from "../constants/constants";
/**
 *
 * @param req
 * @param res
 * @param next
 * @desc handles service for loggin in a user.
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(INPUT_ALL_FIELDS_MESSAGE, StatusCodes.BAD_REQUEST);
  }
  authService
    .login({ email, password })
    .then((data) => res.json(data))
    .catch((err) => {
      err.StatusCodes = StatusCodes.UNAUTHORIZED;
      next(err);
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @desc handles service for registrating a user
 */
export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(INPUT_ALL_FIELDS_MESSAGE, StatusCodes.BAD_REQUEST);
  }
  authService
    .createUser({ email, password })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};
