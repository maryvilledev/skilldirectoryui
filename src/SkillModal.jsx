import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import AddSkillForm from './AddSkillForm.jsx';
import AddSkillLinkForm from './AddSkillLinkForm.jsx';
import AddSkillReviewForm from './AddSkillReviewForm.jsx';
import DeleteModal from './DeleteModal.jsx';
import { ModalStyle } from './Styles.jsx';

// Object to map displayedModalType to a component
const skillModalTypes = {
  AddLink: AddSkillLinkForm,
  AddSkill: AddSkillForm,
  AddReview: AddSkillReviewForm,
  DeleteSkill: DeleteModal,
};

const SkillModal = ({ closeModalCallback, displayedModalType, isModalDisplayed, formProps }) => {
  const ModalToDisplay = skillModalTypes[displayedModalType];
  const modalComponent = (ModalToDisplay ?
    <ModalToDisplay {...formProps} /> : null);
  return (
    <Modal
      isOpen={isModalDisplayed}
      onRequestClose={closeModalCallback}
      contentLabel="SkillModal"
      style={ModalStyle}
    >
      {modalComponent}
    </Modal>
  );
};

SkillModal.propTypes = {
  closeModalCallback: PropTypes.func.isRequired,
  displayedModalType: PropTypes.string.isRequired,
  formProps: PropTypes.object.isRequired,
  isModalDisplayed: PropTypes.bool.isRequired,
};

export default SkillModal;
