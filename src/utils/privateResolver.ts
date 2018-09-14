// 다른 모든 resolver가 middleware의 하나의 argument가 되는 것
// middleware도 하나의 resolver
// babel이 이 curring function을 각 resolverFunction 안에서 user가 있는지 없는지를 체크하는 걸로 바꿔주는 것.
// 저 안에 있는 async 함수를 부르는 게 아니라 privateResolver를 부름.

// 커링 : 함수형 프로그래밍 기법 중 하나로 함수를 재사용하는데 유용하게 쓰일 수 있는 기법
// 커링 : 다중인자를 받는 함수를 단일인자만 받는 함수열로 변경하는 것이 커링 eg.[].map(parseInt)에서 parseInt를 1개 인자만 받도록 고정시키는 게 커링
// 하나가 n개의 인자를 받는 과정을 n개의 함수로 각각의 인자를 받도록 하는 것

const privateResolver = resolverFunction => async (_, __, context) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refuce to proceed");
  }
  const resolved = await resolverFunction(_, __, context);
  return resolved;
};

export default privateResolver;
