/**
 * На некоторых платформах могут отсутствовать некоторые типы
 */
enum TransportType {
  Automobile = "auto",
  PublicTransport = "mt",
  Pedestrian = "pd",
  Scooter = "sc",
  Bicycle = "bc",
  Taxi = "taxi",
}

/**
 * @see https://yandex.ru/dev/yandex-apps-launch/maps/doc/concepts/About.html
 */
export function getMapsUrl({
  endLat,
  endLon,

  startLat,
  startLon,
  transportType = TransportType.Pedestrian,
}: {
  endLat: number;
  endLon: number;

  startLat: number;
  startLon: number;

  transportType?: TransportType;
}) {
  return `yandexmaps://maps.yandex.ru/?rtext=${startLat},${startLon}~${endLat},${endLon}&rtt=${transportType}`;
}
