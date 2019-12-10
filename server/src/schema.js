import { GraphQLSchema, GraphQLObjectType } from "graphql";

import rootQuery from "./modules/rootQuery"; // Buscar registros
import rootMutation from "./modules/rootMutation"; // Mudar algum registro no banco

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...rootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      ...rootMutation
    }
  })
});
