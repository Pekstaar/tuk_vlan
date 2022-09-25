import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import { MainState } from "../../../services/context/MainContext";
import PostServices from "../../../services/PostServices";
import CardHeader from "./CardHeader";
import FriendItem from "./FriendItem";
import LoadingList from "./LoadingList";
import Suggestion from "./Suggestion";
import Wrapper from "./Wrapper";

const fetchFollowers = async () => {
  const followers = await PostServices.getFollowers();

  return followers;
};

const getFriends = async () => {
  const friends = await PostServices.getFriends();

  return friends;
};

const RightPanel = () => {
  const queryClient = useQueryClient();
  const followFriendMutation = useMutation((id) => {
    return PostServices.follow(id);
  });

  const {
    data: followers,
    status,
    refetch: refetchFollowers,
  } = useQuery("followers", fetchFollowers);

  const {
    data: friends,
    status: fetchingFriends,
    refetch: refetchFriends,
  } = useQuery("friends", getFriends);

  // console.log(user);

  const handleFollow = (id) => {
    return followFriendMutation.mutate(id, {
      onSuccess: (data, variables) => {
        // console.log(data);

        queryClient.setQueryData(["followers", { _id: variables }], data);
        refetchFriends();
        refetchFollowers();
      },
    });
  };

  return (
    <div className={"flex-[0.8] p-3 "}>
      <Wrapper className={"h-[330px] "}>
        {/* header */}
        <CardHeader title={"Friends"} />

        {/* body */}
        <div>
          {/* list */}

          {fetchingFriends === "loading"
            ? [0, 1, 2, 3, 4]?.map((_) => <LoadingList />)
            : friends
                .slice(0, 5)
                ?.map((act) => (
                  <FriendItem
                    key={act?._id}
                    image={act?.img}
                    desc={act?.description}
                    name={act.name}
                    time={act?.time}
                  />
                ))}
        </div>

        <div>{/* list */}</div>
      </Wrapper>

      <Wrapper className={" mt-3"}>
        {/* header */}
        <CardHeader title={"Suggested for you"} />

        {/* body */}
        <div className="">
          {/* {/* list */}
          {status === "loading"
            ? [0, 1, 2, 3, 4]?.map((_) => <LoadingList />)
            : followers
                .slice(0, 5)
                ?.map(({ name, img, _id }) => (
                  <Suggestion
                    name={name}
                    handleAddFriend={() => handleFollow(_id)}
                  />
                ))}
        </div>

        <div>{/* list */}</div>
      </Wrapper>
    </div>
  );
};

export default RightPanel;
