import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { divisionServices } from "./division.service";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await divisionServices.createDivision(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Division Created Successfully",
      data: result,
    });
  }
);

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.getAllDivision();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Divisions Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);
const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const result = await divisionServices.getSingleDivision(slug);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Division Retrived Successfully",
      data: result.data,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    const payload = req.body;

    const division = await divisionServices.updateDivision(divisionId, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Division Updated Successfully",
      data: division,
    });
  }
);

const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    const result = await divisionServices.deleteDivision(divisionId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Division deleted Successfully",
      data: result,
    });
  }
);

export const divisionControllers = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
