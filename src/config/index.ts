import dotenv from "dotenv";
dotenv.config();

type ConfigKeys = "PORT" | "DATABASE_URL" | "SERVER_URL" | "ENV" | "ADMIN_USERNAME" | "ADMIN_PASSWORD" | "ACCESS_TOKEN_SECRET" | "ACCESS_TOKEN_EXPIRY" | "REFRESH_TOKEN_SECRET" | "REFRESH_TOKEN_EXPIRY" | "DOMAIN";

const _config: Record<ConfigKeys, string | undefined> = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_URL: process.env.SERVER_URL,
  ENV: process.env.ENV,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  DOMAIN: process.env.DOMAIN
};

export const AppConfig = {
  get(key: ConfigKeys): string | number {
    const value = _config[key];
    if (value === undefined) {
      process.exit(1);
    }

    if (key === "PORT") {
      return Number(value);
    }

    return value;
  }
};

