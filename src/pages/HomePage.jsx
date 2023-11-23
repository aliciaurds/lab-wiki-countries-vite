import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(" https://ih-countries-api.herokuapp.com/countries ")
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading === true) {
    return (
      <div className="container" style={{ maxHeight: "90vh" }}>
        <h1 style={{ fontSize: "24px" }}>
          WikiCountries: Your Guide to the World
        </h1>
        <h2 style={{ fontSize: "20px" }}>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="container" style={{ maxHeight: "90vh" }}>
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>
      {countries.map((eachCountry) => {
        return (
          <li className="list-group" key={eachCountry.name.common}>
            
            <Link            
              className="list-group-item list-group-item-action"
              to={`/${eachCountry.alpha3Code}`}
            >
              <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt="countryPic" width={"40px"} />
              <p>{eachCountry.name.common}</p>
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default HomePage;
