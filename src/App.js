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
import { getCurrentUser, getDishes } from "./Axios";

const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser ] = useState(getCurrentUser())
  const [dishes, setDishes] = useState([])
  useEffect(()=> {
    const request = async ()=> {
      setDishes(await getDishes())
    }
    request()
  }, [])
  return (
    <div>
      <Toaster />
      <Modal isOpen={open} setOpen={setOpen} setUser={setUser}/>
      <Navbar setOpen={setOpen} user={user} setUser={setUser} />
      <Header />
      <AboutUs />
      <SpecialMenu items={dishes} />
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
