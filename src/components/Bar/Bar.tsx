import {motion} from 'framer-motion';
import React from "react";

import { BarInfo } from '../../entities/bar';
import './Bar.css';

type Props = {
    bar: BarInfo;
    isRandoming?: boolean;
    textStyle?: any;
}

export function Bar(p: Props) {
    

    return (
        <motion.div className='Bar-root'>
            <span 
                className={`Bar-name ${p.isRandoming && 'blinking-medium'}`}
                style={p.textStyle}
            >
                {p.bar.name}
            </span>
        </motion.div>
    )
}