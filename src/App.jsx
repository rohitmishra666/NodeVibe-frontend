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
      <div className="absolute  min-h-screen w-full items-center bg-slate-700">
        <Header />
        <div className="flex">
          <div className="hidden sm:flex w-36 bg-blue-500 sm:items-center sm:justify-center">
            <Navbar />
          </div>
          <div className="w-full flex flex-wrap bg-stone-500">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : <h1>LOADING...</h1>;
}

export default App;
