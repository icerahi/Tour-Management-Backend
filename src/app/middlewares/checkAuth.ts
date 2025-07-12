import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      //   if (!verifiedToken) {
      //     console.log(verifiedToken);
      //     throw new AppError(403, `You are not authorized ${verifiedToken}`);
      //   }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not authorize to access this route");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
