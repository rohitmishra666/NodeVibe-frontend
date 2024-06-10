import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { ToastContainer } from "react-toastify";
import userUtils from "./utils/user.utils.js";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for Navbar visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userUtils.getUser();
        if (response.data.statusCode === 200) {
          const newTokens = await userUtils.refreshToken();
          dispatch(login({
            user: response.data.data,
            accessToken: newTokens.data.data.accessToken,
            refreshToken: newTokens.data.data.refreshToken,
          }));
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  return !loading ? (
    <div className="flex flex-col bg-gray-900 min-h-screen max-w-screen">
      <Header setIsNavbarOpen={setIsNavbarOpen} isNavbarOpen={isNavbarOpen} /> {/* Pass props */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-row flex-grow pt-20">
        <aside
          className={`fixed transform ${
            isNavbarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 sm:translate-x-0 w-64 bg-gray-900 z-20`}
        >
          <Navbar />
        </aside>
        <main className="flex-grow w-full flex flex-col md:w-full sm:ml-20 bg-gray-900">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <h1>LOADING...</h1>
    </div>
  );
}

export default App;
