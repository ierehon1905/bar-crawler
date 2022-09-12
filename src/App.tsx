import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type BarInfo = [string, [number, number]];

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
  // "St Peter’s & St Anton",
  // "Drunken Duck Pub",
  // "Punch & Judy",
  // "Mollie’s",
  // "Джон Донн",
  // "Temple Bar",
  // "London Pub",
  // "Pub&Pub",
  // "Йоркшир",
  // "БирХаус",
  // "Katie O’Shea’s",
  // "Scotland Yard",
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
  // "PasternakBar",
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

const App: React.FC = () => {
  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
  );
  const [selectedBar, setSelectedBar] = useState<BarInfo | undefined>(
    bars[Math.trunc(Math.random() * bars.length)]
  );
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

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

  useLayoutEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const fullHeight = window.innerHeight;
    const fullWidth = window.innerWidth;

    const spacerHeight = fullHeight - rect!.y - rect!.height;
    setSpacerHeight(spacerHeight);
  }, []);

  return (
    <div>
      <h1>Bar crawler</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        ref={containerRef}
      >
        <h2>{selectedBar?.[0]}</h2>
        <button
          onClick={() =>
            setSelectedBar(bars[Math.trunc(Math.random() * bars.length)])
          }
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            border: "none",
            fontSize: "1.7em",
            backgroundColor: "yellow",
            color: "black",
            padding: "0.2em 0.5em",
            borderRadius: "8px",
          }}
        >
          re-roll
        </button>
        <div
          className="spacer"
          ref={spacerRef}
          style={{ height: spacerHeight }}
        ></div>
        <a
          style={{
            display: "grid",
            width: "50vw",
            height: "50vw",
            backgroundColor: "yellow",
            color: "black",
            textDecoration: "none",
            borderRadius: "51%",
            placeItems: "center",
            fontSize: "2.5em",
            marginBottom: 20,
          }}
          href={getTaxiUrl({
            endLat: selectedBar![1][0],
            endLon: selectedBar![1][1],
            startLat: position?.coords.latitude,
            startLon: position?.coords.longitude,
          })}
        >
          Поехали
        </a>
      </div>
    </div>
  );
};

export default App;
