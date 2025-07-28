import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
  const divisionExist = await Division.findOne({ name: payload.name });

  if (divisionExist) {
    throw new Error("A division with this name already exists");
  }

  const division = await Division.create(payload);

  return division;
};

const getAllDivision = async () => {
  const divisions = await Division.find({});
  const totalDivisions = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivisions,
    },
  };
};
const getSingleDivision = async (slug: string) => {
  const divisions = await Division.findOne({ slug });

  return {
    data: divisions,
  };
};

const updateDivision = async (
  divisionId: string,
  payload: Partial<IDivision>
) => {
  const isDivisionExist = await Division.findById(divisionId);

  if (!isDivisionExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found");

  //optional
  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });
  if (duplicateDivision) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "A devision with this name already exists"
    );
  }

  const updatedDivision = await Division.findByIdAndUpdate(
    divisionId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedDivision;
};

const deleteDivision = async (divisionId: string) => {
  const isDivisionExist = await Division.findById(divisionId);
  if (!isDivisionExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found");
  await Division.findOneAndDelete({ _id: divisionId });

  return null;
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
