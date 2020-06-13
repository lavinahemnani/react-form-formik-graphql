import React from 'react';
import ReactDOM from 'react-dom';
import uploadDoc from './uploadDoc';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<uploadDoc />, div);
  ReactDOM.unmountComponentAtNode(div);
});
