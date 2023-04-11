import AWS from "aws-sdk";
import { config } from ".";
console.log(config);
AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretKey,
  region: "us-east-1",
});
