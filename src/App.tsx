import React, { useEffect, useState } from "react";

import {distance} from '../utils/distance';
import {getTaxiUrl} from '../utils/taxi';
import { Dice } from "./components/Dice";
import { BarInfo, bars } from "./config/bars";


const App: React.FC = () => {
  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
  );

  const [selectedBar, setSelectedBar] = useState<BarInfo | undefined>(
    bars[Math.trunc(Math.random() * bars.length)]
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPosition(p),
        (err) => {
          throw err;
        }
      );
      /* geolocation is available */
    } else {
      /* geolocation IS NOT available */
    }
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
          padding: "1em",
          paddingBottom: "2em",
          height: "100vh",
        }}
      >
        <div>
          <h1
            className="triple-text"
            style={{ lineHeight: "130%", fontSize: "3em" }}
          >
            <span style={{ position: "relative" }}>Bar</span>
            <br />
            <span style={{ color: "yellow" }}>crawler</span>
          </h1>

          <button
            onClick={() => {
              const nextBars = [...bars];
              const start: [number, number] | undefined = selectedBar
                ? selectedBar[1]
                : position
                ? [position.coords.latitude, position.coords.longitude]
                : undefined;

              if (!start) {
                setSelectedBar(bars[Math.trunc(Math.random() * bars.length)]);
                return;
              }

              const withDistance = nextBars
                .filter((b) => b[0] !== selectedBar?.[0])
                .map((a) => ({
                  bar: a,
                  distance: distance(start[0], a[1][0], start[1], a[1][1]),
                }));

              withDistance.sort((a, b) => a.distance - b.distance);

              const closest = withDistance.slice(0, 5);

              console.log(closest.map((c) => c.distance));

              const pick = closest[Math.trunc(Math.random() * closest.length)];

              setSelectedBar(pick.bar);
            }}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              border: "none",
              fontSize: "1.7em",
              backgroundColor: "black",
              color: "white",
              padding: 0,
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <Dice className="dice-1" value={selectedBar?.[0]} />
            <div style={{ padding: "0 0ch" }}>другой</div>
            <Dice className="dice-2" value={selectedBar?.[0]} />
          </button>
        </div>
        <div>
          <div
            className="back-lit"
            style={{
              padding: "1em",
              color: "var(--color-text)",
            }}
          >
            <h2>{selectedBar?.[0]}</h2>
          </div>
          <div style={{ height: "3em" }}></div>

          <a
            className="back-lit"
            style={{
              display: "grid",
              width: "100%",
              padding: "1em",
              textDecoration: "none",
              placeItems: "center",

              fontSize: "2em",
              // marginBottom: 20,
            }}
            href={getTaxiUrl({
              endLat: selectedBar![1][0],
              endLon: selectedBar![1][1],
              startLat: position?.coords.latitude,
              startLon: position?.coords.longitude,
            })}
          >
            <span className="shadow-text">
              <span className="main">ПОЕХАЛИ</span>
              <span className="second">ПОЕХАЛИ</span>
              <span className="third">ПОЕХАЛИ</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
