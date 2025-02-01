import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        if (results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error("Error fetching Netflix originals:", error);
        setMovie(null);
      }
    })();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? `${str.substr(0, n - 1)}...` : str;

  if (!movie) return null; // Prevents rendering if no movie data is available

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};

export default Banner;
