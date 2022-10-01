import { useEffect, useState } from "react";

export function useGeo() {
    const [position, setPosition] = useState<GeolocationPosition | undefined>();
    const [isGeoUnavailable, setIsGeoUnavailable] = useState<boolean>(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (p) => setPosition(p),
            (err) => {
              setIsGeoUnavailable(true);
              throw err;
            }
          );
          setIsGeoUnavailable(false);
          /* geolocation is available */
        } else {
          setIsGeoUnavailable(true);
          /* geolocation IS NOT available */
        }
      }, []);

    return {
        position,
        isGeoUnavailable
    }
}