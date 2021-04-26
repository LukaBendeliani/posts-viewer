export interface Comment {
  name: string;
  profile: string;
  content: string;
}

export interface Post {
  name: string;
  title: string;
  content: string;
  comments: Array<Comment>;
  profile: string;
  postId: number;
}
