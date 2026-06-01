import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Colors from "./pages/Colors";
import FindPainters from "./pages/FindPainters";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import ClientSignUp from "./pages/ClientSignUp";
import PainterSignUp from "./pages/PainterSignUp";
import UserDashboard from "./pages/UserDashboard";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<ClientSignUp />} />
      <Route path="/painter-signup" element={<PainterSignUp />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
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
