import { useEffect, useState } from 'react';
import { IBookRoom } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import RoomItem from '../Room-item/RoomItem';
import { Collapse } from 'antd';
import { UpdateBooking } from './UpdateBooking';
import { format } from 'date-fns';

interface IProps { 
    bookRoom: IBookRoom | any;
    index: number;
}

function BookRoom({ bookRoom, index }: IProps) {
    const [bookRoomList, setBookRoom] = useState({
        id: 0,
        tenPhong: '',
        tivi: false,
        phongNgu: 0,
        phongTam: 0,
        khach: 0,
        giuong: 0,
        giaTien: 0,
        maViTri: -1,
        mayGiat: false,
        wifi: false,
        banLa: false,
        banUi: false,
        bep: false,
        dieuHoa: false,
        doXe: false,
        moTa: '',
        hinhAnh: '',
        hoBoi: false,
    });

    useEffect(() => { 
        const fetchRoomDetails = async () => {
            try {
                const response = await axiosInterceptorWithCybertoken.get(`/api/phong-thue/${bookRoom?.maPhong}`);
                console.log("API Response: ", response.data); // Log the API response
                setBookRoom(response?.data?.content ?? {});
            } catch (err) {
                console.log(err);
            }
        };

        if (bookRoom?.maPhong) {
            fetchRoomDetails();
        }
    }, [bookRoom]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = format(date, 'dd-MM-yyyy');
        const formattedTime = format(date, 'HH:mm');
        return `${formattedDate} Bạn đã Check-In lúc: ${formattedTime}`;
    };

    const formatDateOut = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = format(date, 'dd-MM-yyyy');
        const formattedTime = format(date, 'HH:mm');
        return `${formattedDate} Bạn đã Check-Out lúc: ${formattedTime}`;
    };

    return (
        <div>
            <hr style={{ border: "solid 1px black" }} />
            <h2>Phòng {index + 1}</h2>
            <RoomItem listRoomItem={bookRoomList} />
            <Collapse
                items={[{
                    key: '1', label: 'Hiển thị thêm thông tin', children: 
                    <div>
                        <h3>Ngày đến: <span style={{ fontWeight: "400" }}>{bookRoom?.ngayDen ? formatDate(bookRoom.ngayDen) : ''}</span></h3>
                        <h3>Ngày đi: <span style={{ fontWeight: "400" }}>{bookRoom?.ngayDi ? formatDateOut(bookRoom.ngayDi) : ''}</span></h3>
                        <h3>Số khách: <span style={{ fontWeight: "400" }}>{bookRoom?.soLuongKhach}</span></h3>
                        <div className='d-flex justify-content-end'>
                            <UpdateBooking bookRoom={bookRoom} khachMax={bookRoomList?.khach ?? 0} />
                        </div>
                    </div>
                }]}
            />
            <hr style={{ border: "solid 1px black" }} />
        </div> 
    );
}

export default BookRoom;
