import React from 'react';
import ReactDOM from 'react-dom';
import customers from './customers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<customers />, div);
  ReactDOM.unmountComponentAtNode(div);
});
