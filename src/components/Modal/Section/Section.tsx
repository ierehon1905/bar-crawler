import React from 'react';
import { ModalDivider } from '../Divider/Divider';
import './Section.css';


type Props = {
    color?: string;
    iconLeft?: string;
    iconRight?: string;
    children: React.ReactNode;
    link?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
}
    
export function ModalSection(p: Props) {

    const Wrapper = p.link ? 'a' : 'div';

    return (
        <>
            <Wrapper style={p.style} className={'ModalSection ' + p.className || ""} target={"_blank"} href={p.link || "#"} onClick={p.onClick}>
                {p.iconLeft && <div className="ModalSection__left-icon">
                    <img className='icon' src={`/icons/${p.iconLeft}.png`} alt="" />
                </div>}

                <div className="ModalSection__content">
                    {p.children}
                </div>

                {p.iconRight && <div className="ModalSection__right-icon">
                    <img className='icon' src={`/icons/${p.iconRight}.png`} alt="" />
                </div>}
            </Wrapper>
        </>
    )
}