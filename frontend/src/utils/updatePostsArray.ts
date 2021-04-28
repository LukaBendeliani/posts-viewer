import { Post, Comment } from "../interfaces";

const updatePostsArray = async (
  action: string,
  posts: Array<Post>,
  postId: number,
  comment: Comment,
  visibleReply: number | null,
  setPosts: (post: Post[]) => void
) => {
  const tempArr = [...posts];
  const found = tempArr.find((post) => post.postId === postId);
  const index = found ? tempArr.indexOf(found) : 0;

  switch (action) {
    case "COMMENT": {
      tempArr[index].comments.splice(0, 0, comment);
      break;
    }
    case "REPLY": {
      console.log(comment);
      tempArr[index].comments[visibleReply || 0].replys.splice(0, 0, comment);
      break;
    }
  }

  const options = {
    method: "POST",
    body: JSON.stringify(tempArr),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch("http://localhost:3001/posts", options);
    const json = await response.json();
    setPosts(tempArr);
    return json;
  } catch (e) {
    console.error(e);
  }
};

export default updatePostsArray;
