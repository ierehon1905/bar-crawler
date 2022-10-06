import React, { useCallback, useEffect, useState } from 'react';
import { BarInfo } from '../../entities/bar';
import { TextStyle } from '../../utils/styling/generate-style';
import { getTaxiUrl } from '../../utils/taxi';
import { Bar } from "../Bar/Bar";
import { ModalDivider } from '../Modal/Divider/Divider';
import { Modal } from "../Modal/Modal";
import { ModalSection } from '../Modal/Section/Section';
import './BarModal.css';

type Props = {
    bar: BarInfo;
    textStyle: TextStyle;
    onClose: () => void;
}

export const BarModal = (p: Props) => {
    const [isCopied, setIsCopied] = useState(false);

    const color = p.textStyle?.color;

    const copyAddress = useCallback(() => {
        if(p.bar.position.address)  {
            navigator.clipboard.writeText(p.bar.position.address);
            setIsCopied(true);
        }
    }, [p.bar.position.address]);
    
    const barUrl = getTaxiUrl({
        endLat: p.bar.position.coords.latitude,
        endLon: p.bar.position.coords.longitude,
        startLat: p.bar.position?.coords.latitude,
        startLon:p.bar.position?.coords.longitude,
    });

    const gmapsLink = p.bar.position.gmapsLink 
        || `https://www.google.com/maps/search/?api=1&query=${p.bar.name}`;

    useEffect(() => {
      setIsCopied(false);
    }, [p.bar])
    

    return (
        <Modal onClose={p.onClose} color={color} >
            <div className="BarModal__bar">
                <Bar 
                    bar={p.bar}
                    textStyle={p.textStyle}
                />
            </div>

            {p.bar.position.address && <>
                <ModalDivider color={color} />
                <ModalSection color={color} iconLeft={'pin'} onClick={copyAddress}>
                    <p>
                        {p.bar.position.address + " "}
                        <img className='icon' style={{opacity:isCopied ? 1: 0.7}} src={isCopied ? '/icons/copy-done.png' : '/icons/copy.png'} />
                    </p>
                </ModalSection>
            </>}

            <ModalDivider color={color} />
            <div className="BarModal__buttons-row">

                <ModalSection color={color} iconLeft={'gmaps'} link={gmapsLink} style={{
                    borderRight: `1px solid ${color}`,
                }} >
                    <p>Maps</p>
                </ModalSection>

                <ModalSection color={color} iconLeft={'yataxi'} link={barUrl} >
                    <p>Taxi</p>
                </ModalSection>
            
            </div>

        </Modal>
    )

}