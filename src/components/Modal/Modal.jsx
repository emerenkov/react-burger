import React from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropType from 'prop-types';


const rootModalContainer = document.querySelector('#modals');

const Modal = ({ onClose, children }) => {

    const handleEscKeydown = (e) => {
        e.key === "Escape" && onClose();
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, [])

    return createPortal((
        <>
            <div className={modalStyles.container}>
                <button className={modalStyles.closeButton} type="button">
                    <CloseIcon type='primary' onClick={onClose}/>
                </button>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>

    ), rootModalContainer);
};

Modal.propTypes = {
    onClose: PropType.func.isRequired,
    children: PropType.node.isRequired
};

export default Modal;