import { config } from "dotenv";

config();

const configs = {
  PORT: 5200,
  DB_URL: process.env.DB_URL || "https://example.com",

  SECRET_SALT: 10,

  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS || "",
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || "",

  JWT_SECRET_FORGOT: process.env.JWT_SECRET_FORGOT || "",
  JWT_SECRET_ACTIVATE: process.env.JWT_SECRET_ACTIVATE || "",

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_BUKET: process.env.AWS_S3_BUKET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUKET_URL: process.env.AWS_S3_BUKET_URL,

  PRIVATE_BANK_API: process.env.PRIVATE_BANK_API,
};

export { configs };
