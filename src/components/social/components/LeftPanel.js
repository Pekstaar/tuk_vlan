import React from "react";
import ActivityItem from "./ActivityItem";
import CardHeader from "./CardHeader";
import Wrapper from "./Wrapper";

const LeftPanel = () => {
  return (
    <div className={"flex-[0.8] p-3 "}>
      <Wrapper className={"h-[330px] "}>
        {/* header */}
        <CardHeader title={"Activities"} />

        {/* body */}
        <div>
          {/* list */}

          {sampleActivities?.map((act) => (
            <ActivityItem
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
        <CardHeader title={"Explore"} />

        {/* body */}
        <div className=" grid grid-cols-3 gap-1">
          {/* list */}

          {sampleGallery?.map((img) => (
            <div className="h-20 w-20 rounded-xl overflow-hidden ">
              <img
                className="object-cover w-full h-full"
                src={img}
                alt="gallery"
              />
            </div>
          ))}
        </div>

        <div>{/* list */}</div>
      </Wrapper>
    </div>
  );
};

export default LeftPanel;

const sampleActivities = [
  {
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "New User",
    description: "started following you",
    time: "10m",
  },

  {
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Synthia Njeri",
    description: "liked your post",
    time: "5m",
  },
  {
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Caroline Atieno",
    description: "liked your post",
    time: "4m",
  },
  {
    img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "Ben Chilwell",
    description: "Started following you",
    time: "3m",
  },
  {
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    user: "New User",
    description: "started following you",
    time: "10m",
  },
];

const sampleGallery = [
  "https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/297494/pexels-photo-297494.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2261165/pexels-photo-2261165.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/296649/pexels-photo-296649.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2480854/pexels-photo-2480854.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
];
