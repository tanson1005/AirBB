import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// interface store
import { AppDispatch, RootState } from '../../redux/store'
// const
import { IComment, ILocationItem, IRoomDetail, ICommentId } from '../../constant/constant'
import { getRoomById } from '../../redux/Detail-slice/DetailSlice'
import { appendCommentID, getCommentByRoomId, getCommentList } from '../../redux/Comment-slice/CommentSlice'

export const useRoomDetail = () => {
  const { idDetail } = useParams<{ idDetail: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (idDetail) {
      dispatch(getRoomById(idDetail))
    }
  }, [idDetail, dispatch])

  const stateData: IRoomDetail | undefined = useSelector((state: RootState) => state.sliceRoomDetail.currentRoom)
  return stateData
}

export const useCommentRoom = () => {
  const { idDetail } = useParams<{ idDetail: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (idDetail) {
      dispatch(getCommentByRoomId(idDetail))
      dispatch(getCommentList())
    }
  }, [idDetail, dispatch])

  const stateComment: IComment[] | undefined = useSelector((state: RootState) => state.sliceComment.currentRoomComment)
  const listComment: ICommentId[] | undefined = useSelector((state: RootState) => state.sliceComment.listComment)
  const listCommentSortById: ICommentId[] | undefined = listComment?.filter((item: ICommentId) => item.maPhong === Number(idDetail))

  useEffect(() => {
    if (listCommentSortById) {
      dispatch(appendCommentID(listCommentSortById))
    }
  }, [listCommentSortById, dispatch])

  return { stateComment, listCommentSortById }
}

export const useLocation = () => {
  const stateLocation: ILocationItem[] | undefined = useSelector((state: RootState) => state.sliceLocation.inspectOfSearchPage)
  return stateLocation
}
