import {AnimatePresence, motion} from 'framer-motion';
import React, { useMemo, useState } from "react";

import { Bar } from "./components/Bar/Bar";
import { GoButton } from "./components/GoButton/GoButton";
import { Menu } from "./components/Menu/Menu";
import { Modal } from './components/Modal/Modal';
import { RandomButton } from "./components/RandomButton/RandomButton";
import { useBar } from "./entities/bar";
import { useCount } from "./entities/count";
import { useGeo } from "./entities/geo";
import { generateTextStyle } from './utils/styling/generate-style';

const barVariants = {
  randoming: {},
  default: {},
}

const App: React.FC = () => {
  const {position} = useGeo();
  const {count, tryIncrementCount} = useCount();

  const {
    selectCurrentBar,
    displayedBar,
    randomizeBar,
    isRandoming,
    isRandomingStopping,
  } = useBar({position, findClosest: Boolean(count)});


  const textStyle = useMemo(() => {
    return generateTextStyle(displayedBar.name)
    // eslint-disable-next-line
}, [displayedBar.name])

const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <>
      <div className="main">
        <div className="logo">
          <span>BAR</span>
          <br />
          <span>CRAWLER</span>
        </div>
      
        <div className="section" style={{marginTop: '53px'}}>
          <Menu count={count} />
        </div>

        <motion.div 
          className="section" 
          style={{marginTop: '0px'}}
          variants={barVariants}
          animate={isRandoming ? 'randoming' : 'default'}
          transition={{delay: 0, duration: 0, bounce: 0}}
        >
          <Bar 
            bar={displayedBar}
            textStyle={textStyle}
            isRandoming={isRandoming}
            onNameClick={() => setIsModalVisible(true)}
            
          />
        </motion.div>


        <motion.div 
          className="section" 
          style={{marginTop: '2px', pointerEvents: isRandoming ? 'none' : 'all'}}
        >
          <RandomButton isRandoming={isRandoming} onClick={randomizeBar} />
        </motion.div>

        <GoButton 
          isRandoming={isRandoming} 
          bar={displayedBar}
          textStyle={textStyle}
          selectCurrentBar={selectCurrentBar}
          tryIncrementCount={tryIncrementCount}
        />


        {isModalVisible && 
          <Modal onClose={() => setIsModalVisible(false)} >
            Kek
         </Modal>
        }


      </div>
    </>
  );
};

export default App;
