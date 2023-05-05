import React, { useState } from "react";
import { useRouter } from "next/router";
import CuisineDndList from "../../components/CuisineDndList";

const CUISINES = [
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

type Props = {};

export default function Cuisines({}: Props) {
  const [leftList, setLeftList] = useState<string[]>(CUISINES);
  const [rightList, setRightList] = useState<string[]>(CUISINES);
  const [leftUserLocked, setLeftUserLocked] = useState(false);
  const [rightUserLocked, setRightUserLocked] = useState(false);

  const router = useRouter();
  const { searchOptions } = router.query;
  const result = getResults();
  // const localChoices = getLocalChoices();

  // const rankings = leftList.reduce((currentValue, currentIndex) => ({
  //   ...object,
  //   [key]: [],
  // }));

  // function isDisabled() {
  //   if (left.includes("") || right.includes("")) {
  //     return true;
  //   } else return false;
  // }

  // function getLocalChoices() {
  //   if (typeof window !== "undefined") {
  //     const location = localStorage.getItem("location");
  //     const radius = Number(localStorage.getItem("radius")) * 1609;
  //     const prices = JSON.parse(localStorage.getItem("price") ?? "");

  //     return { location, radius, prices };
  //   }
  // }

  function getResults() {
    // transform ranking array into object
    let rankings = leftList.reduce(
      (object: object, currentValue: string, currentIndex: number) => {
        return { ...object, [currentValue]: [currentIndex] };
      },
      {}
    );
    //  append second user's ranking to rankings object
    rightList.forEach((element: string, index: number) => {
      rankings[element].push(index);
    });
    console.log(rankings);
    // find lowest (highest ranked) cuisines
    let lowScores: string[] = [];
    let lowScore = 20;
    Object.keys(rankings).forEach((element) => {
      const score = rankings[element].reduce((sum, num) => sum + num);
      if (score < lowScore) {
        lowScores = [element];
        lowScore = score;
      } else if (score === lowScore) {
        lowScores.push(element);
      }
    });
    console.log(lowScores);
    // in the event of more than one cuisine having the same score choose the cuisine with the smallest max score
    if (lowScores.length > 1) {
      const maxScoresList = lowScores.map((element: string) =>
        Math.max(...rankings[element])
      );
      const minMaxScore = Math.min(...maxScoresList);
      console.log(`Minmaxscore: ${minMaxScore}`);
      const result = lowScores[maxScoresList.indexOf(minMaxScore)];
      return result;
    } else {
      const result = lowScores[0];
      return result;
    }
  }

  function getRestaurants() {
    console.log(`Left: ${leftList} Right:${rightList}`);
    console.log(result);
    console.log(`Search Options: ${searchOptions}`);
    router.push(`/${searchOptions}/${result}`);
  }

  return (
    <div className="cuisine__chooser">
      <h1 className="title">Pick your top cuisines!</h1>
      <div className="lock-btn-group">
        <button
          className="action-btn"
          type="button"
          onClick={() => setLeftUserLocked(true)}
        >
          Lock in
        </button>
        <button
          className="navigate-btn"
          disabled={!(leftUserLocked && rightUserLocked)}
          onClick={getRestaurants}
        >
          Get Restaurants
        </button>
        <button
          className="action-btn"
          type="button"
          onClick={() => setRightUserLocked(true)}
        >
          Lock in
        </button>
      </div>
      <div className="side-by-side">
        <CuisineDndList itemList={leftList} setItemList={setLeftList} />
        <CuisineDndList itemList={rightList} setItemList={setRightList} />
      </div>
    </div>
  );
}
