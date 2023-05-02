import React from "react";

type Restaurant = {
  id: string;
  name: string;
  rating: number;
};

export default function DisplayRestaurants({
  params,
  location,
  term,
  res,
  data,
}: {
  params: any;
  location: any;
  term: any;
  res: any;
  data: any;
}) {
  console.log(`Params: ${params}`);
  console.log(`Location: ${location}`);
  console.log(`Term: ${term}`);
  console.log(`Response: ${res}`);
  console.log(`Data: ${JSON.stringify(data)}`);
  return (
    <>
      <h1>Testing getServerSideProps with Yelp api</h1>
      <h2>Location: {location}</h2>
      <h2>Term: {term}</h2>
      <ul>
        {data.businesses.map((item: Restaurant) => (
          <li key={item.id}>
            Name: {item.name} Ranking: {item.rating}
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { location: string; term: string };
}) {
  const location = params.location;
  const term = params.term;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer 6kX-SV6hwZt-THNp5K-ER4DL8wRTp8o7SewY0AiV-cRAY03QhtjWxLShEpQK2W7Y0mXqpCbVVIsXH4te0mDXrhehBksFy5qI4-X3kaSnkJx5hAVC2sCDbSYiO3xQZHYx",
    },
  };
  const url = `https://api.yelp.com/v3/businesses/search?${location}&term=${term}&categories=restaurant&open_now=true&sort_by=best_match&limit=20`;

  const response = await fetch(url, options);
  const data = await response.json();

  return { props: { params, location, term, data } };
}
