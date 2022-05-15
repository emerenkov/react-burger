import React from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {

    return (
        <div className={modalOverlayStyles.Overlay} onClick={onClick} />
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;