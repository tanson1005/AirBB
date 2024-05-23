import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { deleteKey } from '../../utils/utils';
import { ACCESS_TOKEN, ACCESS_USER_ID } from '../../constant/constant';
import { setDefaultProfile } from '../../redux/user-slice/UserSlice';
import { useScrollTop } from '../../hooks/useScrollTop';
import AdminSideBar from './AdminSideBar';
import swal from 'sweetalert';

function AdminTemplate() {
  useScrollTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useState({ left: false });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteKey(ACCESS_TOKEN);
    deleteKey(ACCESS_USER_ID);
    dispatch(setDefaultProfile());
    navigate('/');
    swal("Đã đăng xuất thành công!", { icon: "success" });
  };

  const toggleDrawer = (anchor: 'left', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleCloseSideBar = () => {
    setState({ left: false });
  };

  return (
    <div className='admin-template'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className='menu-bar-header' position="static" sx={{ backgroundColor: 'white' }}>
          <Toolbar>
            <Typography variant="h6" component="div" color="black" sx={{ flexGrow: 1, fontSize: '2rem' }}>
              Manage System - AirBnb
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
                className='mui-iconBtn'
              >
                <i className="fa fa-user" aria-hidden="true"></i>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} sx={{ fontSize: '1.6rem' }}>
                  <NavLink to={'/Detail/profile'}>Profile</NavLink>
                </MenuItem>
                <hr />
                <MenuItem onClick={handleLogout} sx={{ fontSize: '1.6rem' }}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <AdminSideBar handleCloseSideBar={handleCloseSideBar} />
      </Drawer>
      <div className='carousel'>
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-user" aria-hidden="true"></i>}
          onClick={() => {
            navigate('/@@admin/user');
            handleCloseSideBar();
          }}
        >
          Quản lý người dùng
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-map-marker" aria-hidden="true"></i>}
          onClick={() => {
            navigate('/@@admin/location');
            handleCloseSideBar();
          }}
        >
          Quản lý địa điểm
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-home" aria-hidden="true"></i>}
          onClick={() => {
            navigate('/@@admin/roomdetail');
            handleCloseSideBar();
          }}
        >
          Quản lí thông tin phòng
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-id-card" aria-hidden="true"></i>}
          onClick={() => {
            navigate('/@@admin/booked');
            handleCloseSideBar();
          }}
        >
          Quản lý đặt phòng
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<i className="fa fa-backward" aria-hidden="true"></i>}
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminTemplate;
