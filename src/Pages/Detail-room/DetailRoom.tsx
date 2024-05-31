import Detail from '../../Components/Detail/detail'
import { Container } from '@mui/material'
import { useCommentRoom, useLocation, useRoomDetail } from './DetailRoomLogic'
import { ILocationItem } from '../../constant/constant'

function DetailRoom() {
  const stateData = useRoomDetail()
  const stateLocation = useLocation()
  const stateComment = useCommentRoom()
  
  // Find the current location directly inside the location prop
  const currentLocation = stateLocation.find((item: ILocationItem)=> item.id === stateData.maViTri);

  return (
    <div>
      <Container maxWidth='lg'>
        {/* Pass the current location directly to the Detail component */}
        <Detail dataDetail={stateData} location={currentLocation} comment={stateComment.stateComment} commentIdList={stateComment.listCommentSortById}/> 
      </Container>
    </div>
  )
}

export default DetailRoom
