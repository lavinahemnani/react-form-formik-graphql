import React from 'react';
import ReactDOM from 'react-dom';
import customerForm from './customerForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<customerForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
