import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormHelperText, Input, InputLabel, Box, Button, Alert, MenuItem, Select } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import '../../Pages/Register/RegisterForm.scss';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import { regex, IValues } from '../../constant/constant';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isValid, setValid] = useState(true);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [genderValue, setGender] = useState<string | boolean>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
      checkPassword: '',
      name: '',
      email: '',
      phone: '',
      birthday: '',
      role: 'user',
      gender: true,
    },
    validationSchema: Yup.object().shape({
      user: Yup.string()
        .min(6, 'Tối thiểu là 6 ký tự')
        .max(12, 'Tối đa là 12 ký tự')
        .required('Người dùng không thể trống'),
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Tối thiểu là 6 ký tự')
        .max(12, 'Tối đa là 12 ký tự')
        .matches(regex.password, 'Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự đặc biệt, 1 ký tự chữ cái'),
      checkPassword: Yup.string()
        .required('Vui lòng xác nhận mật khẩu của bạn')
        .oneOf([Yup.ref('password')], 'mật khẩu phải trùng khớp'),
      name: Yup.string()
        .matches(regex.nameByVietnamese, 'Tên phải hợp lệ')
        .required('Tên không thể trống'),
      email: Yup.string()
        .email('Trường này phải là email')
        .required('Email không được để trống'),
      phone: Yup.number()
        .required('Điện thoại không thể trống'),
    }),
    onSubmit: async (values: IValues) => {
      try {
        const date = `${dateValue?.date()}-${(dateValue?.month() || 0) + 1}-${dateValue?.year()}`;
        const getGender = genderValue === 'true' ? true : genderValue === 'false' ? false : '';

        if (date === 'undefined-1-undefined' || getGender === '') {
          setValid(false);
        } else {
          setValid(true);
          const newValue = {
            ...values,
            birthday: date,
            role: 'USER',
            gender: getGender,
          };
          await axiosInterceptorWithCybertoken.post('/api/auth/signup', newValue);
          swal('Thành công, tài khoản đã được tạo!', {
            icon: 'success',
          });
          navigate('/auth/login');
        }
      } catch (error) {
        console.log(error);
        swal('Thất bại, email đã được dùng!', {
          icon: 'error',
        });
      }
    },
  });

  return (
    <div className='register-form-background'>
      <div className='register-form-container'>
        {!isValid && <Alert className='mui-alert' severity='error' sx={{ fontSize: '2rem' }}>Vui lòng điền đầy đủ thông tin!</Alert>}
        <div className='login-page-title'>
          <h1>Register</h1>
        </div>
        <form className='login-form' onSubmit={formik.handleSubmit}>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.user}>
            <InputLabel htmlFor='user'>Tài khoản</InputLabel>
            <Input id='user' {...formik.getFieldProps('user')} />
            {formik.touched.user && formik.errors.user && <FormHelperText>{formik.errors.user}</FormHelperText>}
          </FormControl>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.password}>
            <InputLabel htmlFor='password'>Mật khẩu</InputLabel>
              <Input id='password' type={showPassword ? 'text' : 'password'} {...formik.getFieldProps('password')} fullWidth />
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='password-toggle-icon' onClick={() => setShowPassword(!showPassword)} />
            {formik.touched.password && formik.errors.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
          </FormControl>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.checkPassword}>
            <InputLabel htmlFor='checkPassword'>Nhập lại mật khẩu</InputLabel>
              <Input id='checkPassword' type={showConfirmPassword ? 'text' : 'password'} {...formik.getFieldProps('checkPassword')} fullWidth />
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className='password-toggle-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            {formik.touched.checkPassword && formik.errors.checkPassword && <FormHelperText>{formik.errors.checkPassword}</FormHelperText>}
          </FormControl>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.name}>
            <InputLabel htmlFor='name'>Họ tên</InputLabel>
            <Input id='name' {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && <FormHelperText>{formik.errors.name}</FormHelperText>}
          </FormControl>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.email}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input id='email' {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && <FormHelperText>{formik.errors.email}</FormHelperText>}
          </FormControl>
          <FormControl variant='standard' className='mui-form-control' margin='dense' error={!!formik.errors.phone}>
            <InputLabel htmlFor='phone'>Số điện thoại</InputLabel>
            <Input id='phone' {...formik.getFieldProps('phone')} />
            {formik.touched.phone && formik.errors.phone && <FormHelperText>{formik.errors.phone}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 90 }}>
              <InputLabel id='gender-label'>Gender</InputLabel>
              <Select
                labelId='gender-label'
                id='gender'
                value={genderValue}
                onChange={(e) => setGender(e.target.value)}
                label='Gender'
                sx={{ fontSize: '1.4rem' }}
              >
                <MenuItem value={'true'}>Male</MenuItem>
                <MenuItem value={'false'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className='form-button-group'>
            <Button variant='outlined' type='submit' id="btn-Register">Đăng ký</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
