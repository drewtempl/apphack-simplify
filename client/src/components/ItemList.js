import React from "react";
import { useState } from "react";
import "../App.css";

export const ItemList = ({ data, getTopTracks, makePlaylist }) => {
  const [activeButton, setActiveButton] = useState("medium_term");
  const [isDisabled, setIsDisabled] = useState([]);
  // console.log(data)
  // console.log(getTopTracks);

  const handleClick = (time_type) => {
    getTopTracks(time_type);
    setActiveButton(time_type);
  };

  return (
    <div className="list-container">
      <div className="list-header">Top Tracks</div>
      <div className="list-options">
        <p>Time period:</p>
        <button
          className={
            activeButton === "short_term" ? "btn btn-success" : "btn btn-dark"
          }
          onClick={() => {
            getTopTracks("short_term");
            setActiveButton("short_term");
          }}
        >
          Last 4 weeks
        </button>
        <button
          className={
            activeButton === "medium_term" ? "btn btn-success" : "btn btn-dark"
          }
          onClick={() => {
            getTopTracks("medium_term");
            setActiveButton("medium_term");
          }}
        >
          Last 6 months
        </button>
        <button
          className={
            activeButton === "long_term" ? "btn btn-success" : "btn btn-dark"
          }
          onClick={() => {
            getTopTracks("long_term");
            setActiveButton("long_term");
          }}
        >
          All time
        </button>
      </div>
      <div className="create-playlist-wapper">
        <button
          className="btn btn-primary"
          disabled={isDisabled.includes(activeButton)}
          onClick={() => {
            makePlaylist("top-tracks", activeButton);
            setIsDisabled(isDisabled.concat(activeButton));
          }}
        >
          {isDisabled.includes(activeButton)
            ? "Playlist created!"
            : "Create playlist"}
        </button>
      </div>
      <div className="list-wrapper">
        <ol>
          {data.map((item) => {
            return (
              <li>
                <div className="list-item">
                  <img src={item.album_image} alt="album_cover" />
                  <p>{item.artist_name}</p>
                  <p>-</p>
                  <p>{item.name}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
