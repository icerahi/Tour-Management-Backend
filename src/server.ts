import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listenning to port ${envVars.PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

process.on("unhandledRejection", (error) => {
  console.log(
    "Unhandled Rejection detected..... Server shutting down...",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(
    "Unhandled Exception detected..... Server shutting down...",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved.. Server shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved.. Server shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// * unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promisss"));

//  * uncaught exception error
// throw new Error("I forgot to handle this local error");

/*
 * unhandled rejection error
 * uncaught exception error
 * signal termination sigterm
 */
