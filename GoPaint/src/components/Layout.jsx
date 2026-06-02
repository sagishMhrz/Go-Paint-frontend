import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Header, { isUserLoggedIn } from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn);
  const forceScrolledHeader =
    pathname === "/colors" ||
    pathname === "/find-painters" ||
    pathname === "/how-it-works";

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header forceScrolled={forceScrolledHeader} isLoggedIn={loggedIn} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
