import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../constants/images";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setOpen, user, setOpenProfile, handleOpenCanvasSidebar, cart, setOpenReservation}) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <div className="nav_nav">
      <nav className="app__navbar d-flex align-items-center">
      <div className="app__navbar-logo" >
        <img src={images.rest} alt="app__logo"/>
      </div>
      <div className="test">
        <ul className="app__navbar-links">
          <li className="p__opensans">
            <a className="text-decoration-none " href="#home">
              Home
            </a>
          </li>
          <li className="p__opensans">
            <a className="text-decoration-none " href="#about">
              About
            </a>
          </li>
          <li className="p__opensans">
            <a className="text-decoration-none " href="#menu">
              Menu
            </a>
          </li>
          <li className="p__opensans">
            <a className="text-decoration-none " href="#awards">
              Awards
            </a>
          </li>
          <li className="p__opensans">
            <a className="text-decoration-none " href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="app__navbar-login">
        {user.name ? (
          <>
            <a className="p__opensans" onClick={()=> setOpenProfile(true)}>{user.name}</a>
            <a className="p__opensans" onClick={()=> handleOpenCanvasSidebar()}>
              <FaShoppingCart />
              <span style={{ marginLeft: 10 }}>{cart?.length}</span>
            </a>
          </>
        ) : (
          <a href="#" onClick={() => setOpen(true)} className="p__opensans">
            Log In / Registration
          </a>
        )}
        <div />
        <a href="#" onClick={()=> setOpenReservation(true)} className="p__opensans">
          Book Table
        </a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li>
                <a href="#home" onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#menu" onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#awards" onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
