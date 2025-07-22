import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { tourServices } from "./tour.service";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const tourType = await tourServices.createTourType(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Tour Type Created Successfully",
      data: tourType,
    });
  }
);

const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.getAllTourTypes();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Tour Types Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    const payload = req.body;
    const tourType = await tourServices.updateTourType(tourTypeId, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Tour Type updated Successfully",
      data: tourType,
    });
  }
);

const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    const result = await tourServices.deleteTourType(tourTypeId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour type deleted Successfully",
      data: result,
    });
  }
);

//tour

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const tour = await tourServices.createTour(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Tour Created Successfully",
      data: tour,
    });
  }
);

const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.getAllTour();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Tour  Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourId = req.params.id;
    const payload = req.body;
    const tour = await tourServices.updateTour(tourId, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Tour updated Successfully",
      data: tour,
    });
  }
);

const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourId = req.params.id;
    const result = await tourServices.deleteTour(tourId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour deleted Successfully",
      data: result,
    });
  }
);
export const tourControllers = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  //tour
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
