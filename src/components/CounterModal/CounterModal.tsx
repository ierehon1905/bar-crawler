import React from 'react';
import { TextStyle } from '../../utils/styling/generate-style';
import { ModalDivider } from '../Modal/Divider/Divider';
import { Modal } from "../Modal/Modal";
import { ModalSection } from '../Modal/Section/Section';
import './CounterModal.css';

type Props = {
    textStyle: TextStyle;
    onClose: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onReset: () => void;
    count: number;
}

export const CounterModal = (p: Props) => {
    const color = p.textStyle?.color;

    return (
        <Modal title='Bars counter' bodyClassName="CounterModal" onClose={p.onClose} color={color} bodyStyle={{
            textAlign: 'center',
        }}>

            <ModalSection 
                color={color} 
                onClick={p.onReset}
                className="CounterModal__reset"
            >
                <p>reset</p>
            </ModalSection>

            <ModalDivider color={color} />

            <div className="CounterModal__counter">
                <div className="CounterModal__change-count" onClick={p.onDecrement} >-</div>
                <div className='CounterModal__value'>{p.count || 0}</div>
                <div className="CounterModal__change-count" onClick={p.onIncrement} >+</div>
            </div>

        </Modal>
    )

}