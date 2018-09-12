import dotenv from "dotenv"; //이걸하면 ormConfig에서 환경변수를 쓸 수 있음. .gitignore에 추가해 github에 안 올라가도록 해주어야함
dotenv.config(); //connectionOptions를 import하기 전에 config 해서 환경변수를 설정해주어야 함.
import app from "./app";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })

  .catch(error => console.log(error));
