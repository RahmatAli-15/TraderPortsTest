import { Routes, Route, useLocation } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import AlgoBot from "./pages/AlgoBot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Info from "./pages/Info";
import TraderTools from "./pages/TraderTools";
import PaidHome from "./pages/PaidHome";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/home";

  return (
    <>
      <div className={`${!hideHeaderFooter ? "pt-[4.75rem] lg:pt-[5.25rem]" : ""} overflow-hidden`}>
        {/* Conditionally render Header based on path */}
        {!hideHeaderFooter && <Header />}

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Benefits />
              <Services />
              <Pricing />
              <Roadmap />
            </>
          } />
          <Route path="/tools" element={<TraderTools/>} />
          <Route path="/bot" element={<AlgoBot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/info" element={<Info />} />
          <Route path="/home" element={<Home />} />
          <Route path="/paidhome" element={<PaidHome />} />
           {/* Add this route to handle 404 errors */}
        <Route path="*" element={<ErrorPage />} />
        </Routes>

        {/* Conditionally render Footer based on path */}
        {!hideHeaderFooter && <Footer />}
      </div>

      <ButtonGradient />
      <ScrollToTop/> {/* Add this component here */}
    </>
  );
};

export default App;
