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
import { getCurrentUser, getDishes, getCartItems, getMyOrders } from "./Axios";
import Profile from "./components/profile";
import Cart from "./components/Cart";
import ReservationTable from "./components/ReservationTable";
import Axios from "./Axios";

const App = () => {
  const [open, setOpen] = useState(false);
  const [openReservation, setOpenReservation] = useState(false);
  const [orders, setOrders] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [canvasSidebar, setCanvasSidebar] = useState(false);
  const [bookings, setBookings] = useState([]);
  const bookingRequest = async () => {
    const response = await Axios.get("/bookings");
    if (response.data.success) {
      setBookings(response.data.content);
    }
  };
  const handleCloseCanvasSidebar = () => setCanvasSidebar(false);
  const handleOpenCanvasSidebar = () => setCanvasSidebar(true);
  useEffect(() => {
    const request = async () => {
      setDishes(await getDishes());
    };
    request();
    setCart(getCartItems());
    bookingRequest()
  }, []);
  const request = async () => {
    const response = await getMyOrders();
    if (response.success) {
      setOrders(response.content);
    }
  };
  return (
    <div>
      <Toaster />
      <Modal isOpen={open} setOpen={setOpen} setUser={setUser} />
      <ReservationTable show={openReservation} hide={setOpenReservation} bookingRequest={bookingRequest} />
      <Profile 
        bookings={bookings}
        orderRequest={request}
        orders={orders}
        show={openProfile}
        setShow={setOpenProfile}
        user={user}
        setUser={setUser}
      />
      <Navbar
        setOpenReservation={setOpenReservation}
        cart={cart}
        setOpen={setOpen}
        setOpenProfile={setOpenProfile}
        user={user}
        handleOpenCanvasSidebar={handleOpenCanvasSidebar}
      />
      <Header />
      <Cart
        orderFetch={request}
        items={cart}
        setCart={setCart}
        canvasSidebar={canvasSidebar}
        handleCloseCanvasSidebar={handleCloseCanvasSidebar}
      />
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
