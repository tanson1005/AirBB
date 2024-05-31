import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getListRoomByIdLocation } from '../../redux/Location-slice/LocationSlice';
import { IRoomDetail } from '../../constant/constant';

const useRoomList = () => {
  const { idLocation } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (idLocation) {
      dispatch(getListRoomByIdLocation(idLocation));
    }
  }, [dispatch, idLocation]);

  const stateData: IRoomDetail[] | undefined = useSelector((state: RootState) => state.sliceLocation.listRoomByIdLocation);

  return stateData ?? [];
};

export default useRoomList;
