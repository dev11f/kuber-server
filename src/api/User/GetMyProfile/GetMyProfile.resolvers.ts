import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

// jwt middleware를 지날 때 jwt에서 해독한 id를 가지고 database user field로 가서 그 user 정보를 가져와 req에 넘겨준 걸 가져오는 것.
const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};

export default resolvers;
