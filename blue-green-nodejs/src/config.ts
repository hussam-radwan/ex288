import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 8080,
  deployment: process.env.DEPLOYMENT || "BLUE",
};
