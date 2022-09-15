import React from 'react';
import './Menu.css';

type Props = {
    count?: number
}

export function Menu(p: Props) {

    return (
        <div className='root'>
            <div className='score'>{p.count || 0}</div>
        </div>
    )
}