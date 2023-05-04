import Link from "next/link";
import { useEffect, useState } from "react";

type Coords = {
  lat: number;
  long: number;
};

export default function Home() {
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  // const [radius, setRadius] = useState(10000);
  const [term, setTerm] = useState("mexican");

  // get user location
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    const successCallback = (position: GeolocationPosition) => {
      console.log("getLocation success callback triggered");
      console.log(position);
      setUserLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    };
    const errorCallback = () =>
      console.log("An error occurred getting the users location");
    if (navigator.geolocation) {
      console.log("User allowed location access");
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("User did not allow location access");
    }
  }

  function handleClickTerm(word: string) {
    setTerm(word);
  }

  return (
    <div>
      <h1>
        Testing google places api to find restaurants by location and keyword
      </h1>
      <h2>
        Lat: {userLocation?.lat ?? "no latitude data"} Long:{" "}
        {userLocation?.long ?? "no long data"}
      </h2>
      {/* <div>
        <button
          className={`p-2 border-2 ${term === "mexican" && "bg-slate-400"}`}
          type="button"
          onClick={() => handleClickTerm("mexican")}
        >
          Mexican
        </button>
        <button
          className={`p-2 border-2 ${term === "italian" && "bg-slate-400"}`}
          type="button"
          onClick={() => handleClickTerm("italian")}
        >
          Italian
        </button>
        <button
          className={`p-2 border-2 ${term === "pub" && "bg-slate-400"}`}
          type="button"
          onClick={() => handleClickTerm("pub")}
        >
          Pub
        </button>
      </div> */}
      <Link
        href={`/latitude=${userLocation?.lat}&longitude=${userLocation?.long}`}
      >
        Choose Cuisine
      </Link>
    </div>
  );
}
