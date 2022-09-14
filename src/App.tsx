import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type BarInfo = [string, [number, number]];

function distance(lat1: number, lat2: number, lon1: number, lon2: number) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  // calculate the result
  return c * r;
}

// Moscow bbox
// 55.911086, 37.369779 top left
// 55.573962, 37.877266 bot right

// bot left 55.573962 37.369779
// top right 55.911086 37.877266

/**
 * @see https://yandex.ru/dev/maps/geocoder/doc/desc/concepts/input_params.html#input_params__geocode-format
 */
const bars: BarInfo[] = [
  ["16 Тонн", [55.764271, 37.564192]],
  ["Pauwel KWAK", [55.700417, 37.512514]],
  ["Bobby Dazzler Pub", [55.767592, 37.635291]],
  ["Bear&Brut", [55.760126, 37.649268]],
  ["Shamrock", [55.913865, 37.86811]],
  ["Эль и Стаут ", [55.668953, 37.559602]],
  ["Брюгге", [55.76995, 37.678975]],
  ["Paulaner Bräuhaus", [55.732837, 37.641909]],
  // "Blacksmith",
  // "The Tipsy Pub",
  // "O’Hara",
  ["St Peter’s & St Anton", [55.756368, 37.60974]],
  ["Drunken Duck Pub", [55.642114, 37.52402]],
  ["Punch & Judy", [55.744595, 37.627363]],
  ["Mollie’s", [55.762528, 37.634403]],
  ["Джон Донн", [55.755462, 37.600417]],
  ["Temple Bar", [55.76025, 37.664007]],
  ["London Pub", [55.761847, 37.62676]],
  // "Pub&Pub",
  ["Йоркшир", [55.783259, 37.52722]],
  // "БирХаус",
  ["Katie O’Shea’s", [55.777251, 37.634422]],
  ["Scotland Yard", [55.768715, 37.613279]],
  // "Шпатен-хаус",
  // "Left Bank",
  // "Pub Daddy",
  // "Пив&Ко",
  // "Дубинин",
  // "Brauhaus G&M",
  // "Посткриптум",
  // "Ганс и Марта",
  // "Черчилль Паб",
  // "Molly Gwynn’s",
  ["PasternakBar", [55.770701, 37.596425]],
  // "Мюнхен",
  // "The Left Bank",
  // "Джонни Грин паб",
  // " O’DONOGHUE’S",
  // "Почтмейстер",
  // "Sally o Brien’s",
  // "Пилзнер",
  // "Madman",
  // "Hungry Fox",
  // "Ян Примус",
  // "Craft&Draft",
  // "Чешский дворик",
  // "Мьюз",
  // "Hooters",
  // "Tap & Barrel",
  // "White Hart Pub",
  // "Too Much53.",
  // "Budweiser Budvar",
  // "Колковна",
  // "Пивная станция",
  // "Денис Давыдов",
  // "Последняя капля",
  // "Бирхен",
  // "Герои",
  // "Lawson`s Bar",
  // "Старина Мюллер",
  // "Гамбринус",
  // "ГлавПивТорг",
  // "Боцман",
  // "Beermarket",
  // "De Bassus",
  // "Джон Сильвер",
  // "Craft Republic",
  // "Sean O’Neill",
  // "Брюссель",
  // "Варка",
  // "Ваня нальет",
  // "Boston Pub",
  // "Dark Patrick’s Pub",
  // "Бельгийская брассери",
  // " Келья",
  // "Челси",
  // " Union Jack",
  // "Ulysses Pub",
  // "John Gilroy’s",
  // "2:2",
  // "Barrique",
  // "Connolly Station",
  // "Cross Keys Pub",
  // "Croydon",
  // "Edward’s",
  // " Grace O’Malley",
  // "Harat’s",
  // "Hungry Fox",
  // "Jawsspot",
  // "Lock Stock",
  // "One More Pub",
  // "In Rocky",
  // "Shagov’s Pub",
  // "Bronze Lion ",
  // "Бонни & Клайд",
  // "Lion’s Head Pub",
];

/**
 * @see https://yandex.ru/dev/taxi/doc/dg/concepts/deeplinks.html
 */
function getTaxiUrl({
  endLat,
  endLon,

  startLat,
  startLon,
}: {
  endLat: number;
  endLon: number;

  startLat?: number;
  startLon?: number;
}): string {
  let res = `https://3.redirect.appmetrica.yandex.com/route?ref=widget&appmetrica_tracking_id=1178268795219780156&utm_source=widget`;

  if (endLat && endLon) {
    res += `&end-lat=${endLat}&end-lon=${endLon}`;
  }

  if (startLat && startLon) {
    res += `&start-lat=${startLat}&start-lon=${startLon}`;
  }

  return res;
}

const dieCordMap: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 2],
    [2, 0],
  ],
  5: [
    [0, 0],
    [0, 2],
    [2, 2],
    [2, 0],
    [1, 1],
  ],
  6: [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 2],
    [2, 1],
    [2, 0],
  ],
};

const Dice: React.FC<{ className?: string; value?: string }> = ({
  className,
  value,
}) => {
  const [diceValue, setDiceValue] = useState(3);
  const [isRot, setIsRot] = useState(false);

  useEffect(() => {
    setIsRot(Math.random() > 0.5);
    setDiceValue(Math.trunc(Math.random() * 6) + 1);
  }, [value]);

  const coords: [number, number][] = dieCordMap[diceValue].map((dot) => {
    let cord = [...dot] as [number, number];
    if (isRot) {
      cord = [dot[1], -dot[0] + 2] as [number, number];
    }
    cord = [10 + 30 * cord[0], 10 + 30 * cord[1]] as [number, number];

    return cord;
  });

  return (
    <div className={"dice " + (className ? className : "")}>
      {coords.map((coord, index) => (
        <div
          className="die"
          key={index}
          style={{
            top: coord[0] + "%",
            left: coord[1] + "%",
          }}
        />
      ))}
    </div>
  );
};

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
