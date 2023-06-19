import React from "react";
import Card from "./Card";
import Slider from "./Slider";
import { rows } from "../../data";

function CardsOrSlider() {
  return (
    <section className="cards-slides">
      <div className="container-fluid">
        {rows.map((row, index) => {
          if (row.type === "card") {
            return (
              <div className="row">
                <Card items={row.items} key={index} />
              </div>
            );
          } else if (row.type === "slider" || row.type === "icon") {
            console.log(row);
            return (
              <div className="row">
                <Slider row={row} key={index} />
              </div>
            );
          }
          return false;
        })}
      </div>
    </section>
  );
}

export default CardsOrSlider;
