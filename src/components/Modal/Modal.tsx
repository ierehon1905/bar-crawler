import React, { ReactNode, useRef } from "react"
import { motion } from 'framer-motion'
import { ModalDivider } from './Divider/Divider';
import { useClickOutside } from "../../utils/use-click-outside";
import './Modal.css';


const contentVariants = {
    hidden: {
        scale: 0.8,
    },
    visible: {
        scale: 1,
    },
}

type Props = {
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    hideCloseButton?: boolean;
    color?: string;
    bodyStyle?: React.CSSProperties;
    bodyClassName?: string;
}
    
export function Modal(p: Props) {
    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside(modalRef, p.onClose);

    return (
        <motion.div 
            className="Modal-paranja"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.1,
            }}
        >
            <motion.div
                ref={modalRef}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="Modal-content"
                transition={{
                    duration: 0.1,
                }}
                style={p.color ? {borderColor: p.color} : {}}
            >
                <div className="Modal-header" >
                    <div 
                        className="Modal-title"
                        style={p.color ? {color: p.color} : {}}
                    >
                        {p.title || " "}
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

                <ModalDivider color={p.color} />

                <div 
                    className={"Modal-body" + (p.bodyClassName ? ' ' + p.bodyClassName : '')}
                    style={p.bodyStyle} 
                >
                    {p.children}
                </div>
            </motion.div>
        </motion.div>
    )
}