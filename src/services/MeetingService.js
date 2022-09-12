import axios, { setAuthToken } from "./AxiosService";

const saveCallId = async (data) => {
  await setAuthToken(axios);

  const res = await axios.post(
    "http://localhost:5500/api/call/save-call-id",
    data
  );

  return res.data;
};
const getCallId = async (id) => {
  await setAuthToken(axios);

  const res = await axios.get(
    `http://localhost:5500/api/call/get_call_id/${id}`
  );

  return res.data;
};

const MeetingService = { saveCallId, getCallId };

export default MeetingService;
