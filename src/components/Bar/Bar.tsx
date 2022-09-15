import {motion} from 'framer-motion';
import React, { useMemo } from "react";

import { BarInfo } from '../../entities/bar';
import { randomChoise } from '../../utils/random';
import { generateTextStyle } from '../../utils/styling/generate-style';
import './Bar.css';

type Props = {
    bar: BarInfo,
    isRandoming?: boolean,
}

export function Bar(p: Props) {
    const nameStyles = useMemo(() => {
        return generateTextStyle(p.bar.name)
        // eslint-disable-next-line
    }, [p.bar.name])

    return (
        <motion.div className='Bar-root'>
            <span 
                className={`Bar-name ${p.isRandoming && 'animated'}`}
                style={nameStyles}
            >
                {p.bar.name}
            </span>
        </motion.div>
    )
}