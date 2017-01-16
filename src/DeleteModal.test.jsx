import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import DeleteModal from './DeleteModal.jsx';

describe('<DeleteModal />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeleteModal />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<DeleteModal />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  describe('the Yes button', function () {
    it('should trigger the delete callback', function () {
      let didDelete = false, didClose = false;
      const mockDelete = () => {didDelete = true; };
      const mockClose = () => {didClose = true; };
      const shouldDelete = (response) => {
        if (response) {
          mockDelete();
        }
        mockClose();
      }
      const node = shallow(
        <DeleteModal
          shouldDelete={shouldDelete}
        />
      );
      const yesButton = node.find('Button')
        .findWhere((button) => button.prop('name') == 'Yes');
      yesButton.simulate('click');
      expect(didClose).toEqual(true);
      expect(didDelete).toEqual(true);
    });
  });

  describe('the No button', function () {
    it('should close itself without deleting', function () {
      let didDelete = false, didClose = false;
      const mockDelete = () => {didDelete = true; };
      const mockClose = () => {didClose = true; };
      const shouldDelete = (response) => {
        if (response) {
          mockDelete();
        }
        mockClose();
      }
      const node = shallow(
        <DeleteModal
          shouldDelete={shouldDelete}
        />
      );
      const noButton = node.find('Button')
        .findWhere((button) => button.prop('name') == 'No');
      noButton.simulate('click');
      expect(didClose).toEqual(true);
      expect(didDelete).toEqual(false);
    });
  });
});
