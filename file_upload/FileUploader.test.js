import React from 'react';

import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import FileUploader from './FileUploader.js';

let theComponent;

beforeEach(() => {
  theComponent = <FileUploader label="Upload" targetURL='http://localhost:3434'/>;
});

afterEach(() => {
});

it('the component should house the UploadButton', () => {
  const wrapper = shallow(theComponent);

  expect(wrapper.find('UploadButton').length).toEqual(1);
});

it('should attempt to transfer the selected file to the destination',() => {

  const wrapper = mount(theComponent);

  const spy = jest.spyOn(wrapper.instance(),'acceptFile');
  wrapper.instance().forceUpdate();

  const fileInput = wrapper.find('[type="file"]').first();
  fileInput.simulate('change');

  expect(spy).toHaveBeenCalled();
})

it('should validate file size before transfer',() => {

  const wrapper = mount(theComponent);
  const instance = wrapper.instance();

  const givenFile = {name:'A large file', size:(1024*1024*1024)+1};

  expect(instance.isValidFile(givenFile)).toBe(false);
})

it('should render the upload history',() => {

  const files = {};
  files['A File Name'] = { key: 'A File Name', status: 'Progress', progress: 50 };

  const wrapper = shallow(theComponent);
  wrapper.setState({files:files});

  const element = wrapper.find('li').first();
  expect(element.contains('A File Name')).toEqual(true);
  expect(element.contains('Progress')).toEqual(true);
  expect(element.contains(50)).toEqual(true);
})
