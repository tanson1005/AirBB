import { Fragment, lazy } from 'react' // Import Fragment from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//templates
import HomeTemplate from './Template/Home-template/HomeTemplate';
import DetailTemplate from './Template/Detail-template/DetailTemplate'
import RoomTemplate from './Template/Room-template/RoomTemplate'
//Lazy
const HomePage = lazy(() => { return import('./Pages/Home-page/HomePage') })
const RoomList = lazy(() => { return import('./Pages/Room-list/RoomList') })
const PersonalInformation = lazy(()=>{return import('./Pages/Personal-information/PersonalInformation')})

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route path=':idLocation' element={<RoomList />}></Route>
            <Route path='' element={<HomePage />}></Route>
          </Route>
          <Route path='Detail' element={<DetailTemplate />}>
            <Route path='profile' element={<PersonalInformation/>}></Route>
          </Route>
          <Route path='room' element={<RoomTemplate />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
