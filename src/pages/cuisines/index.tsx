import React, { useState } from "react";
import CuisineCard from "./CuisineCard";
import { useRouter } from "next/router";

type Props = {};

export default function Cuisines({}: Props) {
  const [left, setLeft] = useState<string[]>(["", "", ""]);
  const [right, setRight] = useState<string[]>(["", "", ""]);

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

  function isDisabled() {
    if (left.includes("") || right.includes("")) {
      return true;
    } else return false;
  }

  function getLocalChoices() {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      const radius = Number(localStorage.getItem("radius")) * 1609;
      const prices = JSON.parse(localStorage.getItem("price") ?? "");

      return { location, radius, prices };
    }
  }

  function getRestaurants() {
    const matchingCuisines = left.filter((item) => right.includes(item));
    console.log(matchingCuisines);
    const localChoices = getLocalChoices();
    if (matchingCuisines.length > 0) {
      const result =
        matchingCuisines[Math.floor(Math.random() * matchingCuisines.length)];
      router.push(
        `/${localChoices?.location}&radius=${
          localChoices?.radius
        }&price=${localChoices?.prices.join("&price=")}/${result}`
      );
    } else {
      const allChoices = left.concat(right);
      const remainingCuisines = cuisines.filter((item: string) =>
        allChoices.includes(item)
      );
      const result =
        remainingCuisines[Math.floor(Math.random() * remainingCuisines.length)];
      router.push(
        `/${localChoices?.location}&radius=${
          localChoices?.radius
        }&price=${localChoices?.prices.join("&price=")}/${result}`
      );
    }
  }

  return (
    <div className="cuisine__chooser">
      <h1 className="title">Pick your Top Cuisines!</h1>
      <center>
      <button
        className="navigate-btn"
        onClick={getRestaurants}
        disabled={isDisabled()}
      >
        Get Restaurants
      </button>
      </center>

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
