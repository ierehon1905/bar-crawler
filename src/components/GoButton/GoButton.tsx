import React from "react"

import { BarInfo } from "../../entities/bar"
import { getTaxiUrl } from "../../utils/taxi"

type Props = {
    bar: BarInfo
    position?: GeolocationPosition,
    selectCurrentBar: () => void,
    tryIncrementCount: () => void,
}

export function GoButton(p: Props) {
    const barUrl = getTaxiUrl({
        endLat: p.bar.coords[0],
        endLon: p.bar.coords[1],
        startLat: p.position?.coords.latitude,
        startLon:p.position?.coords.longitude,
    });


    function onClick() {
        console.log('Bar selected');
        p.selectCurrentBar();
        p.tryIncrementCount();
    }

    return (
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
            href={barUrl}
            onClick={onClick}
      >
        <span className="shadow-text">
          <span className="main">ПОЕХАЛИ</span>
        </span>
      </a>
    )
}