import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import './Header.css';

export const Header = () => {

  const navigate = useNavigate();
  
  return (
    <div className="header">
      <header className="headerTitle"> Spacestagram </header>
      <div className="menu">
        <HomeIcon
          onClick={() => navigate("/")}
          fontSize="large"
          sx={{
            marginRight: 2,
            "&:hover": { cursor: "pointer", transform: "scale(1.2)" },
          }}
        ></HomeIcon>
        <FavoriteIcon
          onClick={() => navigate("/Liked")}
          fontSize="large"
          sx={{ "&:hover": { cursor: "pointer", transform: "scale(1.2)" } }}
        ></FavoriteIcon>
      </div>
    </div>
  );
};
