import { Fragment, lazy } from 'react' // Import Fragment from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './Template/Home-template/HomeTemplate';

const HomePage = lazy(() => { return import('./Pages/Home-page/HomePage') })

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route path='' element={<HomePage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
