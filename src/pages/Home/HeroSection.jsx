import { Box, Button, Typography } from "@mui/material";
import { ButtonComponent } from "./ButtonComponent";
import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* go to css and disable the img overwritting the video */}
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted />{" "} */}
      <h1>EXPLORE NEW PLACES</h1>
      <p>Start your journey now</p>
      <div className="hero-btns">
        <ButtonComponent
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          GET STARTED
        </ButtonComponent>
        <ButtonComponent
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </ButtonComponent>
      </div>
    </div>
  );
};

export default HeroSection;
