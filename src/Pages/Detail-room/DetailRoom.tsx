import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import Detail from '../../Components/Detail/detail';
import { useCommentRoom, useLocation, useRoomDetail } from './DetailRoomLogic';
import { ILocationItem } from '../../constant/constant';

function DetailRoom() {
  const stateData = useRoomDetail();
  const stateLocation = useLocation();
  const stateComment = useCommentRoom();

  const currentLocation = stateLocation.find((item: ILocationItem) => item.id === stateData.maViTri);

  useEffect(() => {
  }, [stateData, stateLocation, stateComment]);

  return (
    <div>
      <Container maxWidth='lg'>
        <Detail dataDetail={stateData} location={currentLocation} comment={stateComment.stateComment} commentIdList={stateComment.listCommentSortById} />
      </Container>
    </div>
  );
}

const MemoizedDetailRoom = React.memo(DetailRoom);

export default MemoizedDetailRoom;