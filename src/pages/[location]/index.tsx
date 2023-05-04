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
    "Vegitarian",
    "Mediterranean",
    "Indian",
  ];

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
