import React from "react";

type Props = { item: string };

export default function CuisineDndCard({ item }: Props) {
  return (
    <div
      className="cuisine-card"
      style={{ backgroundImage: `url(/cuisines/${item}.jpg)` }}
    >
      <h3 className="cuisine-card__title">{item}</h3>
    </div>
  );
}
