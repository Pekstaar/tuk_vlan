import moment from "moment";

const formatDate = (time) => {
  return moment(time).format("h:mm A");
};

export { formatDate };
