import { model, Schema } from "mongoose";
import { Tour } from "../tour/tour.model";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

divisionSchema.post("findOneAndDelete", async (doc, next) => {
  if (doc) {
    await Tour.deleteMany({ division: doc._id });
  }
  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
