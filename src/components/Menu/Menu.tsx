import React from 'react';
import './Menu.css';

type Props = {
    count?: number;
    onCounterClick?: () => void;
}

export function Menu(p: Props) {

    return (
        <div className='Menu__root'>
            <div className='Menu__score' onClick={p.onCounterClick}>{p.count || 0}</div>
        </div>
    )
}