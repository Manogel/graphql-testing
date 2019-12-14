import Comment from "./CommentModel";

export async function saveComment(_, { input }) {
  console.log(input);
  const comment = await Comment.create(input);
  return comment;
}

export async function getComments() {
  const comments = await Comment.find();
  return comments;
}

export async function deleteComment(_, { id }) {
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
}
