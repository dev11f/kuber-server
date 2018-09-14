import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        //password가 beforeUpdate에 hasing이 돼야 한다.
        //하지만 try 구문만 쓰면 beforeUpdate가 실행되지 않음. User instance를 update하지않기 때문
        // try 구문은 해당 object의 존재 여부를 확인하지 않는다. id에 해당하는 object를 찾아서 업데이트할 뿐. 해당하는 id oject가 없으면 말고.
        // user의 instance를 요청하지 않는다는 뜻.
        // 그렇게되면 beforeUpdate가 실행이 안돼서 비밀번호가 해싱되지 않는다
        if (notNull.password !== null) {
          user.password = notNull.password;
          user.save(); // --> 이렇게되면 새유저가 생성되는 건 아닌가? id를 기준으로 user 찾아서 알아서 save???????????
          delete notNull.password; // 이거 안하면 밑에 실행되면서 paaword가 encoding없이 저장될 것.
        }

        try {
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message
          };
        }
      }
    )
  }
};

export default resolvers;
