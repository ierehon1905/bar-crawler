import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

const BAR_COUNT_KEY = 'BAR_COUNT';
const INCREMENT_AFTER_MINUTES = 20;

export type BarCount = {
    count: number,
    // date timestamp
    recordedTimestamp: number,
}

export function getCount() {
   const stored = localStorage.getItem(BAR_COUNT_KEY)

   if (stored) {
        try {
            return JSON.parse(stored) as BarCount;
        } catch (e) {
            console.error(e);

            return undefined;
        }
   }
}

export function saveCount(count: number) {
    const stored = getCount();

    if (!stored) {
        const data: BarCount = {
            count,
            recordedTimestamp: Date.now(),
        }

        localStorage.setItem(BAR_COUNT_KEY, JSON.stringify(data));
        return;
    }

    stored.count+=1;

    localStorage.setItem(BAR_COUNT_KEY, JSON.stringify(stored));
}

export function resetStoredCount() {
    localStorage.removeItem(BAR_COUNT_KEY)
}

export function needResetCount() {
    const stored = getCount();

    if (!stored) return false;

    if (dayjs().diff(stored.recordedTimestamp, 'hour') > 16) {
        return true;
    }
}

export function useCount() {
    const [count, setCount] = useState(() => getCount()?.count || 0);
    const [attemptIncrementTimestamp, setAttemptIncrementTimestamp] = useState<number | undefined>();

    const incrementCount = useCallback(() => {
        const newCount = count + 1;

        setCount(newCount);
        saveCount(newCount)
    }, [count, setCount])

    function tryIncrementCount() {
        setAttemptIncrementTimestamp(Date.now())
        console.log('aaaa increment');
    }

    function resetCount() {
        setCount(0);
        setAttemptIncrementTimestamp(undefined);
        resetStoredCount();
    }

    const needReset = needResetCount();

    if (needReset) {
        resetCount()
    }

    if (attemptIncrementTimestamp) {
        if (dayjs().diff(attemptIncrementTimestamp, 'minutes') > INCREMENT_AFTER_MINUTES) {
            incrementCount();
        }
    }

    return {
        count, 
        incrementCount,
        tryIncrementCount,
        resetCount
    }
}