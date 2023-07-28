import React from "react";
import Lottie from "lottie-react";
import attractionAnimation from "../../lotties/attractionAnimation.json";

function IsLoadingAttraction() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Adjust the height and width to fit the available space
  const containerStyle = {
    height: "100%", // Set the height to 100% of the parent
    width: "100%", // Set the width to 100% of the parent
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: "800px",
  };

  return (
    <div style={containerStyle}>
      <Lottie
        options={defaultOptions}
        animationData={attractionAnimation}
        height={400} // Adjust the height as needed
        width={400} // Adjust the width as needed
      />
    </div>
  );
}

export default IsLoadingAttraction;
