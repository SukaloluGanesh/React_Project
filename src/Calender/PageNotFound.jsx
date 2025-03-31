import React from "react";
import notFound from "../assets/NotFound.jpg";
import giffy from "../assets/CodePen-404-Page.gif";

const PageNotFound = () => {
  let styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={styles}>
      <img src={giffy} alt="" />
    </div>
  );
};

export default PageNotFound;
