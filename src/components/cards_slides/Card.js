import React from "react";
import { Link } from "react-router-dom";
import "./cardorslide.css";

function MultiCard({ item }) {
  const { title, cards } = item;
  return (
    <div className="col-md-3 card-col">
      <div className="card-container">
        <h5 className="heading">{title}</h5>
        <div className="row small-row">
          {cards.map(({ link, title, imgsrc }, index) => {
            return (
              <div className="col-6" key={index}>
                <div className="small-img">
                  <Link to={link} className="img-link">
                    <img src={imgsrc} alt="" />
                  </Link>
                  <h6>{title}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SingleCard({ item }) {
  const { link, title, imgsrc } = item;
  return (
    <div className="col-md-3 card-col">
      <div className="card-container">
        <h5 className="heading">{title}</h5>
        <Link to={link} className="img-link">
          <img src={imgsrc} alt="" />
        </Link>
        <Link to={link} className="bottom-link">
          explore more
        </Link>
      </div>
    </div>
  );
}

function SplitCard({ item }) {
  return (
    <div className="col-md-3 card-col">
      <div className="split-container card-container">
        <div className="split">
          <h4>sign in for the best experience</h4>
          <button>sign in securley</button>
        </div>

        <Link to={item.link} className="img-link">
          <img src={item.imgsrc} alt="" />
        </Link>
      </div>
    </div>
  );
}
export default function Card({ items }) {
  return items.map((item, index) => {
    if (item.type === "multi-img") {
      return <MultiCard item={item} key={index} />;
    } else if (item.type === "single-card") {
      return <SingleCard item={item} key={index} />;
    }
    return <SplitCard item={item} key={index} />;
  });
}
