import { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Templates
import HomeTemplate from './Template/Home-template/HomeTemplate';
import DetailTemplate from './Template/Detail-template/DetailTemplate';
import RoomTemplate from './Template/Room-template/RoomTemplate';
import RegisterTemplate from './Template/Register-template/RegisterTemplate';
import AdminTemplate from './Template/Admin-template/AdminTemplate';

// Lazy loading components
// User
const HomePage = lazy(() => import('./Pages/Home-page/HomePage'));
const RoomList = lazy(() => import('./Pages/Room-list/RoomList'));
const PersonalInformation = lazy(() => import('./Pages/Personal-information/PersonalInformation'));
const Detail = lazy(() => import('./Pages/Detail-room/DetailRoom'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Register = lazy(() => import('./Pages/Register/Register'));

// Admin
const ManageUser = lazy(() => import('./Components/Admin/ManageUser'));
const ManageRoom = lazy(() => import('./Components/Admin/ManageRoom'));
const ManageBookedRoom = lazy(() => import('./Components/Admin/ManageBookedRoom'));
const ManageLocation = lazy(() => import('./Components/Admin/ManageLocation'));

function App() {
  return (
    <Fragment>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomeTemplate />}>
              <Route path=":idLocation" element={<RoomList />} />
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="detail" element={<DetailTemplate />}>
              <Route path="profile" element={<PersonalInformation />} />
            </Route>
            <Route path="room" element={<RoomTemplate />}>
              <Route path=":idDetail" element={<Detail />} />
            </Route>
            <Route path="auth" element={<RegisterTemplate />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="@@admin" element={<AdminTemplate />}>
              <Route path="user" element={<ManageUser />} />
              <Route path="roomdetail" element={<ManageRoom />} />
              <Route path="booked" element={<ManageBookedRoom />} />
              <Route path="location" element={<ManageLocation />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;
