import { NextFunction, Request, Response } from "express";
import status from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User logged successfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = {
  credentialLogin,
};
