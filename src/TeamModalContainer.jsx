import React, { PropTypes } from 'react';

import AddTeamMemberForm from './AddTeamMemberForm.jsx';
import DeleteModal from './DeleteModal.jsx';
import ModalContainer from './ModalContainer.jsx';

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
    <ModalContainer
      closeModalCallback={closeModalCallback}
      contentLabel="TeamModalContainer"
      isModalDisplayed={isModalDisplayed}
    >
      {modalComponent}
    </ModalContainer>
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
