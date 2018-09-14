import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";

// key는 args에서, email은 req에서
const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = Verification.find({
              key,
              payload: user.email
            });
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "can't verify email"
              };
            }
          } catch (e) {
            return {
              ok: false,
              error: e.message
            };
          }
        } else {
          return {
            ok: false,
            error: "No email to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
