import React from "react";
import CardHeader from "./CardHeader";
import FriendItem from "./FriendItem";
import Suggestion from "./Suggestion";
import Wrapper from "./Wrapper";

const RightPanel = () => {
  return (
    <div className={"flex-[0.8] p-3 "}>
      <Wrapper className={"h-[330px] "}>
        {/* header */}
        <CardHeader title={"Friends"} />

        {/* body */}
        <div>
          {/* list */}

          {sampleActivities?.map((act) => (
            <FriendItem
              image={act?.img}
              desc={act?.description}
              user={act?.user}
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
        <div className=" ">
          {/* list */}
          {friendSuggestions?.map(({ name, img }) => (
            <Suggestion image={img} name={name} />
          ))}
        </div>

        <div>{/* list */}</div>
      </Wrapper>
    </div>
  );
};

export default RightPanel;

const sampleActivities = [
  {
    img: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "New User",
    time: "8min",
  },
  {
    img: "https://media.istockphoto.com/photos/portrait-of-a-young-african-man-at-studio-high-fashion-male-model-in-picture-id1325359218?b=1&k=20&m=1325359218&s=612x612&w=0&h=SBHN-tR9nioQFOS_Zsj_FPYMczyl_y40KlhJ8qTezpU=",
    user: "New User",
    time: "10 min",
  },
  {
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Caroline Atieno",
    time: "1 hr",
  },
  {
    img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Ben Chilwell",
    time: "5min",
  },

  {
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Synthia Njeri",
    time: "20min",
  },
];

const friendSuggestions = [
  {
    name: "Hakim ziyech",
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Eunice Njeri",
    img: "https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Pekmah Cruiz",
    img: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Hakim ziyech",
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Eunice Njeri",
    img: "https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
