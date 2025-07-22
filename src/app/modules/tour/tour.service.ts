import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {
  const tourType = await TourType.create(payload);
  return tourType;
};

const getAllTourTypes = async () => {
  const allTourTypes = await TourType.find({});
  const total = await TourType.countDocuments();
  return {
    data: allTourTypes,
    meta: { total },
  };
};

const updateTourType = async (tourTypeId: string, payload: ITourType) => {
  const isTourTypeExist = await TourType.findById(tourTypeId);
  if (!isTourTypeExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Tour Type not found");

  const updatedTourType = await TourType.findByIdAndUpdate(
    tourTypeId,
    payload,
    { new: true, runValidators: true }
  );

  return updatedTourType;
};

const deleteTourType = async (tourTypeId: string) => {
  const isTourTypeExist = await TourType.findById(tourTypeId);
  if (!isTourTypeExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Tour Type not found");

  const tourExistWithTourType = await Tour.find({
    tourType: isTourTypeExist._id,
  });

  if (tourExistWithTourType.length !== 0) {
    throw new AppError(
      StatusCodes.FAILED_DEPENDENCY,
      "Tour Type can not delete due to tour exist with this tour type"
    );
  }

  const result = await TourType.findOneAndDelete({ _id: tourTypeId });

  return result;
};

//tour

const createTour = async (payload: Partial<ITour>) => {
  const tour = await Tour.create(payload);
  return tour;
};

const getAllTour = async () => {
  const allTours = await Tour.find({});
  const total = await Tour.countDocuments();
  return {
    data: allTours,
    meta: { total },
  };
};

const updateTour = async (tourId: string, payload: ITourType) => {
  const isTourExist = await Tour.findById(tourId);
  if (!isTourExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Tour  not found");

  const updatedTour = await Tour.findByIdAndUpdate(tourId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTour;
};

const deleteTour = async (tourId: string) => {
  const isTourExist = await Tour.findById(tourId);
  if (!isTourExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Tour  not found");

  const result = await Tour.findOneAndDelete({ _id: tourId });

  return result;
};

export const tourServices = {
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
