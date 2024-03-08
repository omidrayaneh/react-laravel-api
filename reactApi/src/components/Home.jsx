import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const Home = () => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) getUser();
  }, []);
  return (
    <div className="">
      <h1>{user?.name}</h1>
    </div>
  );
};

export default Home;
