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

const dateFormat = 'DD/MM/YYYY';

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
  const idRoom = useParams();
  const navigate = useNavigate();
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [inputFilled, setInputFilled] = React.useState(false);
  const [dateDifferent, setDateDifferent] = React.useState(0);
  const [phoneDate, setPhoneDate] = React.useState<{ startDate: Date, endDate: Date }[]>([]); // Sử dụng một kiểu dữ liệu duy nhất cho phoneDate

  React.useEffect(() => {
    dispatch(getListBookedRoom());
  }, []);

  const availableCount = useCheckAvailableCount(idRoom.idDetail, dateStart, dateEnd);

  React.useEffect(() => {
    setDateDifferent(Math.ceil(Math.abs(Date.parse(dateEnd) - Date.parse(dateStart)) / (1000 * 60 * 60 * 24)));
    setInputFilled(dateDifferent !== 0 && dateEnd !== "" && dateStart !== "" && guest !== 0);
  }, [dateEnd, dateStart, dateDifferent, guest]);

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
    padding