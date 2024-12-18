import React, { forwardRef } from "react";

const LandCard = forwardRef(({ land }, ref) => {
  return (
    <div className="land-card" ref={ref}>
      <h3>{land.name}</h3>
      <p>{land.description}</p>
    </div>
  );
});

export default LandCard;
