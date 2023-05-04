import React, { useState } from "react";
import CuisineCard from "./CuisineCard";
import { useRouter } from "next/router";

type Props = {};

export default function Cuisines({}: Props) {
  const [left, setLeft] = useState<string[]>(["", "", ""]);
  const [right, setRight] = useState<string[]>(["", "", ""]);
  const [location, setLocation] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const router = useRouter();
  const cuisines = [
    "American",
    "Italian",
    "French",
    "Chinese",
    "Mexican",
    "Thai",
    "Vegetarian",
    "Mediterranean",
    "Indian",
  ];

  const handleOptionClick = (option: any) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    console.log(selectedOptions);

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

  function isDisabled() {
    if (left.includes("") || right.includes("")) {
      return true;
    } else return false;
  }

  function getRestaurants() {
    const matchingCuisines = left.filter((item) => right.includes(item));
    console.log(matchingCuisines);
    if (matchingCuisines.length > 0) {
      const result =
        matchingCuisines[Math.floor(Math.random() * matchingCuisines.length)];
      router.push(`${router.asPath}/${result}`);
    } else {
      const allChoices = left.concat(right);
      const remainingCuisines = cuisines.filter((item: string) =>
        allChoices.includes(item)
      );
      const result =
        remainingCuisines[Math.floor(Math.random() * remainingCuisines.length)];
      router.push(`${router.asPath}/${result}`);
    }
  }

  return (
    <div className="cuisine__chooser">
      <h1 className="title">Pick your top cuisines!</h1>
      <button
        className="get-restaurants"
        onClick={getRestaurants}
        disabled={isDisabled()}
      >
        Get Restaurants
      </button>

      <form>
        <label htmlFor="radius">Select Radius:</label>
        <select
          id="radius"
          name="radius"
          value={selectedRadius}
          onChange={handleRadiusChange}
        >
          <option value={1}>Less than 1 mile</option>
          <option value={10}>Less than 10 miles</option>
          <option value={25}>Less than 25 miles</option>
          <option value={50}>Less than 50 miles</option>
          <option value={100}>Less than 100 miles</option>
        </select>
      </form>

      <form>
        <label htmlFor="location">Enter Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g. New York City"
          value={location}
          onChange={handleLocationChange}
        />
      </form>

      <div className="App">
        <h1>Select Options:</h1>
        <div className="button-group">
          <button
            className={`button ${
              selectedOptions.includes(1) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(1)}
          >
            $
          </button>
          <button
            className={`button ${
              selectedOptions.includes(2) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(2)}
          >
            $$
          </button>
          <button
            className={`button ${
              selectedOptions.includes(3) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(3)}
          >
            $$$
          </button>
          <button
            className={`button ${
              selectedOptions.includes(4) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(4)}
          >
            $$$$
          </button>
        </div>
      </div>

      <div className="side-by-side">
        <ul className="cuisine__list">
          {cuisines.map((item) => (
            <CuisineCard key={item} name={item} side={left} setSide={setLeft} />
          ))}
        </ul>
        <ul className="cuisine__list">
          {cuisines.map((item) => (
            <CuisineCard
              key={item}
              name={item}
              side={right}
              setSide={setRight}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
