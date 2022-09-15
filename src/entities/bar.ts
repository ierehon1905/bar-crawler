import { useMemo, useState } from "react";

import { barsData } from "../config/bars";
import { distance } from "../utils/distance";
import { randomChoise } from "../utils/random";

const MAX_RANDOM_STEPS = 10;

export type BarInfo = {
    name: string,
    coords: [number, number],
}

export function getBars() {
    return barsData;
}

export function getRandomBar() {
    const bars = getBars();

    return randomChoise(bars);
}

export function getClosestBars(p: {currentBar?: BarInfo, position?: GeolocationPosition, max?: number}) {
    const {currentBar, position, max = 10} = p;

    const bars = getBars();

    const start: [number, number] | undefined = currentBar
      ? currentBar.coords
      : position
      ? [position.coords.latitude, position.coords.longitude]
      : undefined;

    if(!start) {
      return [];
    }

    const withDistance = bars
      .filter((b) => b.name !== currentBar?.name)
      .map((a) => ({
        bar: a,
        distance: distance(start[0], a.coords[0], start[1], a.coords[1]),
      }));
    
    const closest = withDistance.slice(0, max);

    return closest;
}

export function useBar(p: {position?: GeolocationPosition, findClosest?: boolean}) {
    const [currentBar, setCurrentBar] = useState<BarInfo | undefined>();
    const [displayedBar, setDisplayedBar] = useState<BarInfo>(() => currentBar || getRandomBar());
    const [isRandoming, setIsRandoming] = useState(false);

    const candidates = useMemo(() => {
        if (!p.findClosest) return getBars();

        return getClosestBars({currentBar, position: p.position, max: 10})
    }, [currentBar, p.position, p.findClosest]);

    function randomizeBar() {
        setIsRandoming(true);
        let step = 0;

        const interval = setInterval(() => {
            if (step > MAX_RANDOM_STEPS) {
                clearInterval(interval)
                setIsRandoming(false);
            } else {
                step++
            }

            const candidate = randomChoise(candidates);

            setDisplayedBar(candidate.bar);
        }, 300)
    }

    function selectCurrentBar() {
        setCurrentBar(displayedBar);
    }

    return {
        currentBar,
        displayedBar,
        selectCurrentBar,
        randomizeBar,
        isRandoming,
    }

}

