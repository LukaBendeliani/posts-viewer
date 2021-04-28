export interface Comment {
  name: string;
  profile: string;
  content: string;
  replys: Array<Comment>;
}

export interface Post {
  name: string;
  title: string;
  content: string;
  comments: Array<Comment>;
  profile: string;
  postId: number;
  posts: Array<Post>;
  setPosts: (posts: Array<Post>) => void;
}
