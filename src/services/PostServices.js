import axios, { setAuthToken } from "./AxiosService";

const createPost = async (post) => {
  await setAuthToken(axios);

  const res = await axios.post(`/posts/new`, post);

  return res.data;
};

const fetchMyPosts = async () => {
  await setAuthToken(axios);

  const res = await axios.get(`/posts/feed`);

  return res.data;
};

const likePost = async (id) => {
  await setAuthToken(axios);

  const res = await axios.put(`/like`, {
    postId: id,
  });
  return res.data;
};

const unlikePost = async (id) => {
  await setAuthToken(axios);

  const res = await axios.put(`/unlike`, {
    postId: id,
  });

  return res.data;
};

const commentOnPost = async (data) => {
  await setAuthToken(axios);

  // data: comment, postId
  const res = await axios.put(`/comment`, data);

  return res.data;
};

const unCommentPost = async (id) => {
  await setAuthToken(axios);

  // data: comment, postId
  const res = await axios.put(`/uncomment`, {
    postId: id,
  });

  return res.data;
};
const PostServices = {
  createPost,
  fetchMyPosts,
  likePost,
  unlikePost,
  commentOnPost,
  unCommentPost,
};

export default PostServices;
