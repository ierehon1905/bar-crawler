import { motion } from "framer-motion";
import React from "react";
import glyphGif from './glitch.gif';

type Props = {
    onClick?: ()=>void;
    isRandoming?: boolean;
}

const defaultTransition = {
    type: "spring"
}

export function RandomButton(p: Props) {

    const animate = p.isRandoming ? 'randoming' : 'default';

    return (
        <motion.button
            animate={animate}
            transition={defaultTransition}
            className="rand-btn"
            style={{
                position: 'relative',
                appearance: "none",
                WebkitAppearance: "none",
                border: "none",
                fontSize: "1.7em",
                backgroundColor: "black",
                color: "white",
                padding: "20px",
                transform: 'skew(0deg)',
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "100%",
            }}
            variants={{
                randoming: {
                    transform: 'skew(-20deg)'
                },
            }}
            onClick={p.onClick}
      >
        <motion.div 
            animate={animate}
            transition={defaultTransition}
            style={{
                backgroundImage: `url('${glyphGif}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
            }}
            variants={{
                randoming: {
                    opacity: 1
                },
            }}
        />
        <motion.span 
            animate={animate}
            transition={defaultTransition}
            style={{
                position: 'relative',
                fontFamily: "'Press Start 2P'",
                color: p.isRandoming ? 'white' : 'white',
                transform: 'skew(0deg)',
            }}
        >
            RANDOM
        </motion.span>
          
      </motion.button>
    )
}