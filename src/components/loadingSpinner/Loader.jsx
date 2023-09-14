import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
    return (
      <div
        style={{
          height: "50vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <InfinitySpin width="200" color="#fff" />
      </div>
    );
};

export default Loader;
