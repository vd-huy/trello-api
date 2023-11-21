import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// khởi tạo 1 đối tượng trellDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null;

// khởi tạo 1 đối tượng MongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// kết nối tới Database
export const CONNECT_DB = async () => {
  // gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của MongoClientInstance
  await mongoClientInstance.connect();

  //kết nối thành công thì lấy ra database theo tên và gán ngược nó lại vào biến trellDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Đóng kết nối DB khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

export const GET_DB = () => {
  // Function GET_DB (khöng async) này có nhiệm vụ export ra cái trellDatabaseInstance sau khi đã connect thnàh công tới MongoDB
  // để chúng ta sử dụng ở nhiều nơi khác nhau trong code
  // LƯU ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới dataBase

  if (!trelloDatabaseInstance) {
    throw new Error("must connect to Database first");
  } else return trelloDatabaseInstance;
};
