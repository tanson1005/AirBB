import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import ButtonHeader from '../Button-header-login/Button';
import BasicModal from '../Modal/ModalLocation';
import { getLocal, deleteKey } from '../../utils/utils';
import { ACCESS_TOKEN, ACCESS_USER_ID } from '../../constant/constant';
import { useLoginRenderAva } from './headerHomeLogic';
import { RootState } from '../../redux/store';
import { setDefaultProfile } from '../../redux/user-slice/UserSlice';
import AirbnbLogo from '../../assets/Image/Airbnb_logo.png';
import useProfileAvatar from '../../hooks/useProfileAvatar'; 
import './headerHome.scss';

const modalStyle = {
    position: 'absolute',
    top: '18%',
    left: '90%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '8px',
};

const HeaderHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getAccessToken: string = getLocal(ACCESS_TOKEN);
    const inputRef = useRef<null | HTMLInputElement>(null);

    const [active, setActive] = useState<boolean[]>([true, false, false, false]);
    const [show, setShow] = useState<boolean>(false);
    const [valueInput, setValue] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleSetShow = (): void => {
        setShow(!show);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSetActive = (index: number): void => {
        const newActiveState = [false, false, false, false];
        newActiveState[index] = true;
        setActive(newActiveState);
        if (index === 0) {
            inputRef.current?.focus();
        }
    };

    const avaName = useLoginRenderAva(getAccessToken);
    const avatarUrl = useProfileAvatar();

    const handleLogOut = () => {
        deleteKey(ACCESS_TOKEN);
        deleteKey(ACCESS_USER_ID);
        setReload(!reload);
        dispatch(setDefaultProfile());
        navigate('/');
        swal("Đã đăng xuất thành công!", { icon: "success" });
    };

    const role = useSelector((state: RootState) => state.sliceUser.profileData?.role);

    return (
        <div className={`header-home ${show ? 'mb-100' : ''}`}>
            <div className={`header-home-layer ${show ? 'h-100' : ''}`}></div>
            <div className="container-header">
                <div className="left-header">
                    <NavLink to={'/'}>
                        <img src={AirbnbLogo} alt="Airbnb Logo" className='logo'/>
                    </NavLink>
                </div>
                <div className="mid-wrapper">
                    <div className={`mid-header ${!show ? '' : 'hide'}`}>
                        <div className="layer" onClick={handleSetShow}></div>
                        <div className="location-random">
                            <p>Địa điểm bất kỳ</p>
                        </div>
                        <div className="week">
                            <p>Tuần bất kỳ</p>
                        </div>
                        <div className="add-customer">
                            <p>Thêm khách</p>
                            <button className='search-btn'>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className={`zoomout-comonent ${show ? 'show' : ''}`}>
                        <div className="above-content">
                            <p>Chỗ ở</p>
                            <p>Trải nghiệm</p>
                            <p>Trải nghiệm trực tuyến</p>
                            <button className='close-btn' onClick={handleSetShow} aria-label="Close">x</button>
                        </div>
                        <div className="under-content">
                            <div className={`reach-location under-content-text ${active[0] ? 'active' : ''}`} onClick={() => handleSetActive(0)}>
                                <BasicModal value={valueInput} setValue={setValue}>
                                    <div>
                                        <p>Địa điểm</p>
                                        <span className='under-content-span'>{valueInput ? valueInput : 'Bạn muốn đến đâu'}</span>
                                        <span className='mobile-span'>{valueInput ? valueInput : 'Bạn muốn đến đâu'}</span>
                                    </div>
                                </BasicModal>
                            </div>
                            <div className={`date-checkin under-content-text ${active[1] ? 'active' : ''}`} onClick={() => handleSetActive(1)}>
                                <p>Nhận phòng</p>
                                <span>Thêm ngày</span>
                            </div>
                            <div className={`date-checkout under-content-text ${active[2] ? 'active' : ''}`} onClick={() => handleSetActive(2)}>
                                <p>Trả phòng</p>
                                <span>Thêm ngày</span>
                            </div>
                            <div className={`search-check under-content-text ${active[3] ? 'active' : ''}`} onClick={() => handleSetActive(3)}>
                                <div className="search-check-content">
                                    <p>Khách</p>
                                    <span>Thêm khách</span>
                                </div>
                                <button className='search-btn-check'>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="sub-content"></div>
                    </div>
                </div>
                <div className="right-header">
                    <p className={!show ? 'right-header-title' : 'hide'}>Cho thuê chỗ ở qua Airbnb</p>
                    <p className={!show ? 'right-header-sub' : 'hide right-header-sub'}>Cho thuê chỗ ở</p>
                    <FontAwesomeIcon icon={faEarthAmericas} className='icon-right-header'/>
                    {
                        !getAccessToken ? (
                            <ButtonHeader>
                                <div className="login-area">
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </div>
                            </ButtonHeader>
                        ) : (
                            <div>
                                <Button onClick={handleOpen} sx={{ width: '40px', height: '40px', borderRadius: '50%', minWidth: 'unset' }}>
                                    <Avatar src={avatarUrl ? avatarUrl : '/path/to/default/avatar.png'} sx={{ bgcolor: deepOrange[500] }}>{avaName ? avaName : 'N'}</Avatar>
                                </Button>
                                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={modalStyle} className='mui-box-avatar'>
                                        <NavLink to={'/Detail/profile'}>Profile</NavLink>
                                        {role === 'ADMIN' && <NavLink to={'/@@admin/user'}>For Admin</NavLink>}
                                        <hr />
                                        <Button variant="text" sx={{ fontSize: '1.6rem' }} onClick={handleLogOut}>Log out</Button>
                                    </Box>
                                </Modal>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderHome;
