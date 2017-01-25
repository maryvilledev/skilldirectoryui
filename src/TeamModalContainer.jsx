import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import AddTeamMemberForm from './AddTeamMemberForm.jsx';
import DeleteModal from './DeleteModal.jsx';
import { ModalStyle } from './Styles.jsx';

// Object to map displayedModalType to a component
const teamModalTypes = {
  AddTeamMember: AddTeamMemberForm,
  DeleteTeamMember: DeleteModal,
};

const TeamModalContainer = ({ closeModalCallback, displayedModalType, formProps, isModalDisplayed}) => {
  const ModalToDisplay = teamModalTypes[displayedModalType];
  const modalComponent = (ModalToDisplay ?
    <ModalToDisplay {...formProps} /> : null);
  return (
    <Modal
      isOpen={isModalDisplayed}
      onRequestClose={closeModalCallback}
      contentLabel="TeamModalContainer"
      style={ModalStyle}
    >
      {modalComponent}
    </Modal>
  );
};

TeamModalContainer.propTypes = {
  closeModalCallback: PropTypes.func,
  displayedModalType: PropTypes.string,
  formProps: PropTypes.object,
  isModalDisplayed: PropTypes.bool,
};

TeamModalContainer.defaultProps = {
  closeModalCallback: () => {},
  displayedModalType: '',
  formProps: {},
  isModalDisplayed: false,
};

export default TeamModalContainer;
