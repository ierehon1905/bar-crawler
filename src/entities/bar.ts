import { useEffect, useMemo, useRef, useState } from "react";

import { bars as barsData } from "../config/bars/bars";
import { cities } from "../config/cities/cities";
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



export function getCityByPosition(position?: GeolocationPosition) {
    console.log('getCityByPosition', position);
    
    if (!position) {
        return undefined;
    }

    const { latitude, longitude } = position.coords;

    for (const city in cities) {
        const { bbox } = cities[city];
        const { topLeftlatitude, topLeftlongitude, botRightlatitude, botRightlongitude } = bbox;

        if (latitude < topLeftlatitude && latitude > botRightlatitude && longitude > topLeftlongitude && longitude < botRightlongitude) {            
            return cities[city];
        }
    }

    return undefined;
}


export function getBars(position?: GeolocationPosition) {
    const city = getCityByPosition(position);
    if(city){
        return barsData[city.name];
    }

    return [];
}

export function getRandomBar(position?: GeolocationPosition) {
    const bars = getBars(position);

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

    const bars = getBars(position);

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
    const [displayedBar, setDisplayedBar] = useState<BarInfo>(() => currentBar || getRandomBar(p.position));
    const [isRandoming, setIsRandoming] = useState(false);
    const [isRandomingStopping, setIsRandomingStopping] = useState(false);
    
    const randomingInterval = useRef<number>();

    const currentBarDistance = currentBar && p.position
        ? getBarDistance([p.position.coords.latitude, p.position.coords.longitude], currentBar).distance
        : 0;

    useEffect(() => {   
        if(!displayedBar && p.position) {
            setDisplayedBar(getRandomBar(p.position));
        }
    }, [displayedBar, p.position]);

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
        setIsRandomingStopping(true);

        let step = 0;


        randomingInterval.current = setInterval(() => {
            if (step > MAX_RANDOM_STEPS) {
                clearInterval(randomingInterval.current)
                setIsRandoming(false);
            } else {
                step++
            }
            if(step > MAX_RANDOM_STEPS) {
                setIsRandomingStopping(false);
            }

            const candidate = randomChoise(candidates);

            setDisplayedBar(candidate);
        }, 350)
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
        isRandomingStopping,
    }

}

