import React from "react";
import classes from "./form.module.css";

const form = ({ change, Submit }) => {
  return (
    <div className="content">
      <form className={classes.form} onSubmit={Submit}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              onChange={change}
              required
              autoComplete="off"
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
            />
          </div>
          <div className="col-md-3">
            <input
              onChange={change}
              required
              autoComplete="off"
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-warning">Get Result</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default form;
