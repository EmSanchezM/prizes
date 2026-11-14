import { object, string } from "zod";
import { required } from "./errors";

export const createSessionSchema = object({
  body: object({
    email: string(required("Email is required")),
    password: string(required("Password is required")),
  }),
});