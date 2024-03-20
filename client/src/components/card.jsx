import React from "react";
import "./card.css";

const card = ({ title, summary, imageUrl }) => {
  return (
    <>
      <div className="container">
        <div className="imgbox">
          <img src={imageUrl} alt="img" />
        </div>
        <div className="contentbox">
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
      </div>
    </>
  );
};

export default card;
