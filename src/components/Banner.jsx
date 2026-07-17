import React from 'react';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>🔥 Upcoming Offers</h2>
        <p>Get ready for our biggest sale of the year! <br /> 
        <span className="highlight">Up to 50% off</span> on electronics, fashion, and more.</p>
        <div className="banner-timer">
          <span>⏳ Starts in: <strong>2 days</strong></span>
        </div>
      </div>
    </div>
  );
};

export default Banner;