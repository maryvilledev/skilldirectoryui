import React, { PropTypes } from 'react';
import WithLogin from './WithLogin.jsx'
import ImagePlaceholder from '../resources/icon-placeholder.png'

/*
  Icon is a clickable image component. When it is clicked, it brings up a file
chooser window. If the user selects a file, the uploaded file is passed into
the callback defined by the onIconUploaded pop.
  If the icon prop is undefined or null, then the default image placeholder will
be displayed.
*/
const Icon = ({ icon, onIconUploaded }) => {
  let imgSrc = ImagePlaceholder;
  if (icon !== '')
    imgSrc = icon;
  const fileChooserID = 'file-chooser';
  const onImgClicked  = () => document.getElementById(fileChooserID).click();

  return (
    <span>
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
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.object({
      skill_id: PropTypes.string,
      url: PropTypes.string,
  }),
  onIconUploaded: PropTypes.func.isRequired,
};

export default Icon;
