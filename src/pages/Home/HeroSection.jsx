import { Box, Button, Typography } from "@mui/material";
import { ButtonComponent } from "./ButtonComponent";
import TypeWriterEffect from "react-typewriter-effect";
import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [showButtons, setShowButtons] = useState(false);

  // Function to handle the completion of the typing effect
  useEffect(() => {
    // Delay the appearance of the buttons after 10 seconds
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 10000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-container">
      {/* go to css and disable the img overwriting the video */}
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted />{" "} */}
      <h1>
        EXPLORE
        <span>
          <TypeWriterEffect
            textStyle={{
              color: "#4cceac",
              fontSize: "1.2em",
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
      <p>Start your journey now</p>
      <div className={`hero-btns ${showButtons ? "show" : ""}`}>
        {/* Add 'show' class when showButtons is true */}
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
