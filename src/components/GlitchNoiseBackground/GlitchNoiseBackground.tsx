import React from "react";
import { motion } from "framer-motion";
import glitch from "./glitch.gif";

type Props = {
    isVisible?: boolean;
}

const transition = {
    duration: 1,
}

export function GlitchNoiseBackground(p: Props) {

    const animate = p.isVisible ? 'randoming' : 'default';

    return (
        <motion.div 
            animate={animate}
            transition={transition}
            style={{
                backgroundImage: `url(${glitch})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
            }}
            variants={{
                randoming: {
                    opacity: 0.1
                },
            }}
        />
    )
}