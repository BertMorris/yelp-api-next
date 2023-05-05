import React, { useState } from "react";
import RestaurantDndList from "../../components/RestaurantDndList";
import { useRouter } from "next/router";

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  image_url: string;
  url: string;
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
  const [leftList, setLeftList] = useState(data.businesses);
  const [rightList, setRightList] = useState(data.businesses);

  const router = useRouter();

  const result = getResult();

  function getResult() {
    // transform ranking array into object
    let rankings = leftList.reduce(
      (object: object, currentValue: Restaurant, currentIndex: number) => {
        return { ...object, [currentValue.id]: [currentIndex] };
      },
      {}
    );
    //  append second user's ranking to rankings object
    rightList.forEach((element: Restaurant, index: number) => {
      rankings[element.id].push(index);
    });
    console.log(`Rankings: ${JSON.stringify(rankings)}`);
    // find lowest (highest ranked) cuisines
    let lowScores: string[] = [];
    let lowScore = 30;
    Object.keys(rankings).forEach((element) => {
      const score = rankings[element].reduce(
        (sum: number, num: number) => sum + num
      );
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

  function getRestaurant() {
    console.log(`Result rest id: ${result}`);
    router.push(`/result/${result}`);
  }

  // console.log(`Params: ${params}`);
  // console.log(`Location: ${location}`);
  // console.log(`Term: ${term}`);
  // console.log(`Response: ${res}`);
  // console.log(`Data: ${JSON.stringify(data)}`);
  // console.log(`Left list: ${leftList}`);

  return (
    <>
      <h1>Rank these {term} restaurants!</h1>
      <button className="navigate-btn" onClick={getRestaurant}>
        Get Result
      </button>
      <div className="side-by-side">
        <RestaurantDndList itemList={leftList} setItemList={setLeftList} />
        <RestaurantDndList itemList={rightList} setItemList={setRightList} />
      </div>

      {/* <ul className="flex flex-col gap-2">
        {data.businesses.map((item: Restaurant) => (
          <li key={item.id}>
            <RestaurantCard
              restaurant={item}
            />
          </li>
        ))}
      </ul> */}
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
      Authorization: `Bearer ${process.env.API_AUTH}`,
    },
  };
  const url = `https://api.yelp.com/v3/businesses/search?${location}&term=${term}&categories=restaurant&open_now=true&sort_by=best_match&limit=20`;

  const response = await fetch(url, options);
  const data = await response.json();

  return { props: { params, location, term, data } };
}
