import axios from "./AxiosService";

// Login user
const login = async (loginData) => {
  const response = await axios.post("/users/login", loginData);

  return response?.data;
};
// Register User
const register = async (data) => {
  const response = await axios.post("/users/register", data);

  return response?.data;
};

const AuthService = { login, register };

export default AuthService;
