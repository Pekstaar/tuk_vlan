// import "emoji-mart/css/emoji-mart.css";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import React, { useEffect, useRef } from "react";

const EmojiPicker = ({ props }) => {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
};

export default EmojiPicker;
