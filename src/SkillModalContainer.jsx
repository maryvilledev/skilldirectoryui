import React, { PropTypes } from 'react';

import AddSkillForm from './AddSkillForm.jsx';
import AddSkillLinkForm from './AddSkillLinkForm.jsx';
import AddSkillReviewForm from './AddSkillReviewForm.jsx';
import DeleteModal from './DeleteModal.jsx';
import ModalContainer from './ModalContainer.jsx';

// Object to map displayedModalType to a component
const skillModalTypes = {
  AddLink: AddSkillLinkForm,
  AddSkill: AddSkillForm,
  AddReview: AddSkillReviewForm,
  DeleteSkill: DeleteModal,
};

const SkillModalContainer = ({ closeModalCallback, displayedModalType, isModalDisplayed, formProps }) => {
  const ModalToDisplay = skillModalTypes[displayedModalType];
  const modalComponent = (ModalToDisplay ?
    <ModalToDisplay {...formProps} /> : null);
  return (
    <ModalContainer
      closeModalCallback={closeModalCallback}
      contentLabel="SkillModalContainer"
      isModalDisplayed={isModalDisplayed}
    >
      {modalComponent}
    </ModalContainer>
  );
};

SkillModalContainer.defaultProps = {
  closeModalCallback: () => {},
  displayedModalType: '',
  formProps: {},
  isModalDisplayed: false,
};

SkillModalContainer.propTypes = {
  closeModalCallback: PropTypes.func,
  displayedModalType: PropTypes.string,
  formProps: PropTypes.object,
  isModalDisplayed: PropTypes.bool,
};

export default SkillModalContainer;
