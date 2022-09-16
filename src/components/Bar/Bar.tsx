import {motion} from 'framer-motion';
import React from "react";

import { BarInfo } from '../../entities/bar';
import { randomChoise } from '../../utils/random';
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
                {p.bar.name.split(' ').map((word, i) => (
                    <>
                    <motion.span 
                        key={i}
                        className='Bar-name-word'
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {word.split('').map((char, i) => (
                            <motion.span

                                key={i}
                                custom={i}
                                className='Bar-name-char'
                                style={{
                                    display: 'inline-block',
                                    opacity: 1,
                                    rotate: 10
                                }}
                                variants={{
                                    randoming: (i) => ({
                                        opacity: 1,
                                        rotate: [0, 20, -20, 0],
                                        scale: [1, 1.3, 1.3, 1],
                                        transition: {delay: randomChoise([0, 0.05, 0.1, 0.15, 0.2]), duration: 0.2, bounce: 2}

                                    }),
                                    default: {
                                        opacity: 1,
                                        rotate: 0,
                                    }
                                }}
                                initial='default'
                                animate={!p.isRandoming ? 'randoming' : 'default'}

                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                    {" "}
                    </>
                ))}  
            </span>
        </motion.div>
    )
}