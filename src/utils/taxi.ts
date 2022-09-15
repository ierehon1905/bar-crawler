/**
 * @see https://yandex.ru/dev/taxi/doc/dg/concepts/deeplinks.html
 */
 export function getTaxiUrl({
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