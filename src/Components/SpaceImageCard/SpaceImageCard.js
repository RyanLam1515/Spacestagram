import React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import Heart from "react-animated-heart";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import './SpaceImageCard.css';


const SpaceImageCard = ({
    date, 
    explanation, 
    img_url,
    title,
    value,
    key, 
    addCardToLiked,
    removeCardFromLiked,
    isLikedPage,
    liked
}) => {

    // const { addCardToLiked, liked } = useContext(GlobalContext);
    const [isClick, setClick] = useState(false);



    const handleLikeButtonClick = () => {
        if (!liked.some((card) => card.title === value.title)) {
        setClick(!isClick)
        addCardToLiked(value);
        } 
    }

    const handleRemoveLikeButtonClick = () => {
        if (liked.some((card) => card.title === value.title)) {
            setClick(!isClick);
            removeCardFromLiked(value);
        }
    }
    const likeButtonDisabled = liked.some((card) => card.title === value.title);

    const shareUrl = 'https://www.youtube.com/watch?v=9WzIACv_mxs';

    return (
        <div className='spaceImageCard'>
            <img className='spaceImg'
                src={img_url}
                alt ={title}
                />
            <div className='spaceImageInfo'> 
            <div className='spaceImageHeader'>
            <div className="shareableLinksContainer">
                <FacebookShareButton url={shareUrl} quote={title}>
                    <FacebookIcon size={40}></FacebookIcon>    
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl} title={title} summary={explanation} source='NASA Astrony Picture of the Day API'>
                    <LinkedinIcon size={40}></LinkedinIcon>
                </LinkedinShareButton>
                <TwitterShareButton url={shareUrl} title={title} via='NASA Astrony Picture of the Day API'>
                    <TwitterIcon size={40}></TwitterIcon>
                </TwitterShareButton>
            </div>
            <h3 className='spaceImageTitle'>{title} - {date}</h3>
            </div>
            <p className='explanation'>{explanation}</p>
            {isLikedPage ? 

            <Button
                variant="contained"
                onClick= { () => handleRemoveLikeButtonClick()}
                endIcon= {<Heart isClick={true} onClick={() => handleRemoveLikeButtonClick()}/>}
                sx={{display: 'flex', alignItems: 'left', height: 50, width: 1 }}
            >
                Unlike
            </Button>
            : 
            <Button 
                variant="contained" 
                onClick={ () => handleLikeButtonClick()}
                endIcon={< Heart isClick={isClick} onClick={() => handleLikeButtonClick()}/>}
                sx={{display: 'flex', alignItems: 'left', height: 50, width: 1 }}
                disabled={likeButtonDisabled}
                >
                Like
            </Button> }
            </div>
            
        </div>
    )
}

export default SpaceImageCard;