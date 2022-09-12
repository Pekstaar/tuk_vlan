import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton, NormalButton } from "../components/Buttons";
import { toastError, toastSuccess } from "../components/toaster";
import AuthService from "../services/AuthService";
import localStorageService from "../services/LocalStorageService";

const Register = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    fullName: "",
    registration: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [loading, setLoading] = useState(false);
  const { fullName, registration, email, password, c_password } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const verifyState = () => {
    if (fullName === "") {
      toastError("Please provide fullname");
      setLoading(false);

      return false;
    } else if (registration === "") {
      toastError("Please provide registration number");
      setLoading(false);

      return false;
    } else if (email === "") {
      toastError("Please provide email");
      setLoading(false);

      return false;
    } else if (password === "") {
      toastError("Please provide password");
      setLoading(false);

      return false;
    } else if (c_password === "") {
      toastError("Please Confirm password");
      setLoading(false);

      return false;
    } else if (c_password !== password) {
      toastError("Passwords do not match!");
      setLoading(false);

      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const isVerified = verifyState();

    if (isVerified) {
      try {
        const res = await AuthService.register({
          name: fullName,
          reg: registration,
          email,
          password,
        });

        localStorageService.store({ key: "user", value: JSON.stringify(res) });

        toastSuccess(fullName + " registered successfully!");

        navigate("/");

        setLoading(false);
      } catch (e) {
        const errorMessage = e?.response?.data?.message || e?.message || e;

        toastError(errorMessage);

        setLoading(false);

        return;
      }
      return;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-200 ">
      <div className="lg:w-7/12 sm:w-3/4 w-full bg-white mt-5 py-4 px-2 sm:px-4 mb-4">
        <div className="flex items-center">
          {/* home button */}

          {/* Register header */}
          <h1 className="text-center flex-grow font-medium uppercase text-xl sm:text-2xl text-gray-600 py-5 sm:py-10">
            Register
          </h1>
        </div>
        <hr className="" />

        {/* Register with google pop-up button */}

        <form
          onSubmit={handleSubmit}
          className="form pb-6 flex items-center flex-col gap-3 mt-5"
        >
          {/* or text seperator */}

          {/* full name input field */}
          <input
            type="text"
            name="fullName"
            placeholder="enter fullname"
            className="p-3 my-2 outline-none border-teal-600 text-gray-500 rounded  border-2 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={handleChange}
            value={state?.fullName}
          />

          {/* registration input field */}
          <input
            type="text"
            name="registration"
            placeholder="enter school registration number"
            className="p-3 my-2 outline-none border-teal-600 text-gray-500 rounded  border-2 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={handleChange}
            value={state?.registration}
          />

          {/* email input field */}
          <input
            type="email"
            name="email"
            placeholder="i.e. user@students.tukenya.ac.ke"
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

          {/* confirm password */}
          <input
            type="password"
            name="c_password"
            placeholder="confirm password "
            className="p-3 my-2 outline-none border-teal-600 text-gray-500 rounded  border-2 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={handleChange}
            value={state?.c_password}
          />

          {/* forgot password link to:/forgotpassword */}
          <Link
            as="span"
            to="/forgotpassword"
            className="mx-5 py-2 text-sm w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
          >
            Forgot Password? click here to reset.
          </Link>

          {/* Register button */}
          <div className="submit mx-5 w-full md:mx-0 md:w-4/6   flex justify-center">
            {/* <button
              type="submit"
              className={`uppercase w-3/4 text rounded-3xl p-3 bg-teal-700 text-white hover:bg-teal-600`}
            >
              Register
            </button> */}
            {loading ? <LoadingButton /> : <NormalButton title="Register" />}
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

export default Register;
