import { useRouter } from "next/router";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

type Props = {};
type Coords = {
  lat: number;
  long: number;
};

export default function SearchOptions({}: Props) {
  const [coordLocation, setCoordLocation] = useState<Coords | null>(null);
  const [stringLocation, setStringLocation] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([1, 2, 3, 4]);

  const router = useRouter();

  function isDisabled() {}

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
    if (coordLocation || stringLocation) {
      if (selectedPrices.length === 0) {
        alert("Please select at least one price level");
      } else {
        const locationString = () => {
          console.log("Converting location data to url string");
          if (coordLocation) {
            console.log("Using coords location");
            return `latitude=${coordLocation.lat}&longitude=${coordLocation.long}`;
          } else if (stringLocation) {
            console.log("Using string locaton");
            return `location=${encodeURIComponent(stringLocation)}`;
          } else return null;
        };

        const optionsString = `&radius=${
          selectedRadius * 1609
        }&price=${selectedPrices.join("&price=")}`;

        console.log(locationString());
        console.log(optionsString);
        console.log(`${locationString()}${optionsString}`);

        router.push(`${locationString()}${optionsString}`);
      }
    } else {
      alert("Please provide a location");
    }
  };

  return (
    <div className="options__container">
      <header className="options__header">
        <h1 className="options__title">Starters</h1>
      </header>

      <form className="options__form">
        {coordLocation ? (
          <h3>Using current location</h3>
        ) : (
          <div className="options__location">
            <button className="action-btn" type="button" onClick={getLocation}>
              Get Location
            </button>
            <span> or </span>
            <label className="offscreen" htmlFor="location">
              Enter Location:
            </label>
            <input
              className="location__input"
              type="text"
              id="location"
              name="location"
              placeholder="City, State or Zip"
              value={stringLocation ?? ""}
              onChange={handleLocationChange}
            />
          </div>
        )}

        <div className="options__radius">
          <label className="radius__label" htmlFor="radius">
            Within {selectedRadius} miles
          </label>
          <input
            className="radius__slider"
            type="range"
            id="radius"
            name="radius"
            min="5"
            max="20"
            step="1"
            value={selectedRadius}
            onChange={handleRadiusChange}
          />
        </div>

        <div className="options__price">
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
        <button
          className="navigate-btn"
          type="button"
          onClick={handleRankCuisines}
        >
          View cuisines!
        </button>
      </form>
    </div>
  );
}
