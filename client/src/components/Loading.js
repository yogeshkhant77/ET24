import React from "react";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="hand-tap-loader">
          <div className="palm">
            <div className="thumb"></div>
            <div className="finger"></div>
            <div className="finger"></div>
            <div className="finger"></div>
            <div className="finger"></div>
          </div>
        </div>
        <p className="loading-text">Connecting to server...</p>
      </div>
    </div>
  );
};

export default Loading;
