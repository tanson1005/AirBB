import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store'; // Import AppDispatch from Redux store
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './addRoom.scss';
import { ACCESS_TOKEN, IRoomDetail } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import { getLocal } from '../../utils/utils';
import { getRoomByPhanTrang } from '../../redux/Admin-slice/AdminRoomSlice';
import swal from 'sweetalert';

interface IProps {
    handleCloseModal: () => void;
    pageIndex: number;
}

const str2bool = (value: unknown): boolean => {
    if (typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
    }
    return value as boolean;
}

function AddRoom({ handleCloseModal, pageIndex }: IProps) {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch from Redux store
    const [mayGiat, setMayGiat] = useState<boolean | string>();
    const [banLa, setBanLa] = useState<boolean | string>();
    const [tivi, setTivi] = useState<boolean | string>();
    const [bep, setBep] = useState<boolean | string>();
    const [dieuHoa, setDieuHoa] = useState<boolean | string>();
    const [wifi, setWifi] = useState<boolean | string>();
    const [doXe, setDoXe] = useState<boolean | string>();
    const [hoBoi, setHoBoi] = useState<boolean | string>();
    const [banUi, setBanUi] = useState<boolean | string>();
    const [file, setFile] = useState<File | null | Blob>(null);
    const [preview, setPreview] = useState<string | undefined>();

    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }
        const objectUrl: any = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: 0,
            tenPhong: "",
            hinhAnh: "",
            moTa: "",
            khach: 0,
            maViTri: 0,
            phongNgu: 0,
            phongTam: 0,
            giaTien: 0,
            giuong: 0,
            mayGiat: false,
            banLa: false,
            tivi: false,
            bep: false,
            dieuHoa: false,
            wifi: false,
            doXe: false,
            hoBoi: false,
            banUi: false,
        },
        validationSchema: Yup.object().shape({
            tenPhong: Yup.string().required('Name can not be empty'),
            moTa: Yup.string().required('Mô tả can not be empty'),
            khach: Yup.number().min(1, 'Khách hàng phải lớn hơn 0').required('Khách hàng can not be empty'),
            maViTri: Yup.number().min(1, 'Mã Vị Trí phải lớn hơn 0').required('Mã vị trí can not be empty'),
            phongNgu: Yup.number().min(1, 'Số phòng ngủ phải lớn hơn 0').required('Số phòng ngủ can not be empty'),
            phongTam: Yup.number().min(1, 'Số phòng tắm phải lớn hơn 0').required('Số phòng tắm can not be empty'),
            giaTien: Yup.number().min(1, 'Giá tiền phải lớn hơn 0').required('Giá tiền can not be empty'),
            giuong: Yup.number().min(1, 'Số giường phải lớn hơn 0').required('Giường can not be empty'),
        }),
        onSubmit: async (values: IRoomDetail) => {
            try {
                const newValue = {
                    ...values,
                    mayGiat: str2bool(mayGiat ?? values.mayGiat),
                    banLa: str2bool(banLa ?? values.banLa),
                    tivi: str2bool(tivi ?? values.tivi),
                    bep: str2bool(bep ?? values.bep),
                    dieuHoa: str2bool(dieuHoa ?? values.dieuHoa),
                    wifi: str2bool(wifi ?? values.wifi),
                    doXe: str2bool(doXe ?? values.doXe),
                    hoBoi: str2bool(hoBoi ?? values.hoBoi),
                    banUi: str2bool(banUi ?? values.banUi),
                };

                const resp = await axiosInterceptorWithCybertoken.post(`/api/phong-thue`, newValue, {
                    headers: {
                        token: getLocal(ACCESS_TOKEN)
                    }
                });

                if (file !== null) {
                    const formData = new FormData();
                    formData.append("formFile", file);
                    await axiosInterceptorWithCybertoken.post(`/api/phong-thue/upload-hinh-phong?maPhong=${resp.data.content.id}`, formData, {
                        headers: {
                            token: getLocal(ACCESS_TOKEN)
                        }
                    });
                }

                dispatch(getRoomByPhanTrang({ pageIndex: pageIndex, keywords: "" }));
                swal(`Thành công cập nhật phòng ${newValue.tenPhong}`, { icon: "success" });
                handleCloseModal();
            } catch (error) {
                console.log(error);
                swal("Thất bại, bạn không có quyền sửa thông tin", {
                    icon: "error",
                });
            }
        }
    });

    return (
        <div className='add-room'>
            <h1>Thêm phòng mới</h1>
            <form action="" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} className='mui-grid-container-room'>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.tenPhong && !!formik.errors.tenPhong}>
                            <InputLabel htmlFor="tenPhong">Tên phòng</InputLabel>
                            <Input id="tenPhong" aria-describedby="my-helper-text" {...formik.getFieldProps('tenPhong')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.tenPhong && formik.errors.tenPhong) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="hinhAnh">Hình Ảnh</InputLabel>
                        <img className="mb-2" src={preview?.toString() ?? formik.values.hinhAnh} alt="" style={{height: "5rem", display:"block"}}/>
                        <input type="file" onChange={handleChangeFile} style={{fontSize:"1rem"}}/>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.moTa && !!formik.errors.moTa}>
                            <InputLabel htmlFor="moTa">Mô tả</InputLabel>
                            <Input id="moTa" aria-describedby="my-helper-text" {...formik.getFieldProps('moTa')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.moTa && formik.errors.moTa) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.khach && !!formik.errors.khach}>
                            <InputLabel htmlFor="khach">Khách tối đa</InputLabel>
                            <Input id="khach" aria-describedby="my-helper-text" {...formik.getFieldProps('khach')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.khach && formik.errors.khach) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.phongNgu && !!formik.errors.phongNgu}>
                            <InputLabel htmlFor="phongNgu">Phòng ngủ</InputLabel>
                            <Input id="phongNgu" aria-describedby="my-helper-text" {...formik.getFieldProps('phongNgu')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.phongNgu && formik.errors.phongNgu) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.phongTam && !!formik.errors.phongTam}>
                            <InputLabel htmlFor="phongTam">Phòng tắm</InputLabel>
                            <Input id="phongTam" aria-describedby="my-helper-text" {...formik.getFieldProps('phongTam')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.phongTam && formik.errors.phongTam) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.giaTien && !!formik.errors.giaTien}>
                            <InputLabel htmlFor="giaTien">Giá tiền</InputLabel>
                            <Input id="giaTien" aria-describedby="my-helper-text" {...formik.getFieldProps('giaTien')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.giaTien && formik.errors.giaTien) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.touched.giuong && !!formik.errors.giuong}>
                            <InputLabel htmlFor="giuong">Giường</InputLabel>
                            <Input id="giuong" aria-describedby="my-helper-text" {...formik.getFieldProps('giuong')}/>
                            <FormHelperText id="my-helper-text">
                                {(formik.touched.giuong && formik.errors.giuong) ?? ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="mayGiat">Máy giặt</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'mayGiat',
                                id: 'mayGiat',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setMayGiat(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="banLa">Bàn là</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'banLa',
                                id: 'banLa',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setBanLa(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="tivi">Tivi</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'tivi',
                                id: 'tivi',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTivi(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="bep">Bếp</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'bep',
                                id: 'bep',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setBep(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="dieuHoa">Điều hòa</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'dieuHoa',
                                id: 'dieuHoa',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setDieuHoa(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="wifi">Wifi</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'wifi',
                                id: 'wifi',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setWifi(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="doXe">Đỗ xe</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'doXe',
                                id: 'doXe',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setDoXe(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="hoBoi">Hồ bơi</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'hoBoi',
                                id: 'hoBoi',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setHoBoi(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="banUi">Bàn ủi</InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'banUi',
                                id: 'banUi',
                            }}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setBanUi(e.target.value)}
                        >
                            <option value={"false"}>Không</option>
                            <option value={"true"}>Có</option>
                        </NativeSelect>
                    </Grid>
                </Grid>
                <Button type='submit' variant='contained' color='success' className='mui-btn-submit'>Submit</Button>
            </form>
        </div>
    );
}

export default AddRoom;
