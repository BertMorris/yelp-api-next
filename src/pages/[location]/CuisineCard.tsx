import React from "react";

type Props = {
  key: string;
  name: string;
  side: string[];
  setSide: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CuisineCard({ key, name, side, setSide }: Props) {
  function updateRanks(
    cuisineName: string,
    rankSide: string[],
    newRank: number
  ) {
    const newRanks = rankSide.map((item: string) =>
      item === cuisineName ? "" : item
    );
    newRanks[newRank - 1] = cuisineName;

    return newRanks;
  }
  return (
    <li className="cuisine" key={key}>
      <h2 className="cuisine__title">{name}</h2>
      <div className="cuisine__btn-group">
        <button
          className="cuisine__btn"
          type="button"
          onClick={() => setSide(updateRanks(name, side, 1))}
        >
          First
        </button>
        <button
          className="cuisine__btn"
          type="button"
          onClick={() => setSide(updateRanks(name, side, 2))}
        >
          Second
        </button>
        <button
          className="cuisine__btn"
          type="button"
          onClick={() => setSide(updateRanks(name, side, 3))}
        >
          Third
        </button>
      </div>
    </li>
  );
}
