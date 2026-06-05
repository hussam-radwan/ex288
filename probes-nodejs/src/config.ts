import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT || 8080,
  RESPONSE_DELAY: process.env.RESPONSE_DELAY || 1000,
};
