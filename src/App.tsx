import React, { useEffect, useState } from "react";

import { Bar } from "./components/Bar";
import { Dice } from "./components/Dice";
import { Menu } from "./components/Menu/Menu";
import { BarInfo, bars } from "./config/bars";
import {distance} from './utils/distance';
import { randomChoise } from "./utils/random";
import {getTaxiUrl} from './utils/taxi';


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


  function getCandidates() {
      const nextBars = [...bars];

      const start: [number, number] | undefined = selectedBar
        ? selectedBar[1]
        : position
        ? [position.coords.latitude, position.coords.longitude]
        : undefined;

      if(!start) {
        return [];
      }

      const withDistance = nextBars
        .filter((b) => b[0] !== selectedBar?.[0])
        .map((a) => ({
          bar: a,
          distance: distance(start[0], a[1][0], start[1], a[1][1]),
        }));
      
      const closest = withDistance.slice(0, 10);

      return closest;
  }


  function randomBar() {
    const candidates = getCandidates();

    console.log(candidates);

    let step = 0;
    const MAX_STEPS = 10;

    const interval = setInterval(() => {
      if (step > MAX_STEPS) {
        clearInterval(interval)
      } else {
        step++
      }

      const candidate = randomChoise(candidates);

      console.log(candidate);

      setSelectedBar(candidate.bar);
    }, 300)
  }

  return (
    <div className="main">
      <div className="logo">
        <span>BAR</span>
        <br />
        <span>CRAWLER</span>
      </div>
    
      <div className="section" style={{marginTop: '53px'}}>
        <Menu />
      </div>


      <div className="section" style={{marginTop: '24px'}}>
        <Bar barName={selectedBar?.[0] || 'Bar'} />
      </div>

      <div className="section" style={{marginTop: '52px'}}>
        <button
          onClick={randomBar}
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
    
      {selectedBar && 
        <a
          className="go-btn"
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
          </span>
        </a>
      }
    </div>
  );
};

export default App;
