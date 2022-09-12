import axios, { setAuthToken } from "./AxiosService";

const sendMessage = async (message) => {
  await setAuthToken(axios);

  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post("/message", message, headerConfig);

  return data;
};

const fetchMessages = async (id) => {
  await setAuthToken(axios);
  //   console.log(id);
  const { data } = await axios.get(`/message/${id}`);

  return data;
};

const ChatService = { sendMessage, fetchMessages };

export default ChatService;
