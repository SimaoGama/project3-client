import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Find out your NEXT destination!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Journey to the unknown, and make memories that last a lifetime."
              label="Adventure"
              path="/"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Embark on unforgettable adventures around the world."
              label="Exploration"
              path="/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-2.jpg"
              text="Uncover the beauty of diverse cultures and landscapes."
              label="Cultural"
              path="/"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Discover extraordinary places you've never imagined."
              label="Sports"
              path="/"
            />
            <CardItem
              src="images/img-6.jpg"
              text="Wander freely and let curiosity be your compass."
              label="Beach time"
              path="/"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
