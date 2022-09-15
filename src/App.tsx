import React, { useState } from "react";

import { Bar } from "./components/Bar";
import { Dice } from "./components/Dice";
import { GoButton } from "./components/GoButton/GoButton";
import { Menu } from "./components/Menu/Menu";
import { useBar } from "./entities/bar";
import { useCount } from "./entities/count";
import { useGeo } from "./entities/geo";


const App: React.FC = () => {
  const {position} = useGeo();
  const {count, tryIncrementCount} = useCount();

  const {
    currentBar,
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


      <div className="section" style={{marginTop: '24px'}}>
        <Bar bar={displayedBar} />
      </div>

      <div className="section" style={{marginTop: '52px'}}>
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
      </div>
    
      {!isRandoming && 
        <GoButton 
          bar={displayedBar}
          selectCurrentBar={selectCurrentBar}
          tryIncrementCount={tryIncrementCount}
        />
      }
    </div>
  );
};

export default App;
