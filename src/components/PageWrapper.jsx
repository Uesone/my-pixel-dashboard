// components/PageWrapper.jsx
import React from "react";

const PageWrapper = ({ children, style = {} }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      ...style,
    }}
  >
    {children}
  </div>
);

export default PageWrapper;
