export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

// const resolvers: Resolvers = {  이런 식으로 타입지정 가능
//   Query: {
//     sayHello: () => ""
//   }
// }
