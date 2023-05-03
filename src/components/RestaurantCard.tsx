import React from "react";
import Image from "next/image";

type Props = {
  name: string;
  imageUrl: string;
  url: string;
  rating: number;
  reviews: number;
};

export default function RestaurantCard({
  name,
  imageUrl,
  url,
  rating,
  reviews,
}: Props) {
  return (
    <div className="flex rounded-lg shadow-sm">
      <Image
        src={imageUrl}
        alt={`${name} image`}
        height="100"
        width="100"
      ></Image>
      <div className="px-4 flex flex-col">
        <h2 className="pb-4 text-xl">{name}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Image
              src={`/stars/stars_${rating.toString().replace(".", "-")}.png`}
              alt={`${rating} stars`}
              height="25"
              width="100"
            />
            <a href={url}>
              <Image
                src="/yelp_logo.svg"
                alt="View on yelp"
                width="50"
                height="25"
              />
            </a>
          </div>
          <p className="text-sm">Based on {reviews} reviews</p>
        </div>
      </div>
    </div>
  );
}
