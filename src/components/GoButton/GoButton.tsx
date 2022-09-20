import { motion } from "framer-motion";
import React from "react";

import { BarInfo, getBarDistance } from "../../entities/bar";
import { getTaxiUrl } from "../../utils/taxi";
import { getMapsUrl } from "../../utils/yamaps";

import "./GoButton.css";

type Props = {
  bar: BarInfo;
  position?: GeolocationPosition;
  selectCurrentBar: () => void;
  tryIncrementCount: () => void;
  textStyle: any;
  isRandoming: boolean;
};

export function GoButton(p: Props) {
  // Кажется эта штука считаться будет каждый раз когда анимация меняет бар
  // Надо бы избежать этого
  let barUrl: string;
  const distance =
    p.position === undefined
      ? undefined
      : getBarDistance(
          [p.position.coords.latitude, p.position.coords.longitude],
          p.bar
        );

  // TODO make user setting -- max distance to walk
  if (distance && distance.distance < 13) {
    barUrl = getMapsUrl({
      endLat: p.bar.coords[0],
      endLon: p.bar.coords[1],
      startLat: p.position!.coords.latitude,
      startLon: p.position!.coords.longitude,
    });
  } else {
    barUrl = getTaxiUrl({
      endLat: p.bar.coords[0],
      endLon: p.bar.coords[1],
      startLat: p.position?.coords.latitude,
      startLon: p.position?.coords.longitude,
    });
  }

  function onClick() {
    p.selectCurrentBar();
    p.tryIncrementCount();
  }

  return (
    <motion.div
      className="go-btn blinking"
      style={{
        pointerEvents: p.isRandoming ? "none" : "all",
        display: p.isRandoming ? "none" : "block",
      }}
    >
      <a
        style={{
          display: "flex",
          ...(p.textStyle || {}),
          alignItems: "center",
          justifyContent: "center",
          fontSize: "60px",
          height: "60px",
        }}
        href={barUrl}
        onClick={onClick}
      >
        <span className="shadow-text">GO</span>
      </a>
    </motion.div>
  );
}
