import React, { PropTypes } from 'react';
import WithLogin from './WithLogin.jsx'
import ImagePlaceholder from '../resources/icon-placeholder.png'

const Icon = ({ icon, onIconUploaded }) => { 
  let imgSrc = ImagePlaceholder;
  if (icon && icon.url !== '')
    imgSrc = icon.url;
  const fileChooserID = 'file-chooser';
  const onImgClicked  = () => document.getElementById(fileChooserID).click();

  return (
    <div> 
      <img
        src={imgSrc}
        alt='Skill Icon'
        width='210'
        onClick={onImgClicked}
        style={{ 
          'margin-top': '30px', 
          'cursor': 'pointer',
        }} 
      />
      <WithLogin>
        <input
          id={fileChooserID}
          type='file'
          multiple size='1'
          onChange={onIconUploaded}
          style={{ 
            'visibility': 'hidden',
            'width': 0, 
            'height': 0,
          }} 
        />
      </WithLogin>
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.arrayOf(
    PropTypes.shape({
      skill_id: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  onIconUploaded: PropTypes.func.isRequired,
};

export default Icon;
