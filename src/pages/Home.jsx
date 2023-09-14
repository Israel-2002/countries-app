import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Country from "../components/country/Country";
import Loader from "../components/loadingSpinner/Loader";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [dynamicCountries, setDynamicCountries] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);

  const searchValHandler = (event) => {
    setSearchVal(event.target.value);
    setRegion("");
  };

  const selectRegionHandler = (event) => {
    setRegion(event.target.value);
  };

  const options = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) throw new Error("Couldnt fetch data");

        const data = await response.json();
        setCountries(data);
        setDynamicCountries(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCountriesData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (searchVal.trim() === "" && region.length === 0) {
      setDynamicCountries(countries);
      return;
    }

    if (searchVal.trim() !== "") {
      const filteredCountries = countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchVal.trim().toLowerCase())
      );
      setDynamicCountries(filteredCountries);
    }

    if (
      searchVal.trim() === "" &&
      region.length > 0 &&
      region !== "Filter By Region"
    ) {
      const filteredCountries = countries.filter((country) =>
        country.region.toLowerCase().includes(region.toLowerCase())
      );
      setDynamicCountries(filteredCountries);
    }
  }, [searchVal, region]);

  const countriesList = dynamicCountries.map((country, index) => (
    <Link key={index} to={`${country.name.common}`}>
      <Country
        name={country.name.common}
        capital={country.capital}
        flag={country.flags.svg}
        region={country.region}
        population={country.population}
      />
    </Link>
  ));

  return (
    <>
      <section className="home">
        <div className="home__container container">
          <div className="home__countries-config">
            <div className="home__search">
              <RiSearch2Line className="home__search-icon" />
              <input
                type="search"
                placeholder="Search for a country..."
                onChange={searchValHandler}
                value={searchVal}
              />
            </div>

            <select
              className="home__select"
              value={region}
              onChange={selectRegionHandler}
            >
              <option>Filter By Region</option>
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          {loading && <Loader></Loader>}

          {!loading && <ul className="home__countries">{countriesList}</ul>}
        </div>
      </section>
    </>
  );
};

export default Home;
