import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <>
      <div className="absolute inset-0  h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Header />
        <div className="grid gap-4  grid-cols-12">
          <div className="hidden sm:flex col-span-1 h-[460px] bg-blue-500 sm:items-center sm:justify-center">
            <Navbar/>
          </div>
          <div className=" bg-red-300 col-span-11 h-full w-full ">
            OUTLET
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
