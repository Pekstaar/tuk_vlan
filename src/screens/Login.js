import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton, NormalButton } from "../components/Buttons";
import Loading from "../components/Loading";
import { toastError } from "../components/toaster";
import AuthService from "../services/AuthService";
import { mainContext } from "../services/context/MainContext";
import localStorageService from "../services/LocalStorageService";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(mainContext);

  const [state, setState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = state;

    if (email === "") {
      toastError("Please provide email/registration number");
      setLoading(false);

      return;
    } else if (password === "") {
      toastError("Please provide password");
      setLoading(false);

      return;
    }

    try {
      const res = await AuthService.login({ email_reg: email, password });

      setUser(res);

      localStorageService.store({ key: "user", value: JSON.stringify(res) });

      navigate("/");

      setLoading(false);
    } catch (e) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      setLoading(false);

      return;
    }
  };

  useEffect(() => {
    setLoading(true);
    // fetchUserFromLocal();
    const userDetails = JSON.parse(localStorageService.fetch("user"));

    if (userDetails?.token) {
      navigate("/");
      setLoading(false);
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <div className="h-screen flex justify-center items-start bg-gray-200 ">
      <div className="lg:w-7/12 sm:w-3/4 w-full bg-white mt-20 py-4 px-2 sm:px-4">
        <div className="flex items-center">
          {/* home button */}

          {/* login header */}
          <h1 className="text-center flex-grow font-medium uppercase text-xl sm:text-2xl text-gray-600 py-5 sm:py-10">
            Log-in
          </h1>
        </div>
        <hr className="" />

        {/* login with google pop-up button */}

        <form
          onSubmit={handleSubmit}
          className="form pb-6 flex items-center flex-col gap-5 mt-5"
        >
          {/* or text seperator */}

          {/* email input field */}
          <input
            type="text"
            name="email"
            placeholder="enter school email/registration number"
            className="p-3 my-2 outline-none border-teal-600 text-gray-500 rounded  border-2 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={handleChange}
            value={state?.email}
          />

          {/* password input field */}
          <input
            type="password"
            name="password"
            placeholder="password "
            className="p-3 my-2 outline-none border-teal-600 text-gray-500 rounded  border-2 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={handleChange}
            value={state?.password}
          />

          {/* forgot password link to:/forgotpassword */}
          <Link
            as="span"
            to="/forgotpassword"
            className="mx-5 py-2 text-sm w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
          >
            Forgot Password? click here to reset.
          </Link>

          {/* login button */}
          <div className="submit mx-5 w-full md:mx-0 md:w-4/6  my-4 flex justify-center">
            {/* <button
              type="submit"
              className={`uppercase w-3/4 text rounded-3xl p-3 bg-teal-700 text-white hover:bg-teal-600`}
            >
              login
            </button> */}
            {loading ? <LoadingButton /> : <NormalButton title="Login" />}
          </div>

          {/* have no account link */}
          <Link
            as="span"
            to="/signup"
            className=" text-center mt-2 py-2 w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
          >
            Have no account? click here to sign-up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
