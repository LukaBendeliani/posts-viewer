import { PostsState } from "./reducer";

export type Action = { type: "UPDATE"; payload: PostsState };
export const updatePostsState = (posts: PostsState): Action => ({
  type: "UPDATE",
  payload: posts,
});
