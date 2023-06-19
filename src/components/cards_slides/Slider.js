import React from "react";
import { Link } from "react-router-dom";
import "./slider.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import OwlCarousel from "react-owl-carousel2";

function Slider({ row }) {
  const { title, srcs } = row;
  const options = {
    items: 6,
    nav: true,
    autoplay: false,
    dots: false,
    loop: false,
    margin: 20,
    slideBy: 5,
    navText: [
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"></path></svg>',
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"></path></svg>',
    ],
  };
  return (
    <div className="col-12">
      <div className="slider-container">
        <h5>{title}</h5>
        <OwlCarousel options={options}>
          {srcs.map(({ id, srcs }, index) => {
            if (id <= 6) {
              return (
                <div className="item" key={id}>
                  <Link to={`/product/${id}`}>
                    <img src={srcs[0].view} alt="" />
                  </Link>
                </div>
              );
            }
            return (
              <div className="item" key={id}>
                <Link to={`/product/${id}`}>
                  <img src={srcs} alt="" />
                </Link>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
  // if (type === "slider") {
  //   return (
  //     <div className="col-12">
  //       <div className="slider-container">
  //         <h5>{title}</h5>
  //         <OwlCarousel options={options}>
  //           {srcs.map(({ id, src }, index) => {
  //             return (
  //               <div className="item" key={id}>
  //                 <Link to={`/product/${id}`}>
  //                   <img src={src} alt="" />
  //                 </Link>
  //               </div>
  //             );
  //           })}
  //         </OwlCarousel>
  //       </div>
  //     </div>
  //   );
  // } else if (type === "icons") {
  //   return (
  //     <div className="col-12">
  //       <div className="slider-container">
  //         <h5>{title}</h5>
  //         <OwlCarousel options={options}>
  //           {srcs.map(({ icon, line1, line2 }, index) => {
  //             return (
  //               <div className="item icon-container">
  //                 <Link to="#" key={index}>
  //                   <div className="icon">{icon}</div>
  //                   <div className="icon-title">
  //                     <div className="div">{line1}</div>
  //                     <div className="div">{line2}</div>
  //                   </div>
  //                 </Link>
  //               </div>
  //             );
  //           })}
  //         </OwlCarousel>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Slider;
