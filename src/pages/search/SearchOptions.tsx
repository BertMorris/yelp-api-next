import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

export default function SearchOptions({}: Props) {
  const [location, setLocation] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);

  const router = useRouter();

  function getLocation() {
    const successCallback = (position: GeolocationPosition) => {
      console.log("getLocation success callback triggered");
      console.log(position);
      setLocation(
        `latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
      );
    };
    const errorCallback = () =>
      console.log("An error occurred getting the users location");
    if (navigator.geolocation) {
      console.log("User allowed location access");
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("User did not allow location access");
    }
  }

  const handleOptionClick = (option: any) => {
    if (selectedPrices.includes(option)) {
      setSelectedPrices(
        selectedPrices.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedPrices([...selectedPrices, option]);
    }

    console.log(selectedPrices);

    // console.log(containsFour);
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  const handleRadiusChange = (event: any) => {
    setSelectedRadius(parseInt(event.target.value));
    console.log(event.target.value);
  };

  const handleRankCuisines = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("location", location);
      localStorage.setItem("radius", selectedRadius.toString());
      localStorage.setItem("price", JSON.stringify(selectedPrices));
    }

    router.push("/cuisines");
  };

  return (
    <>
      <h1>Begin your restaurant search!</h1>
      <form className="options__form">
        <button className="action-btn" type="button" onClick={getLocation}>
          Get Location
        </button>
        <span>or</span>
        <label htmlFor="location">Enter Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g. New York City"
          value={location}
          onChange={handleLocationChange}
        />
        <label htmlFor="radius">Search Radius:</label>
        <select
          id="radius"
          name="radius"
          value={selectedRadius}
          onChange={handleRadiusChange}
        >
          <option value={1}>1 mile</option>
          <option value={10}>10 miles</option>
          <option value={25}>25 miles</option>
          <option value={50}>50 miles</option>
          <option value={100}>100 miles</option>
        </select>

        <div className="button-group">
          <button
            className={`button ${selectedPrices.includes(1) ? "selected" : ""}`}
            type="button"
            onClick={() => handleOptionClick(1)}
          >
            $
          </button>
          <button
            className={`button ${selectedPrices.includes(2) ? "selected" : ""}`}
            type="button"
            onClick={() => handleOptionClick(2)}
          >
            $$
          </button>
          <button
            className={`button ${selectedPrices.includes(3) ? "selected" : ""}`}
            type="button"
            onClick={() => handleOptionClick(3)}
          >
            $$$
          </button>
          <button
            className={`button ${selectedPrices.includes(4) ? "selected" : ""}`}
            type="button"
            onClick={() => handleOptionClick(4)}
          >
            $$$$
          </button>
        </div>
      </form>
      <button
        className="navigate-btn"
        type="button"
        onClick={handleRankCuisines}
      >
        Rank cuisines!
      </button>
    </>
  );
}
