import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { Route, Routes } from "react-router-dom";
import Apod from './Pages/Apod';
import Liked from './Pages/Liked';
import { useEffect, useState } from "react";
import { Header } from './Components/Header/Header';

function App() {
  const [liked, setLiked] = useState([]);

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '50px',
    transition: transitions.FADE,
    type: 'error',
    color: 'red',
    containerStyle: {
      zIndex: 100
    }
  }

  const AlertTemplate = ({ message }) => (
    <div>{message}</div>
  );

  const saveToLocalStorage = (items) => {
    localStorage.setItem('liked', JSON.stringify(items));
  }

  const addCardToLiked = (newCard) => {
    const newLikedList = [...liked, newCard];
    setLiked(newLikedList);
    saveToLocalStorage(newLikedList);
  };

  const removeCardFromLiked = (card) => {
    const newLikedList = liked.filter((likedCard) => likedCard.title !== card.title);
    setLiked(newLikedList);
    saveToLocalStorage(newLikedList);
  }

  useEffect(() => {
    const likedPhotos = JSON.parse(localStorage.getItem('liked'));
    setLiked(likedPhotos);
  }, []);



  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <div >
      <Header></Header>
        <Routes>
            <Route path="/" element={<Apod addCardToLiked={addCardToLiked} removeCardFromLiked={removeCardFromLiked} liked={liked}/>} exact/>
            <Route path="/Liked" element={<Liked addCardToLiked={addCardToLiked} removeCardFromLiked={removeCardFromLiked} liked={liked} />} exact/>  
        </Routes> 
    </div>
    </AlertProvider>
  );
}

export default App;
