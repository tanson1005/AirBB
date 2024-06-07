import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "./detail.scss";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { getLocal } from '../../utils/utils';
import { ACCESS_USER_ID, IRoomDetail } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppDispatch } from '../../redux/store';
import { getListBookedRoom } from '../../redux/Admin-slice/AdminBookingSlice';
import useCheckAvailableCount from './handleCheckAvailable';


dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

interface IProps {
  giaTien: number,
  khachMax: number,
  phone: boolean,
  dataDetail: IRoomDetail
}

const SelectVariants: React.FC<IProps> = ({ khachMax, giaTien, phone, dataDetail }) => {
  const dispatch = useDispatch<AppDispatch>();
  const SavedData = getLocal('savedData')
  const [open, setOpen] = React.useState(false);
  const [openGuest, setOpenGuest] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [phoneDate, setPhoneDate] = React.useState<{ startDate: Date, endDate: Date }[]>([]);
  const idRoomParam = useParams<{ idDetail?: string }>()?.idDetail;
  const idRoom = typeof idRoomParam === 'string' ? idRoomParam : '';
  const navigate = useNavigate();
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [inputFilled, setInputFilled] = React.useState(false);
  const [dateDifferent, setDateDifferent] = React.useState(0);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  React.useEffect(() => {
    dispatch(getListBookedRoom());
  }, [dispatch]);

  const availableCount = useCheckAvailableCount(idRoom || '', dateStart, dateEnd);

  React.useEffect(() => {
    const dateDiff = Math.ceil(Math.abs(Date.parse(dateEnd) - Date.parse(dateStart)) / (1000 * 60 * 60 * 24));
    setDateDifferent(dateDiff);
    setInputFilled(dateDiff !== 0 && dateEnd !== "" && dateStart !== "" && guest !== 0);
  }, [dateEnd, dateStart, guest]);

  React.useEffect(() => {
    if (SavedData) {
      const { dateStart, dateEnd, guest } = SavedData;
      setDateStart(dateStart);
      setDateEnd(dateEnd);
      setGuest(guest);
      setState([
        {
          startDate: new Date(dateStart),
          endDate: new Date(dateEnd),
          key: 'selection'
        }
      ]);
      handleOpen();
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setInputGuest(event.target.value);
    return inputGuest;
  };

  const handleGuest = (index: number) => {
    setGuest(guest + index);
  };

  const handleBooking = async () => {
    if (!inputFilled) {
      swal("Bạn chưa điền ngày đến ngày đi!", { icon: "error" });
    } else {
      if (getLocal(ACCESS_USER_ID)) {
        if (availableCount < 1) {
          try {
            const value = {
              maPhong: idRoom,
              ngayDen: dateStart,
              ngayDi: dateEnd,
              soLuongKhach: guest,
              maNguoiDung: getLocal(ACCESS_USER_ID)
            };
            await axiosInterceptorWithCybertoken.post("/api/dat-phong", value);
            setDateEnd("");
            setDateStart("");
            setGuest(1);
            swal("Thuê phòng thành công!", { icon: "success" });
            localStorage.removeItem('savedData');
            // 2. Set bookingSuccess to true upon successful booking
            setBookingSuccess(true);
            navigate('/room/' + idRoom);
          } catch (err) {
            swal("Thuê phòng thất bại!", { icon: "error" });
            console.log(err);
          }
        } else {
          swal("Phòng hiện tại không có sẵn trong ngày bạn đã đặt!", { icon: "error" });
        }
      } else {
        swal({
          title: "Bạn chưa đăng nhập!",
          text: "Bạn phải đăng nhập để có thể đặt phòng!",
          icon: "warning",
          buttons: [true, "Đăng nhập"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            localStorage.setItem('savedData', JSON.stringify({idRoom:idRoom, dateStart: dateStart, dateEnd: dateEnd, guest }));
            swal("Bạn đã được chuyển trang đăng nhập", { icon: "success" });
            navigate("/auth/login");
          } else {
            // swal("Bạn sẽ tiếp tục với tư cách là khách!");
            // navigate("/");
          }
        });
      }
    }
  };

  const handleDate = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      const formattedStart = start.format(dateFormat);
      const formattedEnd = end.format(dateFormat);
      setDateStart(formattedStart);
      setDateEnd(formattedEnd);
      setState([
        {
          startDate: start.toDate(),
          endDate: end.toDate(),
          key: 'selection'
        }
      ]);
      setPhoneDate([{ startDate: start.toDate(), endDate: end.toDate() }]);
    }
  };
  
  
  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf('day');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDate = () => {
    setOpenDate(false);
    if (phoneDate.length > 0) {
      handleDate([dayjs(phoneDate[0].startDate), dayjs(phoneDate[0].endDate)]);
    }
  };
  
  const handleCloseGuest = () => {
    setOpenGuest(false);
  };

  const styleGuest: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '24px',
    padding: 4,
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24px',
    padding: 4,
  };

const handleSelectDate = (date: RangeKeyDict) => {
  const start = date.selection.startDate;
  const end = date.selection.endDate;
  if (start && end) {
    const formattedStart = dayjs(start).format(dateFormat);
    const formattedEnd = dayjs(end).format(dateFormat);
    setDateStart(formattedStart);
    setDateEnd(formattedEnd);
    setState([{ startDate: start, endDate: end, key: 'selection' }]);
    setPhoneDate([{ startDate: start, endDate: end }]);
  }
};

  
  

return (
  bookingSuccess ? (
    <Navigate to={'/room/' + idRoom} />
  ) : (
    !phone ? (
      <div className='my-3'>
        <RangePicker
          className='detail-range-picker'
          onChange={handleDate}
          format={dateFormat}
          disabledDate={disabledDate}
        />
        <FormControl variant="filled" sx={{ color: "black", width: "100%", border: "solid 1px", padding: "0.5rem", borderRadius: "0 0 10px 10px" }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ fontSize: "2rem", color: "black" }}>{guest} Khách</InputLabel>
          <Select
            sx={{ backgroundColor: "white" }}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={inputGuest}
            onChange={handleChange}
          >
            <div className='d-flex align-items-center justify-content-between'>
              <div className='ml-5 mt-4'>
                <h3>Người lớn</h3>
                <h5>Tuổi 13+</h5>
              </div>
              <div className='d-flex align-items-center'>
                <button disabled={guest === 1} id="decGuest" type="button" className='guest-Button' onClick={() => { handleGuest(-1) }}>-</button>
                <h2>{guest}</h2>
                <button disabled={guest === khachMax} id="incGuest" type="button" className='guest-Button' onClick={() => { handleGuest(1) }}>+</button>
              </div>
            </div>
            <p className="guest-description">Nơi này có tối đa {khachMax} Người</p>
            <button className="guest-close mb-4" style={{ marginLeft: "80%" }}>Đóng</button>
          </Select>
        </FormControl>
        <button className="detail-submit-guest" type='button' onClick={handleBooking}>
          {!inputFilled ? "Thuê nhà" : "Kiểm Tra"}
        </button>

        {!inputFilled ?
          <p className='text-center'>
            Nhập ngày và số lượng khách để kiểm tra tổng giá chuyến đi, bao gồm các khoản phí bổ sung và mọi khoản thuế.
          </p>
          :
          <div>
            <p className='text-center'>
              Bạn chưa bị tính tiền
            </p>
            <div className='detail-fees'>
              <p>
                ${giaTien} USD x {dateDifferent} / Đêm
              </p>
              <p>
                {giaTien * dateDifferent} USD
              </p>
            </div>
            <hr />
            <div className='detail-fees-total'>
              <p>
              Tổng cộng
              </p>
              <p>
                {giaTien * dateDifferent} USD
              </p>
            </div>
          </div>
        }
      </div>
    ) : (
      <div>
        <Button onClick={handleOpen}>Đặt Phòng</Button>

        <Modal
          open={openDate}
          onClose={handleCloseDate}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...styleGuest }}>
            <div className='d-flex justify-content-center mt-5'>
              <DateRange
                editableDateInputs={true}
                minDate={new Date()}
                onChange={handleSelectDate}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
            <button className="guest-close my-4 ml-5" onClick={handleCloseDate}>Đóng</button>
          </Box>
        </Modal>

        <Modal
          open={openGuest}
          onClose={handleCloseGuest}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...styleGuest }}>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='ml-5 mt-4'>
                <h3>Người lớn</h3>
                <h5>Tuổi 13+</h5>
              </div>
              <div className='d-flex align-items-center'>
                <button disabled={guest === 1} id="decGuest" type="button" className='guest-Button' onClick={() => { handleGuest(-1) }}>-</button>
                <h2>{guest}</h2>
                <button disabled={guest === khachMax} id="incGuest" type="button" className='guest-Button' onClick={() => { handleGuest(1) }}>+</button>
              </div>
            </div>
            <p className="guest-description">Nơi này có tối đa {khachMax} Người</p>
            <button className="guest-close mb-4 ml-5" onClick={handleCloseGuest}>Close</button>
          </Box>
        </Modal>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="detail-phone-box">
              <header className='booking-header'>
                <button type='button' onClick={() => { setOpen(false) }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                <h3>{inputFilled ? "Xác nhận và thanh toán" : "Yêu cầu đặt chỗ"}</h3>
              </header>
              <section className='booking-main'>
                <section className='booking-detail'>
                  <img src={dataDetail.hinhAnh} alt="" />
                  <div>
                    <p>Phòng</p>
                    <h5>{dataDetail.tenPhong}</h5>
                  </div>
                </section>

                <section className='booking-room'>
                  <h1 className='mt-2 mb-5'>Đặt phòng của bạn</h1>
                  <div className='booking-room-date mb-3'>
                    <div>
                      <h3>Ngày</h3>
                      <p>{dateDifferent !== 0 && !Number.isNaN(dateDifferent) ? `${new Date(dateStart).toLocaleDateString('en-CA')} - ${new Date(dateEnd).toLocaleDateString('en-CA')}` : "Bạn chưa chọn ngày"}</p>
                    </div>
                    <h3 className='edit-booking' onClick={() => { setOpenDate(true) }}>Edit</h3>
                  </div>
                  <div className='booking-room-guest'>
                    <div>
                      <h3>Khách</h3>
                      <p>{guest} khách</p>
                    </div>
                    <h3 className='edit-booking' onClick={() => { setOpenGuest(true) }}>Edit</h3>
                  </div>
                </section>
                <button className="detail-submit-guest" type='button' onClick={handleBooking}>
                  {!inputFilled ? "Thuê nhà" : "Kiểm Tra"}
                </button>
                {!inputFilled ?
                  <p className='text-center'>
                    Nhập ngày và số lượng khách để kiểm tra tổng giá chuyến đi, bao gồm các khoản phí bổ sung và mọi khoản thuế.
                  </p>
                  :
                  <div>
                    <p className='text-center'>
                      Bạn chưa bị tính tiền
                    </p>
                    <div className='detail-fees'>
                      <p>
                        ${giaTien} USD x {dateDifferent} / Đêm
                      </p>
                      <p>
                        {giaTien * dateDifferent} USD
                      </p>
                    </div>
                    <hr />
                    <div className='detail-fees-total'>
                      <p>
                      Tổng cộng
                      </p>
                      <p>
                        {giaTien * dateDifferent} USD
                      </p>
                    </div>
                  </div>
                }
              </section>
            </div>
          </Box>
        </Modal>
      </div>
    )
  )
);
};

export default SelectVariants;
