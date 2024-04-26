import React, { Fragment } from 'react'; // Import Fragment from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './Template/Home-template/HomeTemplate';

function App() {
  return (
    <Fragment> {/* Use Fragment here */}
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
