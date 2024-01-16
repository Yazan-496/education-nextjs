import React from "react";

const HTMLRenderer = ({ htmlContent, overFlow }) => {
  return (
    <div
      className={`${overFlow ? "flex justify-between space-x-2" : "overflow-y-scroll   max-h-[300px]"}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HTMLRenderer;
