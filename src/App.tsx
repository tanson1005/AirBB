import { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Templates
import HomeTemplate from './Template/Home-template/HomeTemplate';
import DetailTemplate from './Template/Detail-template/DetailTemplate';
import RoomTemplate from './Template/Room-template/RoomTemplate';
import RegisterTemplate from './Template/Register-template/RegisterTemplate';
import AdminTemplate from './Template/Admin-template/AdminTemplate';
import HomePage from './Pages/Home-page/HomePage';
// Lazy loading components
//user
// const HomePage = lazy(() => import('./Pages/Home-page/HomePage'));
const RoomList = lazy(() => import('./Pages/Room-list/RoomList'));
const PersonalInformation = lazy(() => import('./Pages/Personal-information/PersonalInformation'));
const Detail = lazy(() => import('./Pages/Detail-room/DetailRoom'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Register = lazy(() => import('./Pages/Register/Register'));
//admin
const ManageUser = lazy(() => import('./Components/Admin/ManageUser'));
const ManageRoom = lazy(()=>{return import('./Components/Admin/ManageRoom')})
const ManageBookedRoom = lazy(()=>{return import('./Components/Admin/ManageBookedRoom')})
const ManageLocation = lazy(()=>{return import('./Components/Admin/ManageLocation')})

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='' element={<HomeTemplate />}>
              <Route path='list/:idLocation' element={<RoomList />} />
              <Route path='' element={<HomePage />} />
            </Route>
            <Route path='Detail' element={<DetailTemplate />}>
              <Route path='profile' element={<PersonalInformation />} />
            </Route>
            <Route path='room' element={<RoomTemplate />}>
              <Route path=':idDetail' element={<Detail />} />
            </Route>
            <Route path='auth' element={<RegisterTemplate />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='@@admin' element={<AdminTemplate />}>
              <Route path='user' element={<ManageUser />} />
              <Route path='roomdetail' element={<ManageRoom/>}></Route>
              <Route path='booked' element={<ManageBookedRoom/>}></Route>
              <Route path='location' element={<ManageLocation/>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
