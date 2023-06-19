import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./submenu.css";
import { languages, accountLinks } from "../../../data";

function Submneu2({ type, selectedlanguage, center }) {
    const { right, top } = center;
    const subRef = useRef(null);

    useEffect(() => {
      const submenu = subRef.current;
      if (submenu) {
        submenu.style.left = `${right}px`;
        submenu.style.top = `${top}px`;
      }
    }, [center]);

    const Language = () => {
      return (
        <>
          <span>change language</span>
          <Link to="#">learn more</Link>
          <div className="selected-language">
            {languages.map((lang) => {
              if (lang === selectedlanguage) {
                return (
                  <Link to="#">
                    <div className="radio-box">
                      <span className="radio-circle">
                        <span className="radio-dot"></span>
                      </span>
                      <span className="lang-name">{lang}</span>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
          <div className="languages">
            {languages.map((lang) => {
              if (lang !== selectedlanguage) {
                return (
                  <div className="radio-box">
                    <Link to="#">
                      <span className="radio-circle"></span>
                      <span className="lang-name">{lang}</span>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </>
      );
    };

    const Account = () => {
      return (
        <div className="submenu account" ref={subRef}>
          <div>
            <h5>your lists</h5>
            <div className="link-box">
              <Link to="#">create list</Link>
            </div>
            <div className="link-box">
              <Link to="#">find a list or directory</Link>
            </div>
            <div className="link-box">
              <Link to="#">amazon smile</Link>
            </div>
          </div>
          <div>
            <h4>your account</h4>
            {accountLinks.map((link) => {
              return (
                <div className="link-box">
                  <Link to="#">{link}</Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

  return <div className='submenu'>
      { if(type === 'language') {
          
      } }
  </div>;
}

export default Submneu2;
