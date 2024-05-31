import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "./detail.scss"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { getLocal } from '../../utils/utils';
import { ACCESS_USER_ID, IRoomDetail } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppDispatch } from '../../redux/store'
import { getListBookedRoom } from '../../redux/Admin-slice/AdminBookingSlice'
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
  const [open, setOpen] = React.useState(false);
  const [checkPayment, setCheckPayment] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [openGuest, setOpenGuest] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [phoneDate, setPhoneDate] = React.useState<DateRange[]>([]);
  const idRoom = (useParams<{ idDetail: string }>()?.idDetail) ?? '';
  const navigate = useNavigate();
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [inputFilled, setInputFilled] = React.useState(false);
  const [dateDifferent, setDateDifferent] = React.useState(0);

  React.useEffect(() => {
    dispatch(getListBookedRoom());
  }, []);

  const availableCount = useCheckAvailableCount(idRoom || '', dateStart, dateEnd);

  React.useEffect(() => {
    setDateDifferent(Math.ceil(Math.abs(Date.parse(dateEnd) - Date.parse(dateStart)) / (1000 * 60 * 60 * 24)));
    setInputFilled(dateDifferent !== 0 && dateEnd !== "" && dateStart !== "" && guest !== 0);
  }, [dateEnd, dateStart, dateDifferent, guest]);

  // Restore saved data when component mounts
  React.useEffect(() => {
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      const { dateStart, dateEnd, guest } = JSON.parse(savedData);
      setDateStart(dateStart);
      setDateEnd(dateEnd);
      setGuest(guest);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setInputGuest(event.target.value);
    return inputGuest;
  };

  const handleGuest = (index: number) => {
    setGuest(guest + index);
  }

  const handleBooking = async () => {
    if (!inputFilled) {
      swal("Bạn chưa điền ngày đến ngày đi!", { icon: "error" })
    } else {
      if (getLocal(ACCESS_USER_ID)) {
        if (availableCount < 1) {
          try {
            const value = {
              maPhong: idRoom.idDetail,
              ngayDen: dateStart,
              ngayDi: dateEnd,
              soLuongKhach: guest,
              maNguoiDung: getLocal(ACCESS_USER_ID)
            }
            await axiosInterceptorWithCybertoken.post("/api/dat-phong", value)
            setDateEnd("")
            setDateStart("")
            setGuest(1)
            swal("Thuê phòng thành công!", { icon: "success" })
            navigate('/Detail/profile')
          } catch (err) {
            swal("Thuê phòng thất bại!", { icon: "error" })
            console.log(err)
          }
        } else {
          swal("Phòng hiện tại không có sẵn trong ngày bạn đã đặt!", { icon: "error" })
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
            swal("Bạn đã được chuyển trang đăng nhập", { icon: "success" });
            navigate("/auth/login")
          } else {
            swal("Bạn sẽ tiếp tục với tư cách là khách!");
            navigate("/")
          }
        });
      }
    }
  }

  const handleDate = (dates: any) => {
    if (dates && dates.length) {
      setDateStart(dates[0].$d);
      setDateEnd(dates[1].$d);
      localStorage.setItem('savedData', JSON.stringify({ ...JSON.parse(localStorage.getItem('savedData')), dateStart: dates[0].$d, dateEnd: dates[1].$d }));
    }
  }

  const disabledDate = (current: any) => {
    // Allow only future dates
    return current && current < dayjs().startOf('day');
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDate = () => {
    setOpenDate(false);
    handleDate(phoneDate);
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
    padding : 4,
    };

  return !phone ? (
    <div className='my-3'>
      <RangePicker
        className='detail-range-picker'
        onChange        ={handleDate}
        format={dateFormat}
        disabledDate={disabledDate}
      />

      <FormControl variant="filled" sx={{ color: "black", width: "100%", border: "solid 1px", padding: "0.5rem", borderRadius: "0 0 10px 10px" }}>
        <InputLabel id="demo-simple-select-filled-label" sx={{ fontSize: "2rem", color: "black" }}>{guest} Guest</InputLabel>
        <Select
          sx={{ backgroundColor: "white" }}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={inputGuest}
          onChange={handleChange}
        >
          <div className='d-flex align-items-center justify-content-between'>
            <div className='ml-5 mt-4'>
              <h3>Adults</h3>
              <h5>Age 13+</h5>
            </div>
            <div className='d-flex align-items-center'>
              <button disabled={guest === 1 ? true : false} id="decGuest" type="button" className='guest-Button' onClick={() => { handleGuest(-1) }}>-</button>
              <h2>{guest}</h2>
              <button disabled={guest === khachMax ? true : false} id="incGuest" type="button" className='guest-Button' onClick={() => { handleGuest(1) }}>+</button>
            </div>
          </div>
          <p className="guest-description">This place has a maximum of {khachMax} people</p>
          <button className="guest-close mb-4" style={{ marginLeft: "80%" }}>Close</button>
        </Select>
      </FormControl>
      <button className="detail-submit-guest" type='button' onClick={handleBooking}>
        {!inputFilled ? "Thuê nhà" : "Check availability"}
      </button>

      {!inputFilled ?
        <p className='text-center'>
          Enter dates and number of guests to check the total trip price, including additional fees and any taxes.
        </p>
        :
        <div>
          <p className='text-center'>
            Bạn chưa bị tính tiền
          </p>
          <div className='detail-fees'>
            <p>
              ${giaTien} USD x {dateDifferent} nights
            </p>
            <p>
              {giaTien * dateDifferent} USD
            </p>
          </div>
          <hr />
          <div className='detail-fees-total'>
            <p>
              Total
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
      <Button onClick={handleOpen}>Reserve</Button>

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
              onChange={item => {
                // setPhoneDate([item.selection])
                console.log(item)
              }}
              moveRangeOnFirstSelection={false}
              ranges={phoneDate.map(d => ({ startDate: d.startDate, endDate: d.endDate }))}
              minDate={dayjs().toDate()} 
            />
          </div>
          <button className="guest-close my-4 ml-5" onClick={handleCloseDate}>Close</button>
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
              <h3>Adults</h3>
              <h5>Age 13+</h5>
            </div>
            <div className='d-flex align-items-center'>
              <button disabled={guest === 1 ? true : false} id="decGuest" type="button" className='guest-Button' onClick={() => { handleGuest(-1) }}>-</button>
              <h2>{guest}</h2>
              <button disabled={guest === khachMax ? true : false} id="incGuest" type="button" className='guest-Button' onClick={() => { handleGuest(1) }}>+</button>
            </div>
          </div>
          <p className="guest-description">This place has a maximum of {khachMax} people</p>
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
              <h3>{inputFilled ? "Confirm and pay" : "Request to book"}</h3>
            </header>
            <section className='booking-main' style={{}}>
              <section className='booking-detail'>
                <img src={dataDetail.hinhAnh} alt="" />
                <div>
                  <p>Phòng</p>
                  <h5>{dataDetail.tenPhong}</h5>
                </div>
              </section>

              <section className='booking-room'>
                <h1 className='mt-2 mb-5'>Your trip</h1>
                <div className='booking-room-date mb-3'>
                  <div>
                    <h3>Dates</h3>
                    <p>{dateDifferent !== 0 && !Number.isNaN(dateDifferent) ? ` ${new Date(dateStart).toLocaleDateString('en-CA')} - ${new Date(dateEnd).toLocaleDateString('en-CA')}` : "Bạn chưa chọn ngày"}</p>
                  </div>
                  <h3 className='edit-booking' onClick={() => { setOpenDate(true) }}>Edit</h3>
                </div>
                <div className='booking-room-guest'>
                  <div>
                    <h3>Guest</h3>
                    <p>{guest} guest</p>
                  </div>
                  <h3 className='edit-booking' onClick={() => { setOpenGuest(true) }}>Edit</h3>
                </div>
              </section>

              <section className='booking-payment'>
                <h1>Choose how to pay</h1>
                <div>
                  <div className={`form-check ${!checkPayment ? "active" : ""}`}>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      <h2>Pay in full</h2>
                      <p>{inputFilled ? `Trả đầy đủ ${giaTien} USD now` : `Trả ${giaTien} USD`}</p>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={!checkPayment} onChange={() => { setCheckPayment(false) }} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className={`form-check ${checkPayment ? "active" : ""}`}>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      <h2>Just Reserve</h2>
                      <p>{inputFilled ? `Đặt chỗ giữ ${giaTien * dateDifferent} USD ngay bây giờ` : `Đặt chỗ giữ ${giaTien} USD`}</p>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={checkPayment} onChange={() => { setCheckPayment(true) }} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <button className='detail-submit-guest' type='button' onClick={() => { handleBooking(); setOpen(false) }}>{inputFilled ? "Confirm and pay" : "Request to book"}</button>
              </section>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SelectVariants;
