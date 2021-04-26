import { Post } from "../interfaces";
import { Action } from "./actions";
export interface PostsState {
  posts: Array<Post>;
}

const initialState = {
  posts: [],
};

export const postsReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
