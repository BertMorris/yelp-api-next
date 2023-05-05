import React from "react";
import Image from "next/image";

type Restaurant = {
  name: string;
  image_url: string;
  url: string;
  rating: number;
  review_count: number;
};

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="rest-card">
      <Image
        className="rest-card__image"
        src={restaurant.image_url}
        alt={`${restaurant.name} image`}
        height="100"
        width="100"
      ></Image>
      <div className="rest-card__info">
        <h2 className="rest-card__title">{restaurant.name}</h2>
        <div className="rest-card__yelp">
          <div className="rest-card__reviews">
            <Image
              src={`/stars/stars_${restaurant.rating
                .toString()
                .replace(".", "-")}.png`}
              alt={`${restaurant.rating} stars`}
              height="15"
              width="90"
            />
            <span className="rest-card__review-count">
              {restaurant.review_count}
            </span>
          </div>
          <a className="rest-card__link" href={restaurant.url}>
            <Image
              src="/yelp_logo.svg"
              alt="View on yelp"
              width="50"
              height="25"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
