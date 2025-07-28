import { StatusCodes } from "http-status-codes";
import { excludeField } from "../../constants";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {
  const tourTypeExist = await TourType.findOne({ name: payload.name });

  if (tourTypeExist) {
    throw new Error("Tour type already exists");
  }
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

  const tourExistWithTourType = await Tour.findOne({
    tourType: isTourTypeExist._id,
  });

  if (tourExistWithTourType) {
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
  const tourExist = await Tour.findOne({ title: payload.title });

  if (tourExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "A tour with this title already exits."
    );
  }

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTour = async (query: Record<string, string>) => {
  const filter = query;
  const searchTerm = query.searchTerm || "";
  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * Number(limit);

  //field filtering
  const fields = query.fields?.split(",").join(" ") || "";

  excludeField.forEach((field) => delete filter[field]);

  // one step

  // const allTours = await Tour.find(searchQuery)
  //   .find(filter)
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);

  //another step

  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  // const meta = await queryBuilder.getMeta();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  // const tours = filterQuery.find(searchQuery);
  // const allTours = await tours
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);

  // const total = await Tour.countDocuments();
  // const totalPage = Math.ceil(total / limit);
  // const meta = {
  //   page,
  //   limit,
  //   total,
  //   totalPage,
  // };
  return {
    data,
    meta,
  };
};
// const getAllTour = async (query: Record<string, string>) => {
//   const filter = query;
//   const searchTerm = query.searchTerm || "";
//   const sort = query.sort || "-createdAt";
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * Number(limit);

//   //field filtering
//   const fields = query.fields?.split(",").join(" ") || "";

//   excludeField.forEach((field) => delete filter[field]);

//   const searchQuery = {
//     $or: tourSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   };

//   // one step

//   // const allTours = await Tour.find(searchQuery)
//   //   .find(filter)
//   //   .sort(sort)
//   //   .select(fields)
//   //   .skip(skip)
//   //   .limit(limit);

//   //another step

//   const filterQuery = Tour.find(filter);
//   const tours = filterQuery.find(searchQuery);
//   const allTours = await tours
//     .sort(sort)
//     .select(fields)
//     .skip(skip)
//     .limit(limit);

//   const total = await Tour.countDocuments();
//   const totalPage = Math.ceil(total / limit);
//   const meta = {
//     page,
//     limit,
//     total,
//     totalPage,
//   };
//   return {
//     data: allTours,
//     meta,
//   };
// };

const updateTour = async (tourId: string, payload: Partial<ITour>) => {
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
