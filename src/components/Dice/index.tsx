import React, {useState, useEffect} from "react";



const dieCordMap: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [
      [0, 0],
      [2, 2],
    ],
    3: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    4: [
      [0, 0],
      [0, 2],
      [2, 2],
      [2, 0],
    ],
    5: [
      [0, 0],
      [0, 2],
      [2, 2],
      [2, 0],
      [1, 1],
    ],
    6: [
      [0, 0],
      [0, 1],
      [0, 2],
      [2, 2],
      [2, 1],
      [2, 0],
    ],
  };
  

export const Dice: React.FC<{ className?: string; value?: string }> = ({
    className,
    value,
  }) => {
    const [diceValue, setDiceValue] = useState(3);
    const [isRot, setIsRot] = useState(false);
  
    useEffect(() => {
      setIsRot(Math.random() > 0.5);
      setDiceValue(Math.trunc(Math.random() * 6) + 1);
    }, [value]);
  
    const coords: [number, number][] = dieCordMap[diceValue].map((dot) => {
      let cord = [...dot] as [number, number];
      if (isRot) {
        cord = [dot[1], -dot[0] + 2] as [number, number];
      }
      cord = [10 + 30 * cord[0], 10 + 30 * cord[1]] as [number, number];
  
      return cord;
    });
  
    return (
      <div className={"dice " + (className ? className : "")}>
        {coords.map((coord, index) => (
          <div
            className="die"
            key={index}
            style={{
              top: coord[0] + "%",
              left: coord[1] + "%",
            }}
          />
        ))}
      </div>
    );
  };
  