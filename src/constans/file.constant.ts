import { configs } from "../configs";

const configuration = {
  region: configs.AWS_S3_REGION,
  credentials: {
    secretAccessKey: configs.AWS_S3_SECRET_KEY,
    accessKeyId: configs.AWS_S3_ACCESS_KEY,
  },
};

export { configuration };
