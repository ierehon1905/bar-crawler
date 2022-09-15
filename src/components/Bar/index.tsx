import {motion} from 'framer-motion';
import React, { useMemo } from "react";

import { BarInfo } from '../../entities/bar';
import { randomChoise } from '../../utils/random';
import './Bar.css';

type Props = {
    bar: BarInfo,
}

export function Bar(p: Props) {
    console.log(p.bar);

    const nameStyles = useMemo(() => {
        const fontSize = randomChoise([44, 42, 40, 38, 41]);
        const color = randomChoise(['red', 'orange', 'green', 'yellow', 'white']);
        const shadowColor = randomChoise(['red', 'orange', 'green', 'yellow', 'white']);
        const shadowSize = randomChoise([2, 4, 3, 5]);
        const shadowOffset = randomChoise([2, 4, 3, 5]);
        // const font = randomChoise([{fontFamily: "Press Start 2P"}, {fontFamily: "Arial", fontWeidth: 600}])


        return {
            fontSize,
            color,
            textShadow: `0 ${shadowSize}px ${shadowOffset}px ${shadowColor}`
        }
        // eslint-disable-next-line
    }, [p.bar.name])

    return (
        <motion.div className='Bar-root'>
            <motion.span 
                className='Bar-name animated'
                style={nameStyles}
            >
                {p.bar.name}
            </motion.span>
        </motion.div>
    )
}