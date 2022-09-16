import { motion } from "framer-motion";
import React from "react";

type Props = {
    onClick?: ()=>void;
    isRandoming?: boolean;
}

const defaultTransition = {
    delay: 0.1, 
    duration: 0.2,
    opacity: {
        delay: 0.05, 
    }
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
                fontSize: "22px",
                backgroundColor: "black",
                color: "white",
                padding: "20px",
                transform: 'skew(0deg)',
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                margin: "0 auto",
            }}
            variants={{
                randoming: {
                    // transform: 'skew(-60deg)',
                    // rotate: '90deg',
                    // transform: 'skew(-90deg)',
                    // scale: 0.8,
                    // opacity: 0
                    display: 'none'
                },
            }}
            onClick={p.onClick}
      >
        <motion.div 
            animate={animate}
            transition={defaultTransition}
            style={{
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
            NEXT
        </motion.span>
          
      </motion.button>
    )
}