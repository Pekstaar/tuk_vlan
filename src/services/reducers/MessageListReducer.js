const MessageListReducer = (state, action) => {
  let prevState = [...state];

  switch (action?.type) {
    case "ADD_MESSAGE":
      return [...prevState, action.payload];

    default:
      return state;
  }
};

export default MessageListReducer;
