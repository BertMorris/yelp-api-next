import React from "react";
import ResultCard from "../../components/ResultCard";

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

export default function Result({ data }: Props) {
  return (
    <div className="cuisine__chooser">
      <header className="cuisine__header">
        <h1 className="result__title">
          On this occasion, you will be dining at..
        </h1>
      </header>

      <ResultCard data={data} />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH}`,
    },
  };
  const url = `https://api.yelp.com/v3/businesses/${id}`;

  const response = await fetch(url, options);
  const data = await response.json();

  return { props: { params, data } };
}
