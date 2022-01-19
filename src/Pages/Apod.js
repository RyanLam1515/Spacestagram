import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SpaceImageCard from "../Components/SpaceImageCard/SpaceImageCard";
import DatePicker from "../Components/DatePicker";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

export const Apod = ({ addCardToLiked, removeCardFromLiked, liked }) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [apodData, setApodData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="alert red-bg">{message}</div>
  );

  const fetchPhotoOfTheDay = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=sgpDRzjwPF83CAOaVvqU7tDSdz6Rc8J2ywbEbNQN&start_date=${startDate
          .toISOString()
          .substring(0, 10)}&end_date=${endDate.toISOString().substring(0, 10)}`
      );

      if (data) {
        setApodData(data.filter((data) => data.media_type !== "video"));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotoOfTheDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div>
        <div className="datePickerContainer">
          <DatePicker
            maxDate={today}
            startDate={startDate}
            endDate={endDate}
            isStartDate={true}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          ></DatePicker>
          <DatePicker
            maxDate={today}
            startDate={startDate}
            endDate={endDate}
            isStartDate={false}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          ></DatePicker>
        </div>
        <div className="spaceImageCardContainer">
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            apodData &&
            apodData.map((value) => (
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
                isLikedPage={false}
              />
            ))
          )}
        </div>
      </div>
    </AlertProvider>
  );
};

export default Apod;
