import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Templates
import HomeTemplate from './Template/Home-template/HomeTemplate';
import DetailTemplate from './Template/Detail-template/DetailTemplate';
import RoomTemplate from './Template/Room-template/RoomTemplate';
import RegisterTemplate from './Template/Register-template/RegisterTemplate';
import AdminTemplate from './Template/Admin-template/AdminTemplate';

// Lazy loading components
// User
const HomePage = React.lazy(() => import('./Pages/Home-page/HomePage'));
const RoomList = React.lazy(() => import('./Pages/Room-list/RoomList'));
const PersonalInformation = React.lazy(() => import('./Pages/Personal-information/PersonalInformation'));
const Detail = React.lazy(() => import('./Pages/Detail-room/DetailRoom'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));

// Admin
const ManageUser = React.lazy(() => import('./Components/Admin/ManageUser'));
const ManageRoom = React.lazy(() => import('./Components/Admin/ManageRoom'));
const ManageBookedRoom = React.lazy(() => import('./Components/Admin/ManageBookedRoom'));
const ManageLocation = React.lazy(() => import('./Components/Admin/ManageLocation'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomeTemplate />}
          >
            <Route path=":idLocation" element={<RoomList />} />
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route
            path="detail"
            element={<DetailTemplate />}
          >
            <Route path="profile" element={<PersonalInformation />} />
          </Route>
          <Route
            path="room"
            element={<RoomTemplate />}
          >
            <Route path=":idDetail" element={<Detail />} />
          </Route>
          <Route
            path="auth"
            element={<RegisterTemplate />}
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route
            path="@@admin"
            element={<AdminTemplate />}
          >
            <Route path="user" element={<ManageUser />} />
            <Route path="roomdetail" element={<ManageRoom />} />
            <Route path="booked" element={<ManageBookedRoom />} />
            <Route path="location" element={<ManageLocation />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
