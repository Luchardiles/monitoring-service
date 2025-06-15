require("dotenv").config();

module.exports = {
  port: process.env.PORT || 50056,
  serverUrl: process.env.SERVER_URL || "localhost",
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 27019,
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "rootpassword",
    db: process.env.DATABASE_DB || "monitoring",
  },
  // new—so mongooseConfig can just grab this
  mongodbUri:
    process.env.MONGODB_URI ||
    // fallback if you hadn’t set MONGODB_URI:
    `mongodb://${encodeURIComponent(
      process.env.DATABASE_USERNAME || "root"
    )}:${encodeURIComponent(process.env.DATABASE_PASSWORD || "rootpassword")}@${
      process.env.DATABASE_HOST || "localhost"
    }:${process.env.DATABASE_PORT || 27019}/${
      process.env.DATABASE_DB || "monitoring"
    }?authSource=admin`,
};
