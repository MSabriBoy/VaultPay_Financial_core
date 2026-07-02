import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./config/db.js";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(
      `VaultPay Financial Core API running on port ${env.port}`
    );
  });
};

startServer();