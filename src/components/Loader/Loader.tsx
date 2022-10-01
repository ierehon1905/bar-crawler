import { motion } from "framer-motion";
import React from "react";
import hourglass from "./hourglass.gif";

type Props = {
    isVisible?: boolean;
}


export function Loader(p: Props) {

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
                transition:{
                    duration: 0,
                    delay: 0.5,
                }
            }}
            style={{
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div 
                style={{
                    backgroundImage: `url(${hourglass})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    width: 100,
                    height: 100,
                }}
            />
        </motion.div>
    )
}