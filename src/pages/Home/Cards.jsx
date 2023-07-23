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
              text="Explore brand new places"
              label="Adventure"
              path="/"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Explore brand new places"
              label="Exploration"
              path="/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-7.jpg"
              text="Explore brand new places"
              label="Cultural"
              path="/"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Explore brand new places"
              label="Sports"
              path="/"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Explore brand new places"
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
