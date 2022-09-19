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
    children: ReactNode,
    onClose?: () => void,
    hideCloseButton?: boolean,
}
    
export function Modal(p: Props) {

    return (
        <div className="Modal-paranja">

            <motion.div 
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="Modal-content"
            >
                <div className="Modal-header">

                    <div className="Modal-title">
                        Menu
                    </div>

                    {!p.hideCloseButton && 
                        <div className="Modal-close-btn" onClick={p.onClose} >
                            x
                        </div>
                    }
                </div>

                <div className="Modal-divider"></div>

                <div className="Modal-body">
                    {p.children}
                    aksdasd aksda dia sdjasndjas d a asmd
                    askdkasd asndjansd jansjdas djansjdasd jansdjasd
                    aksdkasd ajsnda sjdnajsd ajsdnjasd  ajsdja jasnd jasd jasd jasnd
                     ajsdjasd jasndasjdnasd jdsjad
                     ajsdjad jasndjasd jdasjdnad jdajsndja jasdjand ajsda
                     askdkasd asndjansd jansjdas djansjdasd jansdjasd
                     aksdkasd ajsnda sjdnajsd ajsdnjasd  ajsdja jasnd jasd jasd jasnd
                     ajsdjasd jasndasjdnasd jdsjad
                     ajsdjad jasndjasd jdasjdnad jdajsndja jasdjand ajsda

                     askdkasd asndjansd jansjdas djansjdasd jansdjasd
                    aksdkasd ajsnda sjdnajsd ajsdnjasd  ajsdja jasnd jasd jasd jasnd
                     ajsdjasd jasndasjdnasd jdsjad
                     ajsdjad jasndjasd jdasjdnad jdajsndja jasdjand ajsda
                </div>
            </motion.div>

          
        </div>
    )
}