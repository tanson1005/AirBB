
import './roomList.scss'
//MUI UI
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import RoomItem from '../../Components/Room-item/RoomItem';
//constant
import { IRoomDetail } from '../../constant/constant'
import useRoomList from './roomListLogic';

function RoomList() {
  const stateData =useRoomList()
  const handleChipClick = () => {
    return 1
  }
  return (
    <div className='room-list'>
      <div className="room-list-left">
        <div className="header-room-list">
          <div className="title-room-list">
            <p>{`Hiện có ${stateData.length} chỗ ở.`}</p>
            <h1>Chỗ ở tại khu vực bạn đã chọn</h1>
          </div>
          <Stack direction="row" spacing={1} className='mui-ui-stack'>
            <Chip className='mui-ui-chip' label="Loại nơi ở" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Giá" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Đặt ngay" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Phòng ngủ" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Bộ lọc khác" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
          </Stack>
          <div className="room-item-list">
            {stateData.map((item: IRoomDetail)=>{
              return <RoomItem key={item.id} listRoomItem={item}/>
            })}
          </div>
        </div>
      </div>
      <div className="room-list-right">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.6309969348936!2d108.20993567495296!3d15.980635184686102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421a5ddd6493f5%3A0xaf68766cc6bfea66!2zMjI2IE5ndXnhu4VuIFF1YW5nIEzDom0sIEhvw6AgWHXDom4sIEPhuqltIEzhu4csIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1719625709365!5m2!1svi!2s"></iframe>
      </div>
    </div>
  )
}

export default RoomList