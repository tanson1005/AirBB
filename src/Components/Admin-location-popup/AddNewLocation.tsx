import { useDispatch } from 'react-redux';
//mui ui
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//css
import '../Admin-add-room-popup/addRoom.scss'
//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
//const
import { regex } from '../../constant/constant'
//services
import { axiosInterceptor } from '../../services/services'
//redux store
import { AppDispatch } from '../../redux/store';
import { getLocationByPhanTrang } from '../../redux/Admin-slice/AdminLocationSlice'
//swal
import swal from 'sweetalert';

interface IProps {
  handleClose: () => void;
  pageIndex: number;
}

interface FormValues {
  hinhAnh: string;
  quocGia: string;
  tenViTri: string;
  tinhThanh: string;
}

function AddNewLocation({ handleClose, pageIndex }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const formik = useFormik<FormValues>({
    initialValues: {
      hinhAnh: '',
      quocGia: '',
      tenViTri: '',
      tinhThanh: '',
    },
    validationSchema: Yup.object().shape({
      hinhAnh: Yup.string().required('This field have to be filled'),
      quocGia: Yup.string().required('This field have to be filled').matches(regex.nameByVietnamese, 'Invalid value!'),
      tenViTri: Yup.string().required('This field have to be filled').matches(regex.nameByVietnamese, 'Invalid value!'),
      tinhThanh: Yup.string().required('This field have to be filled').matches(regex.nameByVietnamese, 'Invalid value!'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInterceptor.post('/api/vi-tri', values);
        dispatch(getLocationByPhanTrang({ pageIndex, keywords: "" }));
        swal("Thành công thêm mới vị trí", { icon: "success" });
        handleClose();
      } catch (error) {
        console.log(error);
        swal("Thất bại thêm mới vị trí, vui lòng kiểm tra lại thông tin!", { icon: "error" });
      }
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("hinhAnh", file.name);
    }
  };

  return (
    <div className='add-location-modal'>
      <form className='admin-register-form' onSubmit={formik.handleSubmit}>
        <h1>Thêm vị trí</h1>
        <Grid container spacing={2} className='mui-grid-container-room'>
          <Grid item lg={6} className='mui-grid-item-room'>
            <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={!!formik.errors.tenViTri && formik.touched.tenViTri}>
              <InputLabel htmlFor="tenViTri">Tên vị trí</InputLabel>
              <Input id="tenViTri" aria-describedby="my-helper-text" {...formik.getFieldProps('tenViTri')} />
              {formik.touched.tenViTri && formik.errors.tenViTri ? <FormHelperText>{formik.errors.tenViTri}</FormHelperText> : null}
            </FormControl>
          </Grid>
          <Grid item lg={6} className='mui-grid-item-room'>
            <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={!!formik.errors.tinhThanh && formik.touched.tinhThanh}>
              <InputLabel htmlFor="tinhThanh">Tỉnh thành</InputLabel>
              <Input id="tinhThanh" aria-describedby="my-helper-text" {...formik.getFieldProps('tinhThanh')} />
              {formik.touched.tinhThanh && formik.errors.tinhThanh ? <FormHelperText>{formik.errors.tinhThanh}</FormHelperText> : null}
            </FormControl>
          </Grid>
          <Grid item lg={6} className='mui-grid-item-room'>
            <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={!!formik.errors.quocGia && formik.touched.quocGia}>
              <InputLabel htmlFor="quocGia">Quốc gia</InputLabel>
              <Input id="quocGia" aria-describedby="my-helper-text" {...formik.getFieldProps('quocGia')} />
              {formik.touched.quocGia && formik.errors.quocGia ? <FormHelperText>{formik.errors.quocGia}</FormHelperText> : null}
            </FormControl>
          </Grid>
          <Grid item lg={6} className='mui-grid-item-room'>
            <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={!!formik.errors.hinhAnh && formik.touched.hinhAnh}>
              <InputLabel htmlFor="hinhAnh">Hình ảnh</InputLabel>
              <Input id="hinhAnh" aria-describedby="my-helper-text" {...formik.getFieldProps('hinhAnh')} />
              <input type="file" id="fileUpload" className="file-upload" onChange={handleFileUpload} />
              {formik.touched.hinhAnh && formik.errors.hinhAnh ? <FormHelperText>{formik.errors.hinhAnh}</FormHelperText> : null}
            </FormControl>
          </Grid>
        </Grid>
        <div className="button-group-admin-room">
          <Button variant="contained" type='submit'>Thêm</Button>
          <Button variant="contained" onClick={handleClose}>Hủy</Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewLocation;
