import { useState} from 'react';
import './login.scss'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for using icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import icons for password visibility toggle
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'; // Import Facebook icon
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regex, ACCESS_TOKEN, ACCESS_USER_ID } from '../../constant/constant';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { getLocal, setLocal } from '../../utils/utils';
import swal from 'sweetalert';
import { axiosInterceptorWithCybertoken } from '../../services/services';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const SavedData = getLocal('savedData')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('This field has to be email').required('Email cannot be empty'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(6, 'Min is 6 characters')
        .max(12, 'Max is 12 characters')
        .matches(regex.password, 'Password must contain at least 1 digit, 1 special character, 1 alphabetic character'),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await axiosInterceptorWithCybertoken.post('/api/auth/signin', values);
        setLocal(ACCESS_TOKEN, resp.data.content.token);
        setLocal(ACCESS_USER_ID, resp.data.content.user.id);
        swal("Đã đăng nhập thành công!", { icon: "success" });
        if(SavedData){
          navigate(`/room/${SavedData.idRoom}`);
        }else{
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        swal("Đăng nhập thất bại!", { icon: "error" });
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <h1 className="login-header text-center mb-4">Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Email input */}
        <div className="mb-3">  
        <label className="">Welcome to AriBB</label>
          <FormControl variant='standard' className='mui-form-control' margin='dense' fullWidth error={formik.errors.email ? true : false}>
            <InputLabel htmlFor="my-input-email">Email</InputLabel>
            <Input id="my-input-email" aria-describedby="my-helper-text" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? <FormHelperText id="my-helper-text">{formik.errors.email}</FormHelperText> : <></>}
          </FormControl>
        </div>
        {/* Password input */}
        <div className="mb-3"> 
          <div className="password-input-container">
            <FormControl variant='standard' className='mui-form-control' margin='dense' fullWidth error={formik.errors.password ? true : false}>
              <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
              <Input
                id="my-input-password"
                type={showPassword ? "text" : "password"}
                aria-describedby="my-helper-text"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? <FormHelperText id="my-helper-text">{formik.errors.password}</FormHelperText> : <></>}
            </FormControl>
            {/* Toggle password visibility button */}
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} />
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {/* Or login with social media */}
      <div className="or-divider">
        <span className="or-divider-text">Or login with</span>
      </div>

      {/* Social login buttons */}
      <div className="social-login-container">
        <button className="btn-face" onClick={() => window.location.href = 'https://www.facebook.com/'}>
          <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '20px', marginRight: '10px', paddingBottom: '1px' }} />
          Facebook
        </button>
        <button className="btn-google" onClick={() => window.location.href = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=vi&ifkv=AaSxoQxhOlZXfuvVCrgLfc8fsyAXKT8_YdnDl9Pp2dyeCjBU_y4ylQ-9QBtMk0AGzR8oVUCQDKUPvg&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1627563663%3A1715317667382273&ddm=0'}>
          <span className="google-icon" />
          Google
        </button>
      </div>

      {/* Signup link */}
      <div className="signup-container">
        Not a member?<NavLink to="/auth/register" className="signup-link"> Sign up now</NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
