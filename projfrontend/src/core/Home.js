import React from "react";
// import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  // console.log("API IS", API);

  return (
    <React.Fragment>
      <Base>
        <h1 className="text-white">Home</h1>
        <div className="row">
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
        </div>
      </Base>
    </React.Fragment>
  );
};

export default Home;
