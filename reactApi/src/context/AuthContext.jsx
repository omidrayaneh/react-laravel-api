import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
   

    try {
      await axios.post("/login", data);
      await csrf();
      getUser();
      navigate("/");
      toast.success("logged in successfully");
    } catch (error) {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors);
          } else {
            console.error("Login error:", error);
            toast.error("Failed to log in. Please try again.");
          }
    }
  };


  const register = async ({ ...data }) => {
   
    try {
      await axios.post("/register", data);
      await csrf();
      getUser();
      navigate("/");
      toast.success("Create User Successfuly");
    } catch (error) {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors);
          } else {
            console.error("Login error:", error);
            toast.error("Failed to log in. Please try again.");
          }
    }
  };

  return <AuthContext.Provider value={{user,errors,getUser,login,register}}>
    {children}
  </AuthContext.Provider>
};


export default function useAuthContext(){
    return useContext(AuthContext);
}