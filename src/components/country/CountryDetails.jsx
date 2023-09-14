import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import Borders from "./borders/Borders";
import Loader from "../loadingSpinner/Loader";

const CountryDetails = () => {
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${params.id}`
        );

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCountryData();
    setLoading(false);
  }, [params.id]);

  let dynamicNativeName;
  let dynamicCurrency;
  let dynamicLanguages;

  if (country !== null) {
    const nativeName = country.name.nativeName;
    const currency = country.currencies;
    const languages = country.languages;

    for (const name in nativeName) {
      dynamicNativeName = nativeName[name];
    }

    for (const curr in currency) {
      dynamicCurrency = currency[curr];
    }

    for (const lan in languages) {
      dynamicLanguages = languages[lan];
    }
  }

  useEffect(() => {
    if (!country) return;

    const fetchBorders = async () => {
      try {
        const promises = await Promise.all(
          country?.borders?.map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((response) => response.json())
              .then((data) => data)
          )
        );
        setBorders(promises);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBorders();
  }, [country?.borders]);

  const borderCountries = (
    <div className="country__borders-wrapper">
      <h3>Borders:</h3>
      <ul className="country__borders">
        {borders.map((border, index) => (
          <Link key={index} to={`/${border[0]?.name?.common}`}>
            <Borders
              name={border[0]?.name?.common}
              flag={border[0]?.flags.svg}
              region={border[0]?.region}
              capital={border[0]?.capital}
              population={border[0]?.population}
            />
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    country && (
      <section className="country__details">
        <div className="country__details-container container">
          <Link className="country__details-btn" to="/">
            <RiArrowLeftLine /> Back
          </Link>

          {loading && <Loader></Loader>}

          {!loading && (
            <div className="country__details-info">
              <div className="country__details-image">
                <img src={country.flags.svg} alt="" />
              </div>

              <div className="country__details-details">
                <h1 className="country__details-name">{country.name.common}</h1>
                <div className="country__details-grid">
                  <div className="country__details-left">
                    <span>
                      <strong>Native Name:</strong> {dynamicNativeName.common}
                    </span>
                    <span>
                      <strong>Population:</strong>
                      {country.population.toLocaleString("en-US")}
                    </span>
                    <span>
                      <strong>Region:</strong>
                      {country.region}
                    </span>
                    <span>
                      <strong>Sub Region:</strong> {country.subregion}
                    </span>
                    <span>
                      <strong>Capital:</strong>
                      {country.capital[0]}
                    </span>
                  </div>
                  <div className="country__details-right">
                    <span>
                      <strong>Top Level Domain:</strong>
                      {country.tld[0]}
                    </span>
                    <span>
                      <strong>Currency:</strong> {dynamicCurrency.name}
                      {dynamicCurrency.symbol}
                    </span>
                    <span>
                      <strong>Languages:</strong> {dynamicLanguages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && borderCountries}
        </div>
      </section>
    )
  );
};

export default CountryDetails;
