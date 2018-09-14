import { GraphQLServer } from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response } from "express";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: req => {
        // context에 넣으면 얘는 모든 resolvers로 갈 것. 여기에 user 정보를 넣어서 활용.
        return {
          req: req.request
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    // graphqlserver 내부에 express framework가 들어가 있음
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user; // 이렇게 하지 않으면 user는 middleware에만 머문다. 얘를 서버까지 넘겨야하기 때문에 req에 user를 override.
      } else {
        req.user = undefined;
      }
    }
    next(); // 이거 적어야 다음 미들웨어 실행 가능
  };
}

export default new App().app;
