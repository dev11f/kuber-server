import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import { RequestEmailVarificationResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVarification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVarificationResponse> => {
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email
            });
            if (oldVerification) {
              oldVerification.remove();
            }

            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL"
            }).save();
            await sendVerificationEmail(user.fullName, newVerification.key);
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
        } else {
          return {
            ok: false,
            error: "Your user has no eamil to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
