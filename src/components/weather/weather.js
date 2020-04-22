import React from "react";
import classes from "./weather.module.css";

const Weather = ({ load, err, icon, text, temp, temp_min, temp_max, desc }) => {
  return (
    <>
      {load ? (
        <div className={classes.content}>
          <div className="cards pt-1">
            <h1>{err ? "404 ! Not Found" : text}</h1>
            <h5 className="py-4">
              <i className={`wi ${err ? null : icon} display-1`}></i>
            </h5>
            <h1 className="py-2">{err ? null : temper(temp)}</h1>
            {!err ? minmaxTemp(temp_min, temp_max) : null}
            <h4 className="py-3"> {err ? err : desc}</h4>
          </div>
        </div>
      ) : null}
    </>
  );
};

const temper = (temp) => {
  return <span>{temp}&deg;</span>;
};

const minmaxTemp = (min, max) => {
  return (
    <h3>
      <span className="px-4">{min}&deg; </span>
      <span className="px-4">{max}&deg; </span>
    </h3>
  );
};

export default Weather;
