import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import FolderItem from './FolderItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    id: '123',
    folder_name: 'test title',
  };
  ReactDOM.render(
    <BrowserRouter>
      <FolderItem {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
