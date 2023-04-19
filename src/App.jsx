import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientSignup from './components/ClientSignup';
import ClientLogin from './components/ClientLogin';
import Options from './components/Options';
import FreelancerSignup from './components/FreelancerSignup';
import FreelancerLogin from './components/FreelancerLogin';
import ClientHome from "./components/ClientHome";
import FreelancerHome from "./components/FreelancerHome";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Options />} />
          <Route path="/client/signup" element={<ClientSignup />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/freelancer/signup" element={<FreelancerSignup />} />
          <Route path="/freelancer/login" element={<FreelancerLogin />} />
          <Route path="/client/home" element={<ClientHome />} />
          <Route path="/freelancer/home" element={<FreelancerHome />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
