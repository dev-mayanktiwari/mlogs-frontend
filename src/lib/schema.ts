import { z } from "zod";

import {
  EUserTypeConstants,
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
} from "@/constants/UserConstants";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      EUserTypeConstants.MIN_NAME_LENGTH,
      MIN_LENGTH_MESSAGE("Name", EUserTypeConstants.MIN_NAME_LENGTH)
    )
    .max(
      EUserTypeConstants.MAX_NAME_LENGTH,
      MAX_LENGTH_MESSAGE("Name", EUserTypeConstants.MAX_NAME_LENGTH)
    )
    .regex(/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces"),
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(
      EUserTypeConstants.MIN_USERNAME_LENGTH,
      MIN_LENGTH_MESSAGE("Username", EUserTypeConstants.MIN_USERNAME_LENGTH)
    )
    .max(
      EUserTypeConstants.MAX_USERNAME_LENGTH,
      MAX_LENGTH_MESSAGE("Username", EUserTypeConstants.MAX_USERNAME_LENGTH)
    )
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(
      EUserTypeConstants.MIN_PASSWORD_LENGTH,
      MIN_LENGTH_MESSAGE("Password", EUserTypeConstants.MIN_PASSWORD_LENGTH)
    )
    .max(
      EUserTypeConstants.MAX_PASSWORD_LENGTH,
      MAX_LENGTH_MESSAGE("Password", EUserTypeConstants.MAX_PASSWORD_LENGTH)
    )
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(
        EUserTypeConstants.MIN_PASSWORD_LENGTH,
        MIN_LENGTH_MESSAGE("Password", EUserTypeConstants.MIN_PASSWORD_LENGTH)
      )
      .max(
        EUserTypeConstants.MAX_PASSWORD_LENGTH,
        MAX_LENGTH_MESSAGE("Password", EUserTypeConstants.MAX_PASSWORD_LENGTH)
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain at least one special character"
      ),
    newPassword: z
      .string()
      .trim()
      .min(
        EUserTypeConstants.MIN_PASSWORD_LENGTH,
        MIN_LENGTH_MESSAGE("Password", EUserTypeConstants.MIN_PASSWORD_LENGTH)
      )
      .max(
        EUserTypeConstants.MAX_PASSWORD_LENGTH,
        MAX_LENGTH_MESSAGE("Password", EUserTypeConstants.MAX_PASSWORD_LENGTH)
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(
      EUserTypeConstants.MIN_PASSWORD_LENGTH,
      MIN_LENGTH_MESSAGE("Password", EUserTypeConstants.MIN_PASSWORD_LENGTH)
    )
    .max(
      EUserTypeConstants.MAX_PASSWORD_LENGTH,
      MAX_LENGTH_MESSAGE("Password", EUserTypeConstants.MAX_PASSWORD_LENGTH)
    )
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),
});
