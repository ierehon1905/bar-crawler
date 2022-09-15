import { useEffect, useState } from "react";

export function useGeo() {
    const [position, setPosition] = useState<GeolocationPosition | undefined>();

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

    return {
        position
    }
}