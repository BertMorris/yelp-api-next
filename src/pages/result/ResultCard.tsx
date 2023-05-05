import React from "react";

type Props = {
  data: {
    id: string;
    name: string;
    image_url: string;
    url: string;
    display_phone: string;
    review_count: number;
    rating: number;
    display_address: string[];
    price: string;
  };
};

export default function ResultCard({ data }: Props) {
  return <div>{data.name}</div>;
}
