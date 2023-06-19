import React, { useState, useRef, useEffect } from "react";
import Submenu from "./submenu/Submenu";
import { Link } from "react-router-dom";
import { BiMap, BiCaretDown, BiCartAlt, BiSearchAlt } from "react-icons/bi";
import { BsFillCaretDownFill } from "react-icons/bs";
import "./navbar.css";
import { searchCategories } from "../../data";
import { useGlobalContext } from "../../context";

export default function Navbar() {
  // SUBMENU STATE
  const { subMenuOpen, setsubMenuOpen } = useGlobalContext();
  // SUBMENU POSITION STATE
  const [subMenuCenter, setSubMenuCenter] = useState({});
  // WHICH SUBMENU TO MOUNT (language or account)
  const [subMenuType, setSubMenuType] = useState("");
  // SUBMENU REFRECNE
  const subRef = useRef(null);
  // SELECTED LANGUAGE STATE
  const [selectedlanguage, setSelectedLanguage] = useState("English - En");
  // SELECTBOX STATE
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // SELECTED CATEGORY
  const [selectedCat, setSelectedCat] = useState("all");

  // CALLED TO SHOW SUBMENU IN ITS PLACE
  const showSubMenu = (e) => {
    setsubMenuOpen(true);
    setSubMenuType(e.target.getAttribute("data-type"));
    const elementPosition = e.target.getBoundingClientRect(),
      center = {
        right: elementPosition.right,
        top: elementPosition.bottom + 4,
      };
    setSubMenuCenter(center);
  };

  // CALLED TO SPECIFY SUBMENU POSITION
  useEffect(() => {
    const submenu = subRef.current;
    if (submenu) {
      submenu.style.left = `${subMenuCenter.right}px`;
      submenu.style.top = `${subMenuCenter.top}px`;
      submenu.style.opacity = "1";
    }
  }, [subMenuCenter]);
  return (
    <nav className="navbar" onMouseLeave={() => setsubMenuOpen(false)}>
      <div className="container-fluid">
        {subMenuOpen && (
          <div
            className="submenu"
            ref={subRef}
            onMouseEnter={() => setsubMenuOpen(true)}
            onMouseLeave={() => setsubMenuOpen(false)}
          >
            <Submenu
              setsubMenuOpen={setsubMenuOpen}
              type={subMenuType}
              selectedlanguage={selectedlanguage}
              center={subMenuCenter}
            />
          </div>
        )}

        <div className="nav-left">
          <Link to="/">
            <div className="logo-container">
              <img
                src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="logo"
                className="logo"
              />
            </div>
          </Link>

          <div className="deliverto">
            <BiMap className="map-icon" />
            <div className="text">
              <div>delive to</div>
              <div>Egypt</div>
            </div>
          </div>
        </div>
        <form className="search">
          <div
            className="select"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <div className="selected">
              <span>{selectedCat}</span>
              <BsFillCaretDownFill className="icon" />
            </div>
            <ul className={`select-ul ${isSelectOpen ? `` : `hidden`}`}>
              {searchCategories.map((cat, index) => {
                return (
                  <li onClick={() => setSelectedCat(cat)} key={index}>
                    {cat}
                  </li>
                );
              })}
            </ul>
          </div>
          <input type="text" placeholder="search by name and category" />
          <div className="search-icon">
            <BiSearchAlt />
          </div>
        </form>

        <div className="nav-right">
          <div
            className="lang-select position-relative"
            onMouseEnter={showSubMenu}
          >
            <Link
              to="/language"
              className="overlay"
              data-type="language"
            ></Link>
            <img
              src="https://icons.iconarchive.com/icons/wikipedia/flags/512/US-United-States-Flag-icon.png"
              alt="flag"
              className="lang-flag"
            />
            <BiCaretDown />
          </div>

          <div
            className="greeting position-relative"
            onMouseEnter={showSubMenu}
          >
            <Link to="/account" className="overlay" data-type="account"></Link>
            <div className="line-one">hello, ibrahim</div>
            <div className="list-container">
              <div className="line-two">account &amp; lists</div>
              <BiCaretDown />
            </div>
          </div>

          <div className="reutrns-and-orders">
            <Link to="/returns&amp;oreders">
              <div className="line-one">returns</div>
              <div className="line-two">&amp; orders</div>
            </Link>
          </div>

          <div className="cart">
            <div className="icon-w-num">
              <span>0</span>
              <BiCartAlt className="icon" />
            </div>
            <span className="text">cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
