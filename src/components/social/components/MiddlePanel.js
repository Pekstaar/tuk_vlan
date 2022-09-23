import React, { useState } from "react";
import Post from "./Post";
import SharePostInput from "./SharePostInput";
import Spinner from "./Spinner";
import Wrapper from "./Wrapper";
import PostServices from "../../../services/PostServices";
import { useQuery, useMutation, useQueryClient } from "react-query";
import NewPostModal from "./NewPostModal";
import { toastError, toastSuccess } from "../../toaster";
import { MainState } from "../../../services/context/MainContext";

const MiddlePanel = () => {
  const queryClient = useQueryClient();
  const { user } = MainState();

  const [openModal, setOpenModal] = useState(false);
  const [post, setPost] = useState({
    title: "",
    text: "",
    photo_1: "",
    photo_2: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchPosts = async () => {
    const posts = await PostServices.fetchMyPosts();

    return posts;
  };
  const { data: posts, status, refetch } = useQuery("posts", fetchPosts);
  const createPostMutation = useMutation((newPost) => {
    return PostServices.createPost(newPost);
  });
  const likePostMutation = useMutation((id) => {
    return PostServices.likePost(id);
  });
  const unlikePostMutation = useMutation((id) => {
    return PostServices.unlikePost(id);
  });

  // console.log("POSTS:", posts);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPostMutation.mutate(
      {
        title: post?.title,
        text: post?.text,
        photo_url: [post?.photo_1, post?.photo_2],
      },
      {
        onSuccess: () => {
          toastSuccess("post created!");
          handleCloseModal();
          refetch();
        },
        onError: (error) => {
          toastError(
            error?.response?.data?.message || error?.response?.data?.error
          );
        },
      }
    );
  };

  const handleLike = (id) => {
    return likePostMutation.mutate(id, {
      onSuccess: (data, variables) => {
        // console.log(data);

        queryClient.setQueryData(["posts", { _id: variables }], data);
        refetch();
      },
      onError: (error) => {
        console.log(
          error ||
            error?.response?.data?.message ||
            error?.response?.data?.error
        );
      },
    });
  };
  const handleUnlike = (id) => {
    return unlikePostMutation.mutate(id, {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["posts", { _id: variables }], data);
        // console.log(data);
        refetch();
      },
      onError: (error) => {
        console.log(
          error ||
            error?.response?.data?.message ||
            error?.response?.data?.error
        );
      },
    });
  };

  // console.log(
  //   "POSTS",
  //   queryClient
  //     .getQueryData(["posts"])
  //     .find((d) => d._id === "632ccff89960192a9819d656")
  // );

  return (
    <Wrapper className={"flex-[2] bg-inherit overflow-y-scroll"}>
      <NewPostModal
        isOpen={openModal}
        setOpen={setOpenModal}
        s
        handleClose={handleCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={createPostMutation?.isLoading}
      />
      <SharePostInput handleShowModal={handleOpenModal} />

      <div className="h-[86vh] relative">
        {createPostMutation?.isLoading && (
          <div className="absolute h-full top-0 bg-[#ffffff90] flex items-center flex-col justify-center z-[20] right-0 left-0">
            <Spinner />
            <span className="text-gray-600">Creating post . . .</span>
          </div>
        )}
        {status === "loading" ? (
          <Loader />
        ) : (
          posts?.map((post, i) => (
            <Post
              key={i}
              img={post?.photo_url[0]}
              user={post?.postedBy?.name}
              title={post?.title}
              desc={post?.text}
              isLiked={post?.likes?.includes(user?._id)}
              id={post?._id}
              handleLike={() => handleLike(post?._id)}
              handleUnlike={() => handleUnlike(post?._id)}
              likes={post?.likes}
            />
          ))
        )}
      </div>
    </Wrapper>
  );
};

export default MiddlePanel;

const Loader = ({ desc = "loading posts. . ." }) => (
  <div className="h-[50vh] flex flex-col justify-center items-center">
    <Spinner />
    <span className="text-gray-400">{desc}</span>
  </div>
);
