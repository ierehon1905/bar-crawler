import {motion} from 'framer-motion';
import React from "react";

import { BarInfo } from '../../entities/bar';
import './Bar.css';

type Props = {
    bar: BarInfo;
    isRandoming?: boolean;
    textStyle?: any;
    onNameClick?: (name?: string) => void,
}

export function Bar(p: Props) {
    return (
        <motion.div className='Bar-root'>
            <span 
                className={`Bar-name ${p.isRandoming && 'blinking'}`}
                style={p.textStyle}
                onClick={() => p.onNameClick?.(p.bar.name)}
            >
                {p.bar.name} 
            </span>
        </motion.div>
    )
}