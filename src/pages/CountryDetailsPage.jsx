import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function CountryDetails() {
  const params = useParams();
  //   console.log(params.countryId);

  const [countriesDetails, setCountriesDetails] = useState(null);
  //   console.log(countriesDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://ih-countries-api.herokuapp.com/countries/${params.countryId}`
      )
      .then((response) => {
        // console.log(response.data);
        setCountriesDetails(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [params.countryId]);

  if (loading === true) {
    return (
      <div className="container">
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
        <h2 style={{ fontSize: "20px" }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <p
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "100px" }}
      >
        Country Details
      </p>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${countriesDetails.alpha2Code.toLowerCase()}.png`}
        alt="countryPic"
        width={"80px"}
      />
      <h2 style={{ fontSize: "40px", marginBottom: "50px" }}>{countriesDetails.name.common}</h2>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{width: "30%"}}>Capital</td>
            <td>{countriesDetails.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{countriesDetails.area} km²</td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              {/* <p key={countriesDetails.name}>
                        <Link to= {`/${countriesDetails.alpha3Code}`}>{countriesDetails.borders}</Link>
                    </p> */}
              {/* Necesito mapearlo para que se me pongan en diferentes lineas o .join(",") y lo separo con comas */}
              {countriesDetails.borders.map((eachBorder) => (
                <p key={eachBorder}>
                  <Link to={`/${eachBorder}`}>{eachBorder}</Link>
                </p>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
