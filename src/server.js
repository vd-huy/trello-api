import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";

const START_SERVER = () => {
  const app = express();

  app.use("/v1", APIs_V1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hi ${env.AUTHOR} Backend server is running successfully at Host: ${env.APP_HOST}:${env.APP_PORT}/`
    );

    // thực hiện các tác vụ clean up trước khi đóng server
    exitHook(() => {
      console.log("4. Server is sutting down...");
      CLOSE_DB();
      console.log("5. disconnected to MongoDB Atlas...");
    });
  });
};

// chỉ khi kết nối tới DataBase thành công thì mới Start Server Back-end lên
//IIFE : Immediately Invoked Function Expression : chạy ngay khi function được xác định
(async () => {
  try {
    console.log("1. connectting to MongoDB Atlas...");
    await CONNECT_DB();
    console.log("2. connected to mongoDB Atlas");

    // khỏi động server back-end khi đã kết nối với database thành công
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();

// console.log("1. connectting to MongoDB Atlas...");
// CONNECT_DB()
//   .then(() => console.log("2. connected to mongoDB Atlas"))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error);
//     process.exit(0);
//   });
