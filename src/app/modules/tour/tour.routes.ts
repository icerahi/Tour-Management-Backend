import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";
import { tourControllers } from "./tour.controller";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = Router();

router.post(
  "/create-tour-type",
  validateRequest(createTourTypeZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.createTourType
);

router.get("/tour-types", tourControllers.getAllTourTypes);

router.patch(
  "/tour-types/:id",
  validateRequest(updateTourTypeZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.updateTourType
);

router.delete(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.deleteTourType
);

//tour
router.post(
  "/create",
  validateRequest(createTourZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.createTour
);

router.get("/", tourControllers.getAllTour);

router.patch(
  "/:id",
  validateRequest(updateTourZodSchema),
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.updateTour
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  tourControllers.deleteTour
);
export const TourRoutes = router;
