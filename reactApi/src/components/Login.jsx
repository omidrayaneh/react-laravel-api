import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("omidrayaneh@gmail.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await Axios.post("/login", { email, password });
  //     setEmail("");
  //     setPassword("");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a GET request to the route responsible for CSRF token and await the response
      const csrfResponse = await Axios.get("/sanctum/csrf-cookie");

      // Send a POST request with CSRF token added to the header and await the response
      await Axios.post(
        "/login",
        { email, password },
        {
          headers: {
            "X-CSRF-TOKEN": csrfResponse.data.csrf_token,
          },
        }
      );

      // Perform actions after successful login
      setEmail("");
      setPassword("");
      setErrorMessage(""); // Clear error message on successful login
      navigate("/");
      toast.success("logged in successfully");
    } catch (error) {
      // Handle errors if any
      // If error is due to invalid credentials, show error message under the fields
      if (error.response && error.response.status === 422) {
        //setErrorMessage("Invalid email or password");
        // toast.error(error.response.data.errors);
        toast.error(error.response.data.message);
      } else {
        setErrorMessage(error.response.data.errors);

        console.log(error.response.data.errors); // Log other types of errors
      }
    }
  };

  const renderErrors = (field) =>
    errorMessage?.[field]?.map((error, index) => (
      <div key={index} className="text-red-500 my-2 rounded p-2 bg-danger">
        {error}
      </div>
    ));

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
              relative
              mx-auto
              max-w-[525px]
              overflow-hidden
              rounded-lg
              bg-white
              py-16
              px-10
              text-center
              sm:px-12
              md:px-[60px]
            "
            >
              <div className="mb-10 text-center md:mb-16">Laraveller</div>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                  />

                  {/* <div className="flex">
                    <span className="text-red-400 text-sm m-2 p-2">{renderErrors('email')}</span>
                  </div> */}
                  {renderErrors("email")}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                  />

                  {/* <div className="flex">
                    <span className="text-red-400 text-sm m-2 p-2">{renderErrors('password')}</span>
                  </div> */}
                  {renderErrors("password")}
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                    w-full
                    px-4
                    py-3
                    bg-indigo-500
                    hover:bg-indigo-700
                    rounded-md
                    text-white
                  "
                  >
                    Login
                  </button>
                </div>
              </form>
              <Link
                to="/forgot-password"
                className="
                mb-2
                inline-block
                text-base text-[#adadad]
                hover:text-primary hover:underline
              "
              >
                Forgot Password?
              </Link>
              <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to="/register" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
