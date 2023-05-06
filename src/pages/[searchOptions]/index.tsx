import React, { Dispatch, SetStateAction, useState } from "react";
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
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const router = useRouter();
  const { searchOptions } = router.query;
  const result = getResults();

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

  function handleClick() {
    if (currentUser === "left") {
      setCurrentUser("right");
    } else getRestaurants();
  }

  const Instructions = ({
    setCurrentUser,
  }: {
    setCurrentUser: Dispatch<SetStateAction<string | null>>;
  }) => {
    return (
      <div className="instructions">
        <p className="instructions__text">Drag and drop to rank each option!</p>
        <button
          className="navigate-btn"
          type="button"
          onClick={() => setCurrentUser("left")}
        >
          View Cuisines!
        </button>
      </div>
    );
  };

  return (
    <div className="cuisine__chooser">
      <header className="cuisine__header">
        <h1 className="cuisine__title">Cuisines!</h1>
        <button className="action-btn" type="button" onClick={handleClick}>
          {currentUser === "left" ? "Next User" : "Restaurants"}
        </button>
      </header>
      {!currentUser ? (
        <Instructions setCurrentUser={setCurrentUser} />
      ) : currentUser === "left" ? (
        <CuisineDndList itemList={leftList} setItemList={setLeftList} />
      ) : (
        <CuisineDndList itemList={rightList} setItemList={setRightList} />
      )}
    </div>
  );
}
