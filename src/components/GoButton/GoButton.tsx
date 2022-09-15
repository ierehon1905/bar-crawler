import React from "react"

import { BarInfo } from "../../entities/bar"
import { getTaxiUrl } from "../../utils/taxi"

type Props = {
    bar: BarInfo
    position?: GeolocationPosition,
    selectCurrentBar: () => void,
    tryIncrementCount: () => void,
    textStyle: any,
}

export function GoButton(p: Props) {
    const barUrl = getTaxiUrl({
        endLat: p.bar.coords[0],
        endLon: p.bar.coords[1],
        startLat: p.position?.coords.latitude,
        startLon:p.position?.coords.longitude,
    });


    function onClick() {
        p.selectCurrentBar();
        p.tryIncrementCount();
    }

    return (
        <a
            style={{
                display: "grid",
                width: "100%",
                padding: "1em",
                ...(p.textStyle || {}),
                // marginBottom: 20,
            }}
            className="blinking"
            href={barUrl}
            onClick={onClick}
      >
        <span className="shadow-text">
          <span className="main">
            GO
          </span>
        </span>
      </a>
    )
}