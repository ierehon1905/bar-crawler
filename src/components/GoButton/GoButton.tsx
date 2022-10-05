import { motion } from "framer-motion";
import React from 'react';
import './GoButton.css';

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
          visibility: p.isRandoming ? 'hidden' : 'visible',
        }}
      >
        <a
          style={{
              display: "flex",
              ...(p.textStyle || {}),
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              height: '60px',
          }}
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