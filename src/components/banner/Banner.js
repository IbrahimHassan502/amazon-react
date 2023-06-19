import React from "react";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import OwlCarousel from "react-owl-carousel2";
import { bannerCarousel } from "../../data";
import "./Banner.css";
import { useGlobalContext } from "../../context";

export default function Banner() {
  const { setsubMenuOpen } = useGlobalContext();
  const options = {
    items: 1,
    autoplay: true,
    dots: false,
    loop: true,
    navText: [
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"></path></svg>',
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"></path></svg>',
    ],
  };
  return (
    <section className="banner" onMouseOver={() => setsubMenuOpen(false)}>
      <OwlCarousel options={options}>
        {bannerCarousel.map(({ imgsrc, link }, index) => {
          return (
            <Link to={link} key={index}>
              <div className="item">
                <img src={imgsrc} alt="" />
              </div>
            </Link>
          );
        })}
      </OwlCarousel>
    </section>
  );
}
