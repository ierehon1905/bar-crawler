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
            <div className="CounterModal__counter">
                <div className='Menu__score'>{p.count || 0}</div>
            </div>

            <ModalDivider color={color} />
            <div className="CounterModal__buttons-row">
                <ModalSection 
                    color={color} 
                    onClick={p.onDecrement}
                    style={{
                        borderRight: `1px solid ${color}`,
                    }} 
                >
                    <p>MINUS</p>
                </ModalSection>

                <ModalSection 
                    color={color} 
                    onClick={p.onIncrement}
                >
                    <p>PLUS</p>
                </ModalSection>
            </div>

            <ModalDivider color={color} />
            <ModalSection 
                color={color} 
                onClick={p.onReset}
            >
                <p>RESET</p>
            </ModalSection>

        </Modal>
    )

}