import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
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

const updateDivision = async (
  divisionId: string,
  payload: Partial<IDivision>
) => {
  const isDivisionExist = await Division.findById(divisionId);

  if (!isDivisionExist)
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found");

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

  const result = await Division.findOneAndDelete({ _id: divisionId });

  return result;
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
};
