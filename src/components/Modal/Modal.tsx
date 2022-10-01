import {motion} from 'framer-motion'
import React, { ReactNode } from "react"
import './Modal.css';


const contentVariants = {
    hidden: {
        scale: 0.8,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity:1,
    },
}

type Props = {
    title?: string,
    children: ReactNode,
    onClose?: () => void,
    hideCloseButton?: boolean,
    color?: string,
}
    
export function Modal(p: Props) {

    return (
        <div className="Modal-paranja">

            <motion.div 
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="Modal-content"
                style={p.color ? {borderColor: p.color} : {}}
            >
                <div 
                    className="Modal-header"
                >

                    <div 
                        className="Modal-title"
                        style={p.color ? {color: p.color} : {}}
                    >
                        {p.title}
                    </div>

                    {!p.hideCloseButton && 
                        <div 
                            className="Modal-close-btn"
                            onClick={p.onClose}
                            style={p.color ? {color: p.color} : {}}
                        >
                            x
                        </div>
                    }
                </div>

                <div 
                    className="Modal-divider" 
                    style={p.color ? {backgroundColor: p.color} : {}}
                />


                <div className="Modal-body">
                    {p.children}
                </div>
            </motion.div>

          
        </div>
    )
}