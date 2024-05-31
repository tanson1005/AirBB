import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { deleteUserFromList, getUserByPhanTrang } from '../../redux/Admin-slice/AdminUserSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import AdminRegister from '../Admin-register-popup/AdminRegister';
import PersonModal from '../Admin-register-popup/PersonDetailModal';
import PersonUpdateModal from '../Admin-register-popup/PersonUpdateModal';
import './manage.scss';

const UserActions = ({ params }: { params: GridRenderCellParams }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);

  const onClick = (e: React.MouseEvent) => { e.stopPropagation(); setShow(true); };
  const onClick2 = (e: React.MouseEvent) => { e.stopPropagation(); setShowUpdate(true); };
  const onClick3 = (e: React.MouseEvent) => {
    e.stopPropagation();
    swal({
      title: "Bạn có chắc chắn muốn xóa người này?",
      text: "Không thể quay lại sau khi xóa",
      icon: "warning",
      buttons: ['Không xóa', 'Xóa!'],
      dangerMode: true,
    }).then(async (isConfirm) => {
      if (isConfirm) {
        swal({
          title: 'Xóa thành công!',
          text: `Người dùng với id ${params.row.id} đã bị xóa`,
          icon: 'success'
        }).then(async () => {
          await axiosInterceptorWithCybertoken.delete(`/api/users?id=${params.row.id}`);
          dispatch(deleteUserFromList([params.row.id]));
        });
      } else {
        swal("Hủy thành công", `Người dùng với id ${params.row.id} chưa bị xóa`, "error");
      }
    });
  };

  return (
    <div className="button-group">
      <Button variant="contained" onClick={onClick}>Xem chi tiết</Button>
      <Button variant="contained" onClick={onClick2} color='info'>Sửa</Button>
      <Button variant="contained" onClick={onClick3} color='error'>Xóa</Button>
      <Modal open={show} onClose={() => setShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <PersonModal personData={params.row} closeModal={() => setShow(false)} openUpdate={() => setShowUpdate(true)} />
      </Modal>
      <Modal open={showUpdate} onClose={() => setShowUpdate(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <PersonUpdateModal personData={params.row} handleCloseModal={() => setShowUpdate(false)} />
      </Modal>
    </div>
  );
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã', width: 70, align: 'center', headerAlign: 'center' },
  { field: 'name', headerName: 'Tên', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'avatar', headerName: 'Hình ảnh', width: 180, align: 'center', headerAlign: 'center', renderCell: (params) => <Avatar alt="Remy Sharp" src={params.row.avatar} /> },
  { field: 'role', headerName: 'Role', width: 100, align: 'center', headerAlign: 'center' },
  {
    field: "action", headerName: "Action", width: 300, sortable: false, align: 'center', headerAlign: 'center', renderCell: (params) => <UserActions params={params} />
  }
];

function ManageUser() {
  const dispatch = useDispatch<AppDispatch>();
  const refSearch = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState("");
  const dataRetrieve = useSelector((state: RootState) => state.sliceUserAdmin.currentUserbyPhanTrang);
  const newRows = dataRetrieve?.data ?? [];

  React.useEffect(() => {
    dispatch(getUserByPhanTrang({ pageIndex: page, keywords: searchKey }));
}, [dispatch, page, searchKey]);

const handleChangePagination = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
};

  return (
    <div className='manage-user'>
      <Container fixed={true} className='mui-container-manage'>
        <Button className='button-add-admin' onClick={() => setOpen(true)}>Đăng ký quản trị viên</Button>
        <div className="search-user">
          <TextField inputRef={refSearch} id="outlined-basic" label="Tìm tài khoản qua tên" variant="outlined" className='input-search' />
          <button onClick={() => setSearchKey(refSearch.current?.value ?? "")}>Tìm</button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <AdminRegister handleCloseModal={() => setOpen(false)} />
        </Modal>
        <DataGrid className='mui-grid-user' rows={newRows} columns={columns} checkboxSelection hideFooterPagination hideFooter sx={{ fontSize: '1.4rem', height: 475 }} />
        <Pagination onChange={handleChangePagination} count={Math.ceil(dataRetrieve?.totalRow / dataRetrieve?.pageSize)} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
      </Container>
    </div>
  );
}

export default ManageUser;
