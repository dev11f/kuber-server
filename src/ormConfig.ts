import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "kuber",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432, // postgres 기본 포트
  // username: process.env.DB_USERNAME || "kook", 이렇게 하는 건 좋지 않음. .env에 DB_USRNAME을 넣어두고 dotenv로 읽어들이는 게 나음
  // DB_USERNAME은 local일 땐 hbin로. 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default connectionOptions;
