import { useEffect, useState } from "react";

/**
 * @see https://yandex.ru/dev/maps/geocoder/doc/desc/concepts/input_params.html#input_params__geocode-format
 */
const bars = [
  "16 Тонн",
  "Pauwel KWAK",
  "Blacksmith",
  "Bobby Dazzler Pub",
  "Bear&Brut ",
  "Shamrock",
  "Эль и Стаут ",
  "Брюгге",
  "Paulaner Bräuhaus",
  "The Tipsy Pub",
  "O’Hara",
  "St Peter’s & St Anton",
  "Drunken Duck Pub",
  "Punch & Judy",
  "Mollie’s",
  "Джон Донн",
  "Temple Bar",
  "London Pub",
  "Pub&Pub",
  "Йоркшир",
  "БирХаус",
  "Katie O’Shea’s",
  "Scotland Yard",
  "Шпатен-хаус",
  "Left Bank",
  "Pub Daddy",
  "Пив&Ко",
  "Дубинин",
  "Brauhaus G&M",
  "Посткриптум",
  "Ганс и Марта",
  "Черчилль Паб",
  "Molly Gwynn’s",
  "PasternakBar",
  "Мюнхен",
  "The Left Bank",
  "Джонни Грин паб",
  " O’DONOGHUE’S",
  "Почтмейстер",
  "Sally o Brien’s",
  "Пилзнер",
  "Madman",
  "Hungry Fox",
  "Ян Примус",
  "Craft&Draft",
  "Чешский дворик",
  "Мьюз",
  "Hooters",
  "Tap & Barrel",
  "White Hart Pub",
  "Too Much53.",
  "Budweiser Budvar",
  "Колковна",
  "Пивная станция",
  "Денис Давыдов",
  "Последняя капля",
  "Бирхен",
  "Герои",
  "Lawson`s Bar",
  "Старина Мюллер",
  "Гамбринус",
  "ГлавПивТорг",
  "Боцман",
  "Beermarket",
  "De Bassus",
  "Джон Сильвер",
  "Craft Republic",
  "Sean O’Neill",
  "Брюссель",
  "Варка",
  "Ваня нальет",
  "Boston Pub",
  "Dark Patrick’s Pub",
  "Бельгийская брассери",
  " Келья",
  "Челси",
  " Union Jack",
  "Ulysses Pub",
  "John Gilroy’s",
  "2:2",
  "Barrique",
  "Connolly Station",
  "Cross Keys Pub",
  "Croydon",
  "Edward’s",
  " Grace O’Malley",
  "Harat’s",
  "Hungry Fox",
  "Jawsspot",
  "Lock Stock",
  "One More Pub",
  "In Rocky",
  "Shagov’s Pub",
  "Bronze Lion ",
  "Бонни & Клайд",
  "Lion’s Head Pub",
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

function App() {
  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
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
      <h1>App</h1>

      <a
        href={getTaxiUrl({
          endLat: 55.734452,
          endLon: 37.58783,
          startLat: position?.coords.latitude,
          startLon: position?.coords.longitude,
        })}
      >
        test
      </a>
    </div>
  );
}

export default App;
