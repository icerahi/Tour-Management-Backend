import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { User } from "../user/user.model";

// const credentialLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });

//   if (!isUserExist) {
//     throw new AppError(status.BAD_REQUEST, "Email does not exist");
//   }
//   const isPasswordMatch = await bcryptjs.compare(
//     password as string,
//     isUserExist.password as string
//   );

//   if (!isPasswordMatch) {
//     throw new AppError(status.BAD_REQUEST, "Incorrect Password");
//   }

//   //   const jwtPayload = {
//   //     userId: isUserExist._id,
//   //     email: isUserExist.email,
//   //     role: isUserExist.role,
//   //   };

//   //   const accessToken = generateToken(
//   //     jwtPayload,
//   //     envVars.JWT_ACCESS_SECRET,
//   //     envVars.JWT_ACCESS_EXPIRES
//   //   );

//   //   const refreshToken = generateToken(
//   //     jwtPayload,
//   //     envVars.JWT_REFRESH_SECRET,
//   //     envVars.JWT_REFRESH_EXPIRES
//   //   );

//   const userToken = createUserToken(isUserExist);
//   const { password: pass, ...rest } = isUserExist.toObject();
//   return {
//     ...userToken,
//     user: rest,
//   };
// };

const getNewAccessToken = async (refreshToken: string) => {
  const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken,
  };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  user!.save();
};

export const AuthServices = {
  // credentialLogin,
  getNewAccessToken,
  resetPassword,
};
