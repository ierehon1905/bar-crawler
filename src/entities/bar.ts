import { useMemo, useRef, useState } from "react";

import { barsData } from "../config/bars";
import { distance } from "../utils/distance";
import { randomChoise } from "../utils/random";

const MAX_RANDOM_STEPS = 10;

export type BarInfo = {
    name: string,
    coords: [number, number],
}

export type BarDistance = {
    bar: BarInfo,
    distance: number,
}

export function getBars() {
    return barsData;
}

export function getRandomBar() {
    const bars = getBars();

    return randomChoise(bars);
}

export function getBarDistance(coords: [number, number], bar: BarInfo): BarDistance {
    return {
        bar,
        distance: distance(coords[0], bar.coords[0], coords[1], bar.coords[1])
    }
}

export function getNextBars(p: {
    currentBar?: BarInfo,
    position?: GeolocationPosition,
    findClosest?: boolean,
    maxClosest?: number
}) {
    const {currentBar, position, maxClosest = 10, findClosest} = p;

    const bars = getBars();

    if (!findClosest) {
        return bars;
    }

    let start: [number, number] | null = null;

    if (position) {
        start = [position.coords.latitude, position.coords.longitude]
    } else if (currentBar) {
        start = currentBar.coords 
    }

    if (!start) {
      return bars;
    }

    const withDistance = bars.map((bar) => getBarDistance(start!, bar));
    
    const closest = withDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxClosest)
        .map(({bar}) => bar);

    return closest;
}

export function useBar(p: {position?: GeolocationPosition, findClosest?: boolean}) {
    const [currentBar, setCurrentBar] = useState<BarInfo | undefined>();
    const [displayedBar, setDisplayedBar] = useState<BarInfo>(() => currentBar || getRandomBar());
    const [isRandoming, setIsRandoming] = useState(false);
    
    const randomingInterval = useRef<number>();

    const currentBarDistance = currentBar && p.position
        ? getBarDistance([p.position.coords.latitude, p.position.coords.longitude], currentBar).distance
        : 0;

    const candidates = useMemo(() => {
        return getNextBars({
            currentBar,
            position: p.position,
            findClosest: p.findClosest,
            maxClosest: 10
        })
    
    }, [currentBar, p.position, p.findClosest]);

    function randomizeBar() {
        clearInterval(randomingInterval.current);

        setIsRandoming(true);

        let step = 0;

        randomingInterval.current = setInterval(() => {
            if (step > MAX_RANDOM_STEPS) {
                clearInterval(randomingInterval.current)
                setIsRandoming(false);
            } else {
                step++
            }

            const candidate = randomChoise(candidates);

            setDisplayedBar(candidate);
        }, 300)
    }

    function selectCurrentBar() {
        setCurrentBar(displayedBar);
    }

    return {
        currentBar,
        currentBarDistance,
        displayedBar,
        selectCurrentBar,
        randomizeBar,
        isRandoming,
    }

}

