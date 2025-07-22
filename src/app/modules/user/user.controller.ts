import { NextFunction, Request, Response } from "express";
import status from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new AppError(status.BAD_REQUEST, "Fake Error");

//     const user = await UserServices.createUser(req.body);

//     res.status(status.CREATED).json({
//       message: "User created successfully!",
//       user,
//     });
//   } catch (error: any) {
//     console.log(error);
//     next(error);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(
    //   token!,
    //   envVars.JWT_ACCESS_SECRET
    // ) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken!);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "All Users Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });

    // res.status(status.OK).json({
    //   success: true,
    //   message: "All Users Retrived Successfully",
    //   data: users,
    // });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};

// 3 level route matching => controller => service => model => DB
