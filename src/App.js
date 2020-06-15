import React, { useState, useEffect } from "react";
import Weather from "./components/weather/weather";
import axios from "axios";
import Form from "./components/form/form";
import classes from "./App.module.css";
import { API } from "./config";
//API
const { key, url } = API;

function App() {
  const [load, setLoad] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [text, setText] = useState(`${city},${country}`);
  const [temp, setTemp] = useState("");
  const [temp_min, setTemp_min] = useState("");
  const [temp_max, setTemp_max] = useState("");
  const [icons, setIcons] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setErr] = useState("");
  const celcius = (i) => {
    return Math.floor(i - 273.15);
  };
  useEffect(() => {
    const res = () => {
      if (text || load) {
        axios
          .get(`${url}${text}&appid=${key}`)
          .then((res) => {
            const r = res.data;
            setLoad(true);
            setCity(r.name);
            setCountry(r.sys.country);
            setTemp(celcius(r.main.temp));
            setTemp_max(celcius(r.main.temp_max));
            setTemp_min(celcius(r.main.temp_min));
            setDesc(r.weather[0].description);
            getIcon(icon, r.weather[0].id);
          })
          .catch((err) => setErr("Country or City don't match"));
      }
    };
    res();
  }, [text]);

  //handleChange
  const handleChange = (e) => {
    const { value, name } = e.target;
    name === "country" ? setCountry(value) : setCity(value);
    setErr("");
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setText(`${city},${country}`);
  };
  const icon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };
  const getIcon = (Icons, id) => {
    switch (true) {
      case id >= 200 && id <= 232:
        setIcons(icon.Thunderstorm);
        break;
      case id >= 300 && id <= 321:
        setIcons(icon.Drizzle);
        break;
      case id >= 500 && id <= 531:
        setIcons(icon.Rain);
        break;
      case id >= 600 && id <= 622:
        setIcons(icon.Snow);
        break;
      case id >= 701 && id <= 781:
        setIcons(icon.Atmosphere);
        break;
      case id === 800:
        setIcons(icon.Clear);
        break;
      case id >= 801 && id <= 804:
        setIcons(icon.Clouds);
        break;
      default:
        setIcons(icon.Clouds);
    }
  };
  return (
    <div className={classes.App}>
      <Form Submit={handleSubmit} change={handleChange} />
      <Weather
        load={load}
        err={error}
        text={text}
        temp={temp}
        temp_min={temp_min}
        temp_max={temp_max}
        desc={desc}
        icon={icons}
      />
    </div>
  );
}

export default App;
