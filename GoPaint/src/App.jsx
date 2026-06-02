import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Colors from "./pages/Colors";
import FindPainters from "./pages/FindPainters";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import PainterSignUp from "./pages/PainterSignUp";
import UserDashboard from "./pages/UserDashboard";
import UserProject from "./pages/UserProject";
import UserSignUp from "./pages/UserSignUp";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/painter-signup" element={<PainterSignUp />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/user-projects" element={<UserProject />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="colors" element={<Colors />} />
        <Route path="find-painters" element={<FindPainters />} />
        <Route path="how-it-works" element={<HowItWorks />} />
      </Route>
    </Routes>
  );
}

export default App;
