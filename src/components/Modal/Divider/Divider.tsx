import React from 'react';
import './Divider.css';


type Props = {
    color?: string,
}
    
export function ModalDivider(p: Props) {
    return (
        <div 
            className="ModalDivider" 
            style={p.color ? {backgroundColor: p.color} : {}}
        />
    )
}