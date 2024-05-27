import './roomItem.scss';
// constant
import { IRoomDetail } from '../../constant/constant';
import { NavLink } from 'react-router-dom';

interface IProps {
    listRoomItem: IRoomDetail,
}

function RoomItem({ listRoomItem }: IProps) {
    return (
        <div className='room-item'>
            <div className="room-item-img">
                <img src={listRoomItem?.hinhAnh ?? 'default-image.jpg'} alt="..." />
            </div>
            <div className="room-item-content">
                <div className="room-item-title">
                    <p>Toàn bộ căn hộ, khách sạn tại địa điểm</p>
                    <NavLink to={`/room/${listRoomItem?.id}`}><h2>{listRoomItem?.tenPhong ?? 'Unknown Room'}</h2></NavLink>
                </div>
                <hr className='hr-item' />
                <div className="room-item-detail">
                    <p className='room-description'>{listRoomItem?.moTa ?? 'No description available.'}</p>
                </div>
                <div className="room-item-price">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <p><span>{`${listRoomItem?.giaTien ?? 'N/A'}$`}</span>/ đêm</p>
                </div>
            </div>
        </div>
    );
}

export default RoomItem;
