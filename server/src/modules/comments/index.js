import {
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} from "graphql";

import CommentType from "./CommentType";
import { getComments, saveComment, deleteComment } from "./CommentLoader";

export const queries = {
  comments: {
    type: GraphQLList(CommentType),
    resolve: getComments
  }
};

export const mutations = {
  saveComment: {
    type: CommentType,
    resolve: saveComment,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: "CommentInput",
          fields: {
            name: {
              type: GraphQLString
            },
            content: {
              type: GraphQLString
            }
          }
        })
      }
    }
  },
  deleteComment: {
    type: CommentType,
    resolve: deleteComment,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    }
  }
};
