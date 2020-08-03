import React from "react";

const MotionList = ({ motions }) => {
  return (
    <ul data-testid="motion-list">
      {motions.map((motion) => (
        <li key={motion}>{motion}</li>
      ))}
    </ul>
  );
};

export default MotionList;
