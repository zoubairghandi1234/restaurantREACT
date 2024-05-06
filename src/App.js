import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  AboutUs,
  Chef,
  FindUsPage,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
  SpecialMenu,
} from "./container";
import { Navbar } from "./components";
import "./app.scss";
import "./App.css";
import Modal from "./components/Modal";
import { getCurrentUser, getDishes, getCartItems } from "./Axios";
import Profile from "./components/profile";
import Cart from "./components/Cart";

const App = () => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([])
  const [canvasSidebar, setCanvasSidebar] = useState(false);
  const handleCloseCanvasSidebar = () => setCanvasSidebar(false);
  const handleOpenCanvasSidebar = () => setCanvasSidebar(true);
  useEffect(() => {
    const request = async () => {
      setDishes(await getDishes());
    };
    request();
    setCart(getCartItems())
  }, []);
  return (
    <div>
      <Toaster />
      <Modal isOpen={open} setOpen={setOpen} setUser={setUser} />
      <Profile
        show={openProfile}
        setShow={setOpenProfile}
        user={user}
        setUser={setUser}
      />
      <Navbar cart={cart} setOpen={setOpen} setOpenProfile={setOpenProfile} user={user} handleOpenCanvasSidebar={handleOpenCanvasSidebar} />
      <Header />
      <Cart items={cart} setCart={setCart} canvasSidebar={canvasSidebar} handleCloseCanvasSidebar={handleCloseCanvasSidebar} />
      <AboutUs />
      <SpecialMenu setCart={setCart} items={dishes} />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUsPage />
      <Footer />
    </div>
  );
};

export default App;
