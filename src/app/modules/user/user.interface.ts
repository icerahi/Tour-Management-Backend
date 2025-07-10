import { Types } from "mongoose";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

//auth providers
/**
 * email,password,
 * google authentication
 */

export interface IAuthProvider {
  provider: string; //"google" credential
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: string;
  auths: IAuthProvider[];
  role: Role;
  booking?: Types.ObjectId[];
  guide?: Types.ObjectId[];
}
