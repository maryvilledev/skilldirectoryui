import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import { ModalStyle } from './Styles.jsx';

const ModalContainer = ({ children, closeModalCallback, contentLabel, isModalDisplayed }) => (
  <Modal
    contentLabel={contentLabel}
    isOpen={isModalDisplayed}
    onRequestClose={closeModalCallback}
    style={ModalStyle}
  >
    {children}
  </Modal>
);

ModalContainer.defaultProps = {
  children: null,
  closeModalCallback: () => {},
  contentLabel: '',
  isModalDisplayed: false,
};

ModalContainer.propTypes = {
  children: PropTypes.node,
  closeModalCallback: PropTypes.func,
  contentLabel: PropTypes.string,
  isModalDisplayed: PropTypes.bool,
};

export default ModalContainer;
