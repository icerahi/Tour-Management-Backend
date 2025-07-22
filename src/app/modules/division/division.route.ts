import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";
import { divisionControllers } from "./division.controller";
import {
  createDivisionZodSchema,
  updateDivisionZodSchema,
} from "./division.validation";
const router = Router();

router.post(
  "/create",
  validateRequest(createDivisionZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  divisionControllers.createDivision
);

router.get("/", divisionControllers.getAllDivision);

router.patch(
  "/:id",
  validateRequest(updateDivisionZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  divisionControllers.updateDivision
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  divisionControllers.deleteDivision
);
export const DivisionRoutes = router;
