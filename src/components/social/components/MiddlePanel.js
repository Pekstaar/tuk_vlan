import React from "react";
import Post from "./Post";
import SharePostInput from "./SharePostInput";
import Wrapper from "./Wrapper";

const MiddlePanel = () => {
  return (
    <Wrapper className={"flex-[2] bg-inherit "}>
      <div className="max-h-[86vh] overflow-y-scroll  ">
        <SharePostInput />
        {posts?.map((post, i) => (
          <Post
            key={i}
            img={post?.image}
            user={post?.user}
            title={post?.title}
            desc={post?.desc}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default MiddlePanel;

const posts = [
  {
    user: {
      img: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "New User",
      time: "8min",
    },
    image:
      "https://www.freecodecamp.org/news/content/images/size/w2000/2021/02/React-js-1.png",
    title: "Why React framework?",
    desc: "ReactJS is just simpler to grasp right away. The component-based approach, well-defined lifecycle, and use of just plain JavaScript make React very simple to learn, build a professional web (and mobile applications), and support it. React uses a special syntax called JSX which allows you to mix HTML with JavaScript.",
  },
  {
    user: {
      img: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "New User",
      time: "8min",
    },
    image:
      "https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Polish your coding skills",
    desc: "Reading codes is the most crucial ingredient if you want to become an expert programmer or writer in the programming landscape. It goes hand in hand because to be an exceptional writer you have to be an exceptional reader first. This statement simply implies reading more comprehensive books as well as a myriad different book.",
  },
  {
    user: {
      img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Ben Chilwell",
      time: "5min",
    },
    image:
      "https://media.istockphoto.com/photos/young-woman-using-smart-phone-picture-id1252720235?b=1&k=20&m=1252720235&s=612x612&w=0&h=lQZF9BLx3ue6YKklsR-PuxBzQMkpf-R6cDRrXf9zMi8=",
    title: "Facebook leads the social industry",
    desc: " Facebook is inarguably the largest and most popular social media platform in the world. While that level of proliferation ensures at least some of your audience will regularly use this platform and take in your content, Facebook has developed a somewhat negative reputation among younger users who are increasingly turning to alternative sites.",
  },
];
