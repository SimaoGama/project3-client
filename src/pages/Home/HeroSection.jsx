import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { ButtonComponent } from "./ButtonComponent";
import TypeWriterEffect from "react-typewriter-effect";
import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

const HeroSection = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { isLoggedIn, user } = useContext(AuthContext);

  const textFontSize = isMobile ? "0.8em" : "1.2em";

  // Function to handle the completion of the typing effect
  useEffect(() => {
    // Delay the appearance of the buttons after 10 seconds
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 10500);

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    } else {
      setShowButtons(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // Delay the appearance of the buttons after 10 seconds
      const timer = setTimeout(() => {
        setShowSubtitle(true);
      }, 9000);

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    } else {
      setShowSubtitle(true);
    }
  }, []);

  return (
    <div className="hero-container">
      <h1>
        EXPLORE
        <span>
          <TypeWriterEffect
            textStyle={{
              color: "#4cceac",
              fontSize: textFontSize,
              textAlign: "center",
            }}
            startDelay={100}
            cursorColor="#3F3D56"
            multiText={["NEW PLACES", "NEW CITIES", "NEW CULTURES", "NOW!"]}
            multiTextDelay={1000}
            typeSpeed={100}
            // onEndTyping={handleTypingComplete} // Call the function when typing is completed
          />
        </span>{" "}
      </h1>
      <p className={`subtitle-text ${showSubtitle ? "show" : ""}`}>
        {isLoggedIn
          ? "Start creating your next trip"
          : "Start your journey now"}
      </p>
      <div className={`hero-btns ${showButtons ? "show" : ""}`}>
        {/* Add 'show' class when showButtons is true */}
        <ButtonComponent
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          to={!isLoggedIn ? "/signup" : "/dashboard"}
        >
          {!isLoggedIn ? "GET STARTED" : "DASHBOARD"}
        </ButtonComponent>
        <ButtonComponent
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          to={!isLoggedIn ? "/login" : "/trips"}
        >
          {!isLoggedIn ? "LOG IN" : "TRIPS"}{" "}
          <i className="far fa-play-circle" />
        </ButtonComponent>
      </div>
    </div>
  );
};

export default HeroSection;
