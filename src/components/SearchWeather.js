import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchWeather.css";
// import Tractor from "../assets/icons8-tractor.gif";
// import addNotification from "react-push-notification";

const Searchweather = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // const [input, setInput] = useState("");
  const API_KEY = "2479ee2f5a4611b54a6b2598bf697f0c";

  // const Notifications = () => {
  //   addNotification({
  //     title: `${temp} °C ${navigator.geolocation.getCurrentPosition(myIP)}`,
  //     message: "Aaaj Ka Mausam",
  //     duration: 10000,
  //     native: true,
  //   });
  // }

  const myIP = async (location) => {
    const { latitude, longitude } = location.coords;
    console.log(location.coords);
    // get city name using reverse geocoding
    const geo_location = await (
      await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`
      )
    ).json();
    console.log(geo_location);
    setSearch(`${geo_location[0]?.state}`);
    console.log(location);
    // get weather
    const response = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=${API_KEY}`
      )
    ).json();
    console.log(response);
    setData(await response);
    console.log(data);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const location = await (
        await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
        )
      ).json();
      // console.log(location);
      const lon = location[0]?.lon;
      const lat = location[0]?.lat;

      const response = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`
        )
      ).json();
      // console.log(response);
      // setData
      setData(await response);
    };
    fetchWeather();
  }, [search]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myIP);
    } else {
      alert("Geolocation is not enabled/supported by this browser");
    }
  }, []);

  let emoji = null;
  if (typeof data.current !== "undefined") {
    if (data?.current?.weather[0]?.main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data?.current?.weather[0]?.main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data?.current?.weather[0]?.main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data?.current?.weather[0]?.main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data?.current?.weather[0]?.main === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return (
      <div className="preloader" style={{ height: "100vh" }}>
        <div className="loader"></div>
        <div className="load">Loading...</div>
      </div>
    );
  }

  let temp = (data?.current?.temp - 273.15).toFixed(2);
  let temp_min = (data?.daily[0]?.temp?.min - 273.15).toFixed(2);
  let temp_max = (data?.daily[0]?.temp?.max - 273.15).toFixed(2);

  // Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     setSearch(input);
  // }

  return (
    <div>
      <div className="weather m-0">
        <div className="row row-cols-1 m-0">
          <div className="col p-0">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data?.current?.weather[0]?.main}`}
                className="card-img"
                alt={data?.current?.weather[0]?.main}
              />
              <div className="card-img-overlay">
                {/* <button onClick={Notifications}>Notify</button> */}
                <div className="d-flex">
                  <div className="input-group w-50 mx-auto">
                    <i
                      className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white bg-success"
                      role="button"
                      aria-hidden="true"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(myIP);
                        } else {
                          alert(
                            "Geolocation is not enabled in this browser. enable geolocation to use this feature"
                          );
                        }
                      }}
                    >
                      {" "}
                      Locate
                    </i>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-success mx-2">
                      <Link to="/login" className="text-white unstyled">
                        Login
                      </Link>
                    </button>
                    <button className="btn btn-warning mx-2">
                      <Link to="/pest-in" className="text-white unstyled">
                        Pest Info
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="bg-dark bg-opacity-50 my-5 py-3">
                  <h2 className="card-title capitalize">{search}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-2x`}></i>
                  <h1 className="fw-bolder mb-3">
                    {(data?.current?.temp - 273.15).toFixed(2)} &deg;C
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {data?.current?.weather[0]?.main}
                  </p>
                  <p className="lead">
                    Minimum feel {temp_min}&deg;C | Maximum feel {temp_max}
                    &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col p-0"
            style={{
              border: "2px solid teal",
              marginTop: 20,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <h1 className="text-center my-5">4-days Forcasts</h1>
            {data.daily.slice(1, 5).map((item, idx) => {
              let temp = (item?.temp?.day - 273.15).toFixed(2);
              let temp_min = (item?.temp?.min - 273.15).toFixed(2);
              let temp_max = (item?.temp?.max - 273.15).toFixed(2);

              let d = new Date(item.dt * 1000);
              let date = d.getDate();
              let year = d.getFullYear();
              let month = d.toLocaleString("default", { month: "long" });
              let day = d.toLocaleString("default", { weekday: "long" });

              return (
                <div
                  key={idx}
                  className="p-3"
                  style={{
                    border: "2px solid teal",
                    borderRadius: 20,
                  }}
                >
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                  </p>
                  <hr />
                  <h1 className="fw-bolder mb-3">{temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-0">
                    {item?.weather[0]?.main}
                  </p>
                  <p className="lead">
                    Minimum feel {temp_min}&deg;C | Maximum feel {temp_max}
                    &deg;C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchweather;
