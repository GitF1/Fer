// src/components/CinemaDetail.js
import React from "react";
import "./style/CinemaDetail.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API } from "../../utils/api";

const CinemaDetail = () => {
  const { id } = useParams();

  const [cinema, isLoading, error] = useFetch(`${API.CINEMA}/${id}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) throw new Error(error);

  return (
    <div className="cinema-detail">
      <div className="cinema-breadcrumb">
        <span>
          🏠 Cinema {">"} Rạp phim {">"} {cinema?.name}
        </span>
      </div>
      <div
        className="cinema-banner"
        style={{ backgroundImage: `url(${cinema?.bannerImage})` }}
      ></div>
      <div className="cinema-info">
        <img src={cinema?.logo} alt={cinema?.name} className="cinema-logo" />
        <div className="cinema-details">
          <h1>{cinema?.name}</h1>
          <p>{cinema?.description}</p>
          <div className="cinema-rating">
            <span>⭐ {cinema?.rating} / 5</span>
            <span>👤 {cinema?.reviews} reviews</span>
          </div>
          <div className="cinema-location">
            <span>📍 {cinema?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaDetail;
