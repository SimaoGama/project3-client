import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

const UserTag = ({ userTrips }) => {
  const [userTag, setUserTag] = useState(null);

  useEffect(() => {
    const addUserTag = () => {
      switch (userTrips?.length) {
        case 0:
          setUserTag(
            <>
              Rookie Traveler <StarBorderOutlinedIcon />
            </>
          );
          break;
        case 1:
        case 2:
        case 3:
          setUserTag(
            <>
              Beginner Traveler <StarHalfOutlinedIcon />
            </>
          );
          break;
        case 4:
        case 5:
        case 6:
          setUserTag(
            <>
              Advanced Traveler <StarOutlinedIcon />
            </>
          );
          break;
        default:
          setUserTag(
            <>
              Experienced Traveler <EmojiEventsOutlinedIcon />
            </>
          );
          break;
      }
    };
    addUserTag();
  }, [userTrips?.length]);

  return <Typography>{userTag}</Typography>;
};

export default UserTag;
