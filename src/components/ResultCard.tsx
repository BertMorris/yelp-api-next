import React from "react";
import Image from "next/image";

type Props = {
  data: {
    id: string;
    name: string;
    image_url: string;
    url: string;
    display_phone: string;
    review_count: number;
    rating: number;
    location: { display_address: string[] };
    price: string;
  };
};

export default function ResultCard({ data }: Props) {
  return (
    <div className="result-card">
      <Image
        className="result-card__image"
        src={data.image_url}
        alt={`${data.name} image`}
        height="400"
        width="400"
      />
      <h2 className="result-card__title">{data.name}</h2>
      <div className="result-card__reviews">
        <Image
          src={`/stars/stars_${data.rating.toString().replace(".", "-")}.png`}
          alt={`${data.rating} stars`}
          height="18"
          width="102"
        />
        <span className="result-card__review-count">{data.review_count}</span>
        <a className="result-card__link" href={data.url}>
          <Image
            src="/yelp_logo.svg"
            alt="View on yelp"
            width="70"
            height="35"
          />
        </a>
      </div>
      <div className="result-card__info">
        <div className="address">
          {data.location.display_address.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div>{data.display_phone}</div>
      </div>
    </div>
  );
}
