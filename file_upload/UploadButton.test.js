import React from 'react';

import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import UploadButton from './UploadButton.js';

let selectionFn;
let theComponent;

beforeEach(() => {
  selectionFn = jest.fn();
  theComponent = <UploadButton label="Upload" onFileSelect={selectionFn}/>;
});

afterEach(() => {
  selectionFn.mockReset();
});

it('the component should be composed of an Upload Button and a File Input', () => {
  const wrapper = shallow(theComponent);

  const buttons = wrapper.find('button');
  const files = wrapper.find('[type="file"]');

  expect(buttons.length).toEqual(1);
  expect(files.length).toEqual(1);
})

it('clicking on the Upload Button, should open the file dialog', () => {

  const wrapper = mount(theComponent);

  const spy = jest.spyOn(wrapper.instance(),'showFileDialog');
  wrapper.instance().forceUpdate();

  const theButton = wrapper.find('button').first();
  theButton.simulate('click');

  expect(spy).toHaveBeenCalled();
})

it('selection of a file from the dialog, should invoke the attached callback', () => {

  const wrapper = mount(theComponent);

  const fileInput = wrapper.find('[type="file"]').first();
  fileInput.simulate('change');

  expect(selectionFn).toHaveBeenCalled();
})
