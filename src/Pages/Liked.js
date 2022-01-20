import React from "react";
import SpaceImageCard from "../Components/SpaceImageCard/SpaceImageCard";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const Liked = ({ liked, addCardToLiked, removeCardFromLiked }) => {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "50px",
    transition: transitions.FADE,
    type: "error",
    color: "red",
    containerStyle: {
      zIndex: 100,
    },
  };

  const AlertTemplate = ({ message }) => (
    <div>{message}</div>
  );

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {liked && liked.length > 0 ? (
        <div className="spaceImageCardContainer">
          {liked.map((value) => (
            <SpaceImageCard
              key={value.title}
              date={value.date}
              explanation={value.explanation}
              img_url={value.url}
              title={value.title}
              value={value}
              addCardToLiked={addCardToLiked}
              removeCardFromLiked={removeCardFromLiked}
              liked={liked}
              isLikedPage={true}
            />
          ))}
        </div>
      ) : (
        <h2 className="noLikedPhotos">No photos currently liked</h2>
      )}
    </AlertProvider>
  );
};

export default Liked;
