import {motion} from 'framer-motion';
import React from "react";

import { Bar } from "./components/Bar/Bar";
import { GoButton } from "./components/GoButton/GoButton";
import { Menu } from "./components/Menu/Menu";
import { useBar } from "./entities/bar";
import { useCount } from "./entities/count";
import { useGeo } from "./entities/geo";

const barVariants = {
  randoming: {},
  default: {},
}

const randomBtnVariants = {
  randoming: {
    opacity: 0,
  },
  default: {
    opacity: 1,
  }
}

const goBtnVariants = {
  randoming: {
    scale: 0.8,
    opacity: 0,
  },
  default: {
    scale: 1,
    opacity: 1,
  }
}

const App: React.FC = () => {
  const {position} = useGeo();
  const {count, tryIncrementCount} = useCount();

  const {
    selectCurrentBar,
    displayedBar,
    randomizeBar,
    isRandoming,
  } = useBar({position, findClosest: Boolean(count)});


  return (
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
        style={{marginTop: '24px'}}
        variants={barVariants}
        animate={isRandoming ? 'randoming' : 'default'}
        transition={{delay: 0, duration: 0, bounce: 0}}
      >
        <Bar bar={displayedBar} isRandoming={isRandoming} />
      </motion.div>


      <motion.div 
        className="section" 
        style={{marginTop: '52px', pointerEvents: isRandoming ? 'none' : 'all'}}
        variants={randomBtnVariants}
        animate={isRandoming ? 'randoming' : 'default'}
        transition={{delay: 0.1, duration: 0.1, bounce: 2}}
      >
        <button
          onClick={randomizeBar}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            border: "none",
            fontSize: "1.7em",
            backgroundColor: "black",
            color: "white",
            padding: 0,
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ padding: "0 0ch" }}>другой</div>
        </button>
      </motion.div>
    
      {!isRandoming && 
        <motion.div 
          className="go-btn" 
          style={{pointerEvents: isRandoming ? 'none' : 'all'}}
          variants={goBtnVariants}
          animate={isRandoming ? 'randoming' : 'default'}
          transition={{delay: 0.1, duration: 0.1, bounce: 2}}
        >
            <GoButton 
              bar={displayedBar}
              selectCurrentBar={selectCurrentBar}
              tryIncrementCount={tryIncrementCount}
            />
        </motion.div>
      }
    </div>
  );
};

export default App;
