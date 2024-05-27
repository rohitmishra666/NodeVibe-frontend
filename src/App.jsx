import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // axios.get(import.meta.env.VITE_USER_URL + "/current-user").then((response) => {
  //   if (response) {
  //     console.log(response.data.data);
  //     dispatch(login(response.data.data));
  //   }
  //   else {
  //     dispatch(logout());
  //     navigate("/login");
  //   }
  //   setLoading(false);
  // });

  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-row flex-grow">
          <div className="hidden sm:flex w-16 bg-blue-500 sm:items-center sm:justify-center">
            <Navbar />
          </div>
          <div className="w-full flex flex-row bg-fuchsia-300">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <h1>LOADING...</h1>
  );
}

export default App;
