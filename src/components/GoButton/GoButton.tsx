import { motion } from "framer-motion";
import React from "react"

import { BarInfo } from "../../entities/bar"
import { getTaxiUrl } from "../../utils/taxi"

type Props = {
    bar: BarInfo;
    position?: GeolocationPosition;
    selectCurrentBar: () => void;
    tryIncrementCount: () => void;
    textStyle: any;
    isRandoming: boolean;
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
      <motion.div 
        className="go-btn blinking" 
        style={{
          pointerEvents: p.isRandoming ? 'none' : 'all',
          backgroundColor: p.textStyle.color,
          boxShadow: p.textStyle.textShadow,
        }}
        variants={{
          randoming: {
            scaleY: 0,
            scaleX: 2,
            opacity: 0,
            transition: {delay: 0.1, duration: 0.2, bounce: 2}
          },
          default: {
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
            transition: {delay: 0.3, duration: 0.2, bounce: 2}
          }
        }}
        animate={p.isRandoming ? 'randoming' : 'default'}
      >
        <a
          style={{
              display: "flex",
              width: "100%",
              textDecoration: "none",
              ...(p.textStyle || {}),
              color: "black",
              // textShadow: 'none',
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              // marginBottom: 20,
          }}
          // className="blinking"
          href={barUrl}
          onClick={onClick}
        >
          <span className="shadow-text">
              GO
          </span>
        </a>
      </motion.div>
    )
}