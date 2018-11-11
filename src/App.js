// in src/App.js
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import TagsList from './components/TagsList'

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="tags" list={TagsList} />
    <Resource name="categories" list={ListGuesser} />

  </Admin>
  )
;

export default App;

