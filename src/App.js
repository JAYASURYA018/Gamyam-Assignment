import React, { useState, useEffect } from "react";
import LandDetails from "./components/LandDetails";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating API call
    fetch(
      "https://prod-be.1acre.in/lands/?division=24&page_size=10&page=2&ordering=-updated_at"
    ) // Replace with your actual API endpoint
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <LandDetails data={data} />
    </div>
  );
};

export default App;
