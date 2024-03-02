import { Link, useNavigate } from "react-router-dom";
import Axios from "../api/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {

  const [email, setEmail] = useState("omidrayaneh@gmail.com");
  const [name, setName] = useState("omid");
  const [password, setPassword] = useState("password");
  const [password_confirmation, setPassword_confirmation] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a GET request to the route responsible for CSRF token and await the response
      const csrfResponse = await Axios.get("/sanctum/csrf-cookie");

      // Send a POST request with CSRF token added to the header and await the response
      await Axios.post(
        "/register",
        { name, email,password,password_confirmation },
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
      toast.success("register successfully");
    } catch (error) {
      // Handle errors if any
      // If error is due to invalid credentials, show error message under the fields
      if (error.response && error.response.status === 422) {
        setErrorMessage(error.response.data.errors);
        // toast.error(error.response.data.errors);
       // toast.error(error.response.data.message);
      } else {
        setErrorMessage(error.response.data.errors);
        // toast.error(error.response.data.message);

      //  console.log(error.response.data.errors); // Log other types of errors
      }
    }
  };

  // const renderErrors = (field) =>
  //   errorMessage?.[field]?.map((error, index) => (
  //     <div key={index} className="text-red-500 my-2 rounded p-2 bg-danger">
  //       {error}
  //     </div>
  //   ));

  return (
    <section className=" bg-[#F4F7FF] py-20 lg:py-[120px]">
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
              <form onSubmit={handleRegister}>
              <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
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
                  
                 { errorMessage.name &&  <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errorMessage.name}
                      </span>
                    </div>}
                     {/* {renderErrors("name")} */}
                  
                </div>
                <div className="mb-4">
                  <input
                    type="email"
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
                  
             {errorMessage.email &&<div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errorMessage.email}
                      </span>
                    </div>}
                     {/* {renderErrors("email")} */}
                  
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
                  
                 {errorMessage.password && <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errorMessage.password}
                      </span>
                    </div>}
                     {/* {renderErrors("password")} */}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    placeholder="Password Confirmation"
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
                  
                   {errorMessage.password_confirmation && <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errorMessage.password_confirmation}
                      </span>
                    </div>}
                     {/* {renderErrors("password_confirmation")} */}
                  
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
                    Register
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

export default Register;
