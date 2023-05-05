import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};
type Coords = {
  lat: number;
  long: number;
};

export default function SearchOptions({}: Props) {
  const [coordLocation, setCoordLocation] = useState<Coords | null>(null);
  const [stringLocation, setStringLocation] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([1, 2, 3, 4]);

  const router = useRouter();

  function getLocation() {
    const successCallback = (position: GeolocationPosition) => {
      console.log("getLocation success callback triggered");
      console.log(position);
      setCoordLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
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
    setStringLocation(event.target.value);
    console.log(event.target.value);
  };

  const handleRadiusChange = (event: any) => {
    setSelectedRadius(parseInt(event.target.value));
    console.log(event.target.value);
  };

  const handleRankCuisines = () => {
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("location", location);
    //   localStorage.setItem("radius", selectedRadius.toString());
    //   localStorage.setItem("price", JSON.stringify(selectedPrices));
    // }
    const locationString = () => {
      console.log("Converting location data to url string");
      if (coordLocation) {
        console.log("Using coords location");
        return `latitude=${coordLocation.lat}&longitude=${coordLocation.long}`;
      } else if (stringLocation) {
        console.log("Using string locaton");
        return `location=${encodeURIComponent(stringLocation)}`;
      }
    };

    const optionsString = `&radius=${
      selectedRadius * 1609
    }&price=${selectedPrices.join("&price=")}`;

    console.log(locationString());
    console.log(optionsString);
    console.log(`${locationString()}${optionsString}`);
    router.push(`${locationString()}${optionsString}`);
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
          value={stringLocation ?? ""}
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
