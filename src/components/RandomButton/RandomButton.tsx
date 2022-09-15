import React from "react";
import glyphGif from './glitch.gif';

type Props = {
    onClick: ()=>void;
}

export function RandomButton(p: Props) {


    return (
        <button
            className="rand-btn"
            style={{
                position: 'relative',
                appearance: "none",
                WebkitAppearance: "none",
                border: "none",
                fontSize: "1.7em",
                backgroundColor: "black",
                color: "white",
                padding: "20px",
                transform: 'skew(-20deg)',
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "100%",
            }}
            onClick={p.onClick}
      >
        <div 
            style={{
                backgroundImage: `url('${glyphGif}')`,
                backgroundSize: 'cover',
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}
        />
        <span style={{
            position: 'relative',
            fontFamily: "'Press Start 2P'",
            color: 'blue',
            transform: 'skew(20deg)',
        }}>
            RANDOM
        </span>
          
      </button>
    )
}