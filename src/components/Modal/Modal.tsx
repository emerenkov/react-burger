import React, {FC, useEffect} from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropType from 'prop-types';
import {TModal} from "../../utils/types";


const rootModalContainer = document.querySelector('#modals') as HTMLElement;

const Modal: FC<TModal> = ({ onClose, children }) => {

    const handleEscKeydown = (e: {key: string}) => {
        e.key === "Escape" && onClose();
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, [])

    return createPortal(
        <>
            <div className={modalStyles.container}>
                <button className={modalStyles.closeButton} type="button">
                    <CloseIcon type='primary' onClick={onClose}/>
                </button>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
            rootModalContainer
    );
};

Modal.propTypes = {
    onClose: PropType.func.isRequired,
    children: PropType.node.isRequired
};

export default Modal;