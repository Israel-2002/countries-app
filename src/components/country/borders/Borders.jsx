import React from "react";

const Borders = ({ name, flag, region, capital, population }) => {
  return (
    <li className="country country--border">
      <div className="country__image">
        <img src={flag} alt={`${name} flag`} />
      </div>

      <div className="country__info">
        <div className="country__name">
          <strong>Country:</strong>
          {name}
        </div>
        <span className="country__population">
          <strong>Population:</strong>
          {population.toLocaleString("en-US")}
        </span>
        <span className="country__region">
          <strong>Region:</strong>
          {region}
        </span>
        <span className="country__capital">
          <strong>Capital:</strong>
          {capital}
        </span>
      </div>
    </li>
  );
};

export default Borders;
