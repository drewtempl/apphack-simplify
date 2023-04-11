import React from "react";
import "./App.css";
import { useState } from "react";
import { ItemList } from "./components/ItemList";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [topTracksData, setTopTrackData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const getLogin = () => {
    // console.log("LOGIN")
    fetch("http://127.0.0.1:5000/user")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setIsLoggedIn(true);
        getTopTracks("medium_term");  
      });

    // setIsLoggedIn(true);
    // getTopTracks("medium_term");
  };

  const getTopTracks = (timeframe) => {
    fetch(`http://127.0.0.1:5000/top-tracks/${timeframe}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTopTrackData(data);
      });
  };

  const makePlaylist = (type, timeframe) => {
    fetch(`http://127.0.0.1:5000/make-playlist/${type}/${timeframe}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (type === 'recommendation') {
          setIsDisabled(true);
        }
        return data;
      });
  };

  return (
    <>
      <div className="header">
        <div>{userData ? `Hi, ${userData.display_name}` : ""}</div>
        <div>Simplify</div>
      </div>
      {!isLoggedIn && (
        <div className="button-container">
          <button onClick={() => getLogin()}>Log in with Spotify</button>
        </div>
      )}
      {isLoggedIn && (
        <div className="body-container">
          <ItemList data={topTracksData} getTopTracks={getTopTracks} makePlaylist={makePlaylist}></ItemList>
          <div className="rec-box">
            <button
              onClick={() => makePlaylist('recommendation', 'medium_term')}
              className="btn btn-primary btn-lg"
              disabled={isDisabled}
            >
              {isDisabled ? "Playlist Created!" : "Make Recommendation Playlist"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
