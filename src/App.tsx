import {AnimatePresence, motion} from 'framer-motion';
import React, { useMemo, useState } from "react";

import { Bar } from "./components/Bar/Bar";
import { GoButton } from "./components/GoButton/GoButton";
import { Loader } from './components/Loader/Loader';
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
  const {position, isGeoUnavailable} = useGeo();
  const {count, tryIncrementCount} = useCount();

  const {
    selectCurrentBar,
    displayedBar,
    randomizeBar,
    isRandoming,
    isRandomingStopping,
  } = useBar({position, findClosest: Boolean(count)});


  const textStyle = useMemo(() => {

    return generateTextStyle(displayedBar?.name)
    // eslint-disable-next-line
}, [displayedBar?.name])

const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <>
      <div className="main">
        <div className="logo">
          <span>BAR</span>
          <br />
          <span>CRAWLER</span>
          <div className="section" style={{marginTop: '53px'}}>
            <Menu count={count} />
          </div>
        </div>
      

        {!displayedBar && <>
          <div className="section">
              <Loader />
          </div>
          <div></div>
        </>}

        {displayedBar && 
          <>
            <motion.div 
              className="section" 
              style={{height: '300px'}}
              variants={barVariants}
              animate={isRandoming ? 'randoming' : 'default'}
              transition={{delay: 0, duration: 0, bounce: 0}}
            >
              <Bar 
                bar={displayedBar}
                textStyle={textStyle}
                isRandoming={isRandoming}
                // onNameClick={() => setIsModalVisible(true)}
                
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
          </>
        }
      </div>
      {
        isGeoUnavailable &&
        <Modal hideCloseButton title={'Warning'}>
          <h1>Allow Geo!</h1>
          <p>
          <br/>
            Please allow geo to use this web app <br/><br/>
            Go to settings and allow geolocation for this web app <br/><br/>
            Then refresh the page
          </p>
        </Modal>
      }

      {isModalVisible && 
        <Modal onClose={() => setIsModalVisible(false)} color={textStyle?.color} >
          Kek
      </Modal>
      }
    </>
  );
};

export default App;
